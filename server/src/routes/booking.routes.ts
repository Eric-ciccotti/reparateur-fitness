import express from 'express';
import * as BookingController from '../controllers/booking.controller.js';
import { validateRequest } from '../middleware/validation.js';
import { BookingSchema } from '../types/booking.js';

const router = express.Router();

/**
 * @openapi
 * /bookings:
 *   post:
 *     summary: Créer une nouvelle réservation
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       400:
 *         description: Données de réservation invalides
 *       500:
 *         description: Erreur serveur
 */
router.post(
  '/bookings', 
  validateRequest(BookingSchema), 
  BookingController.createBooking
);

/**
 * @openapi
 * /webhooks/payment:
 *   post:
 *     summary: Webhook de traitement de paiement
 *     tags: [Webhooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: ['payment_success', 'payment_failed']
 *               data:
 *                 type: object
 *     responses:
 *       200:
 *         description: Webhook traité avec succès
 *       500:
 *         description: Erreur de traitement du webhook
 */
router.post(
  '/webhooks/payment', 
  BookingController.handlePaymentWebhook
);

export default router;
