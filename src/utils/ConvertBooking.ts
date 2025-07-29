import type { Booking } from '../types/Booking';
import type { BookingRaw } from '../types/BookingRaw';

export function convertBooking(raw: BookingRaw): Booking {
  const newBooking: Booking = {
    roomId: raw.roomId,
    startTime: new Date(raw.start),
    endTime: new Date(raw.end),
  };

  return newBooking;
}
