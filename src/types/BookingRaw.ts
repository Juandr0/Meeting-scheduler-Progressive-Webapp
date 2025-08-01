import { Timestamp } from 'firebase/firestore';

export type BookingRaw = {
  roomId: string;
  startTime: Timestamp;
  endTime: Timestamp;
  userId: string;
  createdAt?: Timestamp;
};
