import type { Room } from '../pages/RoomsPage';
import type { Booking } from '../types/Booking';
import type { BookingRaw } from '../types/BookingRaw';
import { convertBooking } from '../utils/ConvertBooking';

export const mockRooms: Room[] = [
  {
    id: 'r1',
    name: 'Mötesrum Orion',
    openFrom: '08:00',
    openTo: '18:00',
    description: 'Ett ljust och rymligt rum med plats för 10 personer.',
  },
  {
    id: 'r2',
    name: 'Mötesrum Vega',
    openFrom: '09:00',
    openTo: '17:00',
    description: 'Modernt rum med videokonferensutrustning.',
  },
  {
    id: 'r3',
    name: 'Mötesrum Sirius',
    openFrom: '07:30',
    openTo: '16:30',
    description: 'Lugnt rum perfekt för brainstorming och workshops.',
  },
  {
    id: 'r4',
    name: 'Mötesrum Polaris',
    openFrom: '10:00',
    openTo: '19:00',
    description: 'Rymligt rum med naturligt ljus och whiteboard.',
  },
  {
    id: 'r5',
    name: 'Mötesrum Lyra',
    openFrom: '00:00',
    openTo: '23:59',
    description: 'Flexibelt rum med möjlighet till sena möten.',
  },
];

export const mockBookingRaw: BookingRaw[] = [
  // Rum r1 - Mötesrum Orion
  { roomId: 'r1', start: '2025-07-28T09:00:00Z', end: '2025-07-28T10:00:00Z' },
  { roomId: 'r1', start: '2025-07-28T14:00:00Z', end: '2025-07-28T15:00:00Z' },
  { roomId: 'r1', start: '2025-07-29T11:00:00Z', end: '2025-07-29T12:00:00Z' },

  // Rum r2 - Mötesrum Vega
  { roomId: 'r2', start: '2025-07-28T08:30:00Z', end: '2025-07-28T09:30:00Z' },
  { roomId: 'r2', start: '2025-07-30T13:00:00Z', end: '2025-07-30T14:00:00Z' },

  // Rum r3 - Mötesrum Sirius
  { roomId: 'r3', start: '2025-07-31T10:00:00Z', end: '2025-07-31T11:30:00Z' },
  { roomId: 'r3', start: '2025-08-01T09:00:00Z', end: '2025-08-01T10:00:00Z' },

  // Rum r4 - Mötesrum Polaris
  { roomId: 'r4', start: '2025-08-02T14:00:00Z', end: '2025-08-02T15:00:00Z' },
  { roomId: 'r4', start: '2025-08-03T08:00:00Z', end: '2025-08-03T09:00:00Z' },

  // Rum r5 - Mötesrum Lyra
  { roomId: 'r5', start: '2025-08-01T00:00:00Z', end: '2025-08-01T01:00:00Z' },
  { roomId: 'r5', start: '2025-08-03T22:00:00Z', end: '2025-08-03T23:00:00Z' },
];

export const mockBookings: Booking[] = mockBookingRaw.map(convertBooking);
