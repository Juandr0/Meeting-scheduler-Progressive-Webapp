import type { Booking } from '../types/Booking';
import type { BookingRaw } from '../types/BookingRaw';

export function convertBooking(raw: BookingRaw): Booking {
  const newBooking: Booking = {
    bookingId: raw.bookingId,
    roomId: raw.roomId,
    userId: raw.userId,
    startTime: new Date(raw.startTime.toDate()),
    endTime: new Date(raw.endTime.toDate()),
    createdAt: raw.createdAt ? raw.createdAt.toDate() : undefined,
  };

  return newBooking;
}
