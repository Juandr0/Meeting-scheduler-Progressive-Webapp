import type { Booking } from '../services/firebase';

export function GetUniqueDates(bookings: Booking[]): string[] {
  const uniqueDates = Array.from(new Set(bookings.map((b) => b.date)));
  uniqueDates.sort();
  return uniqueDates;
}
