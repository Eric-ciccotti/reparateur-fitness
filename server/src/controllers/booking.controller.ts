import { Request, Response } from 'express';
import * as BookingService from '../services/booking.service.js';
import { BookingSchema } from '../types/booking.js';
import Logger from '../utils/logger.js';

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingData = BookingSchema.parse(req.body);
    const booking = await BookingService.createBooking(bookingData);

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Réservation créée avec succès'
    });
  } catch (error) {
    Logger.error(`Booking creation error: ${error}`);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la réservation'
    });
  }
};

export const handlePaymentWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, data } = req.body;

    switch (type) {
      case 'payment_success':
        await BookingService.updateBookingStatus(data.bookingId, 'CONFIRMED');
        break;
      case 'payment_failed':
        await BookingService.updateBookingStatus(data.bookingId, 'PAYMENT_FAILED');
        break;
      default:
        Logger.warn(`Unhandled webhook type: ${type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    Logger.error(`Webhook error: ${error}`);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};
