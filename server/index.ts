import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { config } from './config';
import axios from 'axios';
import rateLimit from 'express-rate-limit';

const prisma = new PrismaClient();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: [
    config.frontend_url,
    'https://reparateur-fitness.vercel.app',
    'https://reparateur-fitness-git-master-ericciccottis-projects.vercel.app',
    /\.vercel\.app$/  // Accepte tous les sous-domaines vercel.app
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par fenêtre
}));

// Types
interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  equipmentType: string;
  message?: string;
}

const VALID_EQUIPMENT_TYPES = {
  'Vélo Elliptique': 8900,
  'Tapis de Course': 8900,
  'Vélo d\'Appartement': 7900,
  'Appareil de Musculation': 6900
} as const;

type ValidEquipmentType = keyof typeof VALID_EQUIPMENT_TYPES;

// Logging middleware sécurisé
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Une erreur est survenue'
  });
});

// Validation des données de réservation
function validateBookingData(data: BookingRequest): { isValid: boolean; error?: string } {
  if (!data.name?.trim() || !data.email?.trim() || !data.phone?.trim() || 
      !data.date || !data.time || !data.equipmentType) {
    return { isValid: false, error: 'Tous les champs obligatoires doivent être remplis' };
  }

  if (!(data.equipmentType in VALID_EQUIPMENT_TYPES)) {
    return { isValid: false, error: 'Type d\'équipement invalide' };
  }

  const bookingDate = new Date(data.date);
  if (isNaN(bookingDate.getTime()) || bookingDate < new Date()) {
    return { isValid: false, error: 'Date invalide' };
  }

  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(data.time)) {
    return { isValid: false, error: 'Format d\'heure invalide' };
  }

  return { isValid: true };
}

// Endpoint pour créer une réservation
app.post('/api/bookings', async (req, res) => {
  try {
    const bookingData: BookingRequest = req.body;
    const validation = validateBookingData(bookingData);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.error
      });
    }

    // Créer la réservation
    const booking = await prisma.booking.create({
      data: {
        name: bookingData.name.trim(),
        email: bookingData.email.trim().toLowerCase(),
        phone: bookingData.phone.trim(),
        date: new Date(bookingData.date),
        time: bookingData.time,
        equipmentType: bookingData.equipmentType as ValidEquipmentType,
        message: bookingData.message?.trim() || '',
        status: 'PENDING'
      }
    });

    // Créer une session de paiement PayPlug
    const amount = VALID_EQUIPMENT_TYPES[bookingData.equipmentType as ValidEquipmentType];
    
    const paymentData = {
      amount: amount * 100,
      currency: 'EUR',
      notification_url: `${config.backend_url}/api/webhooks/payplug`,
      hosted_payment: {
        return_url: `${config.frontend_url}/booking/success`,
        cancel_url: `${config.frontend_url}/booking/cancel`
      },
      customer: {
        email: bookingData.email
      },
      metadata: {
        booking_id: booking.id
      }
    };

    const payplugResponse = await axios.post('https://api.payplug.com/v1/payments', paymentData, {
      headers: {
        'Authorization': `Bearer ${config.payplug.secret_key}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      success: true,
      payment_url: payplugResponse.data.hosted_payment.payment_url
    });
  } catch (error) {
    console.error('Booking error:', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la création de la réservation'
    });
  }
});

// Webhook PayPlug
app.post('/api/webhooks/payplug', async (req, res) => {
  try {
    const event = req.body;
    console.log('Received PayPlug webhook:', event);

    // Vérifier la signature du webhook pour la sécurité
    // TODO: Ajouter la vérification de la signature PayPlug

    if (event.type === 'payment_success') {
      const booking = await prisma.booking.findFirst({
        where: { payment_id: event.data.id }
      });

      if (booking) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { 
            status: 'CONFIRMED',
            updatedAt: new Date()
          }
        });
        
        // Ici vous pouvez ajouter l'envoi d'un email de confirmation
        console.log('Booking confirmed:', booking.id);
      }
    } else if (event.type === 'payment_failed') {
      const booking = await prisma.booking.findFirst({
        where: { payment_id: event.data.id }
      });

      if (booking) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { 
            status: 'PAYMENT_FAILED',
            updatedAt: new Date()
          }
        });
        console.log('Payment failed for booking:', booking.id);
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Démarrer le serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Frontend URL:', config.frontend_url);
  console.log('Backend URL:', config.backend_url);
});
