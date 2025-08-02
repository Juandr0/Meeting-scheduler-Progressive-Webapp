import type { Booking } from '../types/Booking';
import { formatTime } from './formatters';

export function getBookedSlotsForDate(
  bookings: Booking[],
  date: Date
): string[] {
  return bookings
    .filter(
      (b) =>
        b.startTime.getFullYear() === date.getFullYear() &&
        b.startTime.getMonth() === date.getMonth() &&
        b.startTime.getDate() === date.getDate()
    )
    .map((b) => formatTime(b.startTime));
}

export function generateTimeSlots(openFrom: string, openTo: string): string[] {
  const openHour = parseInt(openFrom.split(':')[0], 10);
  const closingHour = parseInt(openTo.split(':')[0], 10);

  const slots: string[] = [];

  for (let i = openHour; i < closingHour; i++) {
    const hoursStr = i.toString().padStart(2, '0');
    slots.push(`${hoursStr}:00`);
  }
  return slots;
}
