export type Booking = {
  bookingId: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
  userId: string;
  createdAt?: Date;
};
