import { Request, Response } from 'express';
import * as BookingController from '../src/controllers/booking.controller';
import * as BookingService from '../src/services/booking.service';

describe('Booking Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    mockRequest = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+33612345678',
        date: new Date(),
        time: '14:30',
        equipmentType: 'Vélo Elliptique'
      }
    };

    mockResponse = {
      status: statusMock,
      json: jsonMock
    };

    jest.spyOn(BookingService, 'createBooking').mockResolvedValue({
      id: 'test-booking',
      ...mockRequest.body
    });
  });

  test('createBooking should return 201 with booking data', async () => {
    await BookingController.createBooking(
      mockRequest as Request, 
      mockResponse as Response
    );

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      data: expect.objectContaining({
        id: 'test-booking'
      })
    }));
  });

  test('handlePaymentWebhook should process payment success', async () => {
    const updateSpy = jest.spyOn(BookingService, 'updateBookingStatus')
      .mockResolvedValue({} as any);

    mockRequest.body = {
      type: 'payment_success',
      data: { bookingId: 'test-booking' }
    };

    await BookingController.handlePaymentWebhook(
      mockRequest as Request, 
      mockResponse as Response
    );

    expect(updateSpy).toHaveBeenCalledWith('test-booking', 'CONFIRMED');
    expect(statusMock).toHaveBeenCalledWith(200);
  });
});
