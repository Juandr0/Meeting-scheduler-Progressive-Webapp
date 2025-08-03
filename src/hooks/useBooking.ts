import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { formatDate } from '../utils/formatters';
import { collections } from '../constants/constants';
import { useAtom } from 'jotai';
import { authAtom } from '../atoms/userAtom';
import type { Room } from '../types/Room';
import { userBookingAtom } from '../atoms/userBookingsAtom';
import type { BookingRaw } from '../types/BookingRaw';

export function useBooking() {
  const [user] = useAtom(authAtom);
  const [, setUserBookings] = useAtom(userBookingAtom);

  const bookTimeSlot = async (
    room: Room,
    time: string,
    date: Date,
    onBookingSuccess: (time: string) => void
  ) => {
    if (!user) {
      alert('Du måste vara inloggad för att boka.');
      return;
    }

    const [hourStr] = time.split(':');
    const startHour = parseInt(hourStr, 10);

    const startDate = new Date(date);
    startDate.setHours(startHour, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(startHour + 1, 0, 0, 0);

    const confirmBooking = window.confirm(
      `Vill du boka ${room.name} ${formatDate(date)} kl ${time}-${
        startHour + 1
      }:00?`
    );
    if (!confirmBooking) return;

    try {
      const collectionRef = collection(db, collections.bookings);
      const docRef = doc(collectionRef);
      const newBooking: BookingRaw = {
        bookingId: docRef.id,
        roomId: room.id,
        startTime: Timestamp.fromDate(startDate),
        endTime: Timestamp.fromDate(endDate),
        createdAt: Timestamp.fromDate(new Date()),
        userId: user.uid,
      };
      await setDoc(docRef, newBooking);
      alert(
        `Bokningen lyckades.
        \n${room.name} är nu bokat ${formatDate(date)} kl ${time}-${
          startHour + 1
        }:00`
      );
      onBookingSuccess(time);

      const convertedBooking = convertBooking(newBooking);
      setUserBookings((prev) => [...prev, convertedBooking]);
    } catch (error) {
      alert('Något gick fel vid bokningen.');
    }
  };

  return { bookTimeSlot };
}
