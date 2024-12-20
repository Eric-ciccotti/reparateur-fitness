import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { config } from './config';
import axios from 'axios';

const prisma = new PrismaClient();
const app = express();

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

// Middleware
app.use(cors({
  origin: config.frontend_url,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  console.log('Request Origin:', req.headers.origin);
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Une erreur est survenue'
  });
});

// Endpoint pour créer une réservation
app.post('/api/bookings', async (req, res) => {
  try {
    console.log('Received booking request:', req.body);
    const bookingData: BookingRequest = req.body;

    // Validation des champs obligatoires
    if (!bookingData.name || !bookingData.email || !bookingData.phone || 
        !bookingData.date || !bookingData.time || !bookingData.equipmentType) {
      console.log('Missing required fields:', { bookingData });
      throw new Error('Tous les champs obligatoires doivent être remplis');
    }

    console.log('Equipment type received:', bookingData.equipmentType);
    console.log('Available equipment types:', {
      'Vélo Elliptique': 8900,
      'Tapis de Course': 8900,
      'Vélo d\'Appartement': 7900,
      'Appareil de Musculation': 6900
    });

    // Créer la réservation
    const booking = await prisma.booking.create({
      data: {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        date: new Date(bookingData.date),
        time: bookingData.time,
        equipmentType: bookingData.equipmentType,
        message: bookingData.message || '',
        status: 'PENDING'
      }
    });

    console.log('Booking created:', booking);

    try {
      // Créer une session de paiement PayPlug
      const amount = getAmountByEquipmentType(bookingData.equipmentType);
      console.log('Calculated amount:', amount);
      console.log('PayPlug secret key length:', config.payplug.secret_key?.length || 0);
      console.log('Backend URL:', config.backend_url);
      console.log('Frontend URL:', config.frontend_url);

      const paymentData = {
        amount: amount * 100, // PayPlug attend le montant en centimes
        currency: 'EUR',
        notification_url: `${config.backend_url}/api/webhooks/payplug`,
        hosted_payment: {
          return_url: `${config.frontend_url}/booking/success`,
          cancel_url: `${config.frontend_url}/booking/cancel`
        },
        customer: {
          email: bookingData.email,
          first_name: bookingData.name.split(' ')[0],
          last_name: bookingData.name.split(' ').slice(1).join(' ') || 'Non spécifié'
        },
        metadata: {
          booking_id: booking.id,
          equipment_type: bookingData.equipmentType
        }
      };

      console.log('Sending request to PayPlug with data:', paymentData);

      const paymentResponse = await axios.post(
        'https://api.payplug.com/v1/payments',
        paymentData,
        {
          headers: {
            'Authorization': `Bearer ${config.payplug.secret_key}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('PayPlug response:', paymentResponse.data);

      // Mettre à jour la réservation avec l'ID de paiement PayPlug
      await prisma.booking.update({
        where: { id: booking.id },
        data: { 
          payment_id: paymentResponse.data.id,
          status: 'AWAITING_PAYMENT'
        }
      });

      res.json({
        success: true,
        payment_url: paymentResponse.data.hosted_payment.payment_url
      });
    } catch (paymentError: any) {
      console.error('PayPlug API error:', paymentError.response?.data || paymentError.message);
      console.error('Full PayPlug error:', paymentError);
      
      // Mettre à jour le statut de la réservation
      await prisma.booking.update({
        where: { id: booking.id },
        data: { status: 'ERROR' }
      });

      res.status(500).json({
        success: false,
        error: 'Une erreur est survenue lors de l\'initialisation du paiement.',
        booking_id: booking.id
      });
    }
  } catch (error: any) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Une erreur est survenue lors de la création de la réservation'
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

// Fonction utilitaire pour obtenir le montant en fonction du type d'équipement
function getAmountByEquipmentType(type: string): number {
  // Normaliser le type d'équipement
  const normalizedType = type.toLowerCase();
  const prices: Record<string, number> = {
    'vélo elliptique': 8900,      // 89€
    'tapis de course': 8900,      // 89€
    'vélo d\'appartement': 7900,  // 79€
    'appareil de musculation': 6900, // 69€
    // Ajout des versions simplifiées
    'velo': 7900,      // 79€
    'tapis': 8900,     // 89€
    'musculation': 6900 // 69€
  };

  return prices[normalizedType] || 7900; // Prix par défaut : 79€
}

// Démarrer le serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Frontend URL:', config.frontend_url);
  console.log('Backend URL:', config.backend_url);
});
