import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import type { Booking } from '../types/Booking';
import { collections } from '../constants/constants';

import type { BookingRaw } from '../types/BookingRaw';
import { convertBooking } from '../utils/ConvertBooking';

export const fetchUserBookings = async (userId: string): Promise<Booking[]> => {
  if (!userId) return [];

  const q = query(
    collection(db, collections.bookings),
    where('userId', '==', userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const raw = {
      ...(doc.data() as BookingRaw),
      bookingId: doc.id,
    };
    return convertBooking(raw);
  });
};
