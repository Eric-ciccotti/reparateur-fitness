import { createClient } from '@supabase/supabase-js';
import { config } from '../config/server.js';
import { BookingType } from '../types/booking.js';
import Logger from '../utils/logger.js';

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

export const createBooking = async (bookingData: BookingType) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select();

    if (error) throw error;

    Logger.info(`Booking created: ${data[0].id}`);
    return data[0];
  } catch (error) {
    Logger.error(`Booking creation error: ${error}`);
    throw error;
  }
};

export const updateBookingStatus = async (bookingId: string, status: string) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select();

    if (error) throw error;

    Logger.info(`Booking ${bookingId} updated to ${status}`);
    return data[0];
  } catch (error) {
    Logger.error(`Booking update error: ${error}`);
    throw error;
  }
};
