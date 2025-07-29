import type { Room } from '../pages/RoomsPage';

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

export type Booking = {
  roomId: string;
  date: string; // t.ex. '2025-08-03' (YYYY-MM-DD)
  startTime: string; // t.ex. '13:00'
  endTime: string; // t.ex. '14:00'
};

// Exempelmock med några bokningar för rummet 'r1'
export const mockBookings: Booking[] = [
  // Måndag 28 juli 2025
  { roomId: 'r1', date: '2025-07-28', startTime: '09:00', endTime: '10:00' },
  { roomId: 'r1', date: '2025-07-28', startTime: '14:00', endTime: '15:00' },

  // Tisdag 29 juli 2025
  { roomId: 'r1', date: '2025-07-29', startTime: '11:00', endTime: '12:00' },

  // Onsdag 30 juli 2025
  { roomId: 'r1', date: '2025-07-30', startTime: '13:00', endTime: '14:00' },

  // Torsdag 31 juli 2025
  { roomId: 'r1', date: '2025-07-31', startTime: '08:00', endTime: '09:00' },

  // Fredag 1 augusti 2025
  { roomId: 'r1', date: '2025-08-01', startTime: '15:00', endTime: '16:00' },

  // Lördag 2 augusti 2025
  { roomId: 'r1', date: '2025-08-02', startTime: '10:00', endTime: '11:00' },

  // Söndag 3 augusti 2025
  { roomId: 'r1', date: '2025-08-03', startTime: '09:00', endTime: '10:00' },
];
