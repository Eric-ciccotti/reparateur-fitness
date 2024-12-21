import { BookingSchema } from '../src/types/booking';

describe('Booking Validation', () => {
  const validBooking = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+33612345678',
    date: new Date(),
    time: '14:30',
    equipmentType: 'Vélo Elliptique'
  };

  test('should validate a correct booking', () => {
    expect(() => BookingSchema.parse(validBooking)).not.toThrow();
  });

  test('should reject booking with invalid email', () => {
    const invalidBooking = { ...validBooking, email: 'invalid-email' };
    expect(() => BookingSchema.parse(invalidBooking)).toThrow();
  });

  test('should reject booking with invalid phone', () => {
    const invalidBooking = { ...validBooking, phone: '123' };
    expect(() => BookingSchema.parse(invalidBooking)).toThrow();
  });

  test('should reject booking with invalid equipment type', () => {
    const invalidBooking = { ...validBooking, equipmentType: 'Invalid Type' };
    expect(() => BookingSchema.parse(invalidBooking)).toThrow();
  });

  test('should allow optional message', () => {
    const bookingWithMessage = { 
      ...validBooking, 
      message: 'Test message' 
    };
    expect(() => BookingSchema.parse(bookingWithMessage)).not.toThrow();
  });
});
