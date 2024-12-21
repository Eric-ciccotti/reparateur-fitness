import * as BookingService from '../src/services/booking.service';
import { createClient } from '@supabase/supabase-js';
import { BookingSchema } from '../src/types/booking';

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    insert: jest.fn().mockResolvedValue({ data: [{ id: 'test-booking' }], error: null }),
    update: jest.fn().mockResolvedValue({ data: [{ id: 'test-booking' }], error: null }),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis()
  }))
}));

describe('Booking Service', () => {
  const mockBooking = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+33612345678',
    date: new Date(),
    time: '14:30',
    equipmentType: 'Vélo Elliptique',
    status: 'PENDING'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createBooking should successfully create a booking', async () => {
    const result = await BookingService.createBooking(mockBooking);
    
    expect(result).toEqual({ id: 'test-booking' });
  });

  test('updateBookingStatus should update booking status', async () => {
    const result = await BookingService.updateBookingStatus('test-booking', 'CONFIRMED');
    
    expect(result).toEqual({ id: 'test-booking' });
  });

  test('createBooking with invalid data should throw an error', async () => {
    const invalidBooking = { ...mockBooking, email: 'invalid-email' };
    
    await expect(BookingService.createBooking(invalidBooking)).rejects.toThrow();
  });
});
