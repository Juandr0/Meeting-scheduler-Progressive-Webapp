import { Timestamp } from 'firebase/firestore';

export type BookingRaw = {
  bookingId: string;
  roomId: string;
  startTime: Timestamp;
  endTime: Timestamp;
  userId: string;
  createdAt?: Timestamp;
};
