import type { Booking } from '../types/Booking';

export const mockBookings: Booking[] = [
  // Mötesrum Orion (tidigare r1)
  {
    roomId: '2CCyH18dzi5CwMtsdXtI',
    startTime: new Date('2025-07-28T09:00:00Z'),
    endTime: new Date('2025-07-28T10:00:00Z'),
    userId: 'mockUser1',
  },
  {
    roomId: '2CCyH18dzi5CwMtsdXtI',
    startTime: new Date('2025-07-28T14:00:00Z'),
    endTime: new Date('2025-07-28T15:00:00Z'),
    userId: 'mockUser1',
  },
  {
    roomId: '2CCyH18dzi5CwMtsdXtI',
    startTime: new Date('2025-07-29T11:00:00Z'),
    endTime: new Date('2025-07-29T12:00:00Z'),
    userId: 'mockUser1',
  },

  // Mötesrum Vega (tidigare r2)
  {
    roomId: 'eCFG0NSZqwC0tJOOo7aD',
    startTime: new Date('2025-07-28T08:30:00Z'),
    endTime: new Date('2025-07-28T09:30:00Z'),
    userId: 'mockUser2',
  },
  {
    roomId: 'eCFG0NSZqwC0tJOOo7aD',
    startTime: new Date('2025-07-30T13:00:00Z'),
    endTime: new Date('2025-07-30T14:00:00Z'),
    userId: 'mockUser2',
  },

  // Mötesrum Sirius (tidigare r3)
  {
    roomId: 'IbzhwCJbrvgrbNoDiSmF',
    startTime: new Date('2025-07-31T10:00:00Z'),
    endTime: new Date('2025-07-31T11:30:00Z'),
    userId: 'mockUser3',
  },
  {
    roomId: 'IbzhwCJbrvgrbNoDiSmF',
    startTime: new Date('2025-08-01T09:00:00Z'),
    endTime: new Date('2025-08-01T10:00:00Z'),
    userId: 'mockUser3',
  },

  // Mötesrum Polaris (tidigare r4)
  {
    roomId: 'JVD5qvB8buxPhVJbYaV5',
    startTime: new Date('2025-08-02T14:00:00Z'),
    endTime: new Date('2025-08-02T15:00:00Z'),
    userId: 'mockUser4',
  },
  {
    roomId: 'JVD5qvB8buxPhVJbYaV5',
    startTime: new Date('2025-08-03T08:00:00Z'),
    endTime: new Date('2025-08-03T09:00:00Z'),
    userId: 'mockUser4',
  },

  // Mötesrum Lyra (tidigare r5)
  {
    roomId: 'ZAgJtoMKNC9bHTKJ3bC0',
    startTime: new Date('2025-08-01T00:00:00Z'),
    endTime: new Date('2025-08-01T01:00:00Z'),
    userId: 'mockUser5',
  },
  {
    roomId: 'ZAgJtoMKNC9bHTKJ3bC0',
    startTime: new Date('2025-08-03T22:00:00Z'),
    endTime: new Date('2025-08-03T23:00:00Z'),
    userId: 'mockUser5',
  },
];
