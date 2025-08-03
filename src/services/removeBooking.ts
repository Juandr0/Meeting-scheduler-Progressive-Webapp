import { db } from '../config/firebaseConfig';
import { collections } from '../constants/constants';
import type { Booking } from '../types/Booking';
import { doc, deleteDoc } from 'firebase/firestore';

export const removeBooking = async (booking: Booking) => {
  try {
    await deleteDoc(doc(db, collections.bookings, booking.bookingId));
  } catch (e) {
    console.error(`error deleting: ${e}`);
  }
};
