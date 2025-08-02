import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { formatDate } from '../utils/formatters';
import { collections } from '../constants/constants';
import { useAtom } from 'jotai';
import { authAtom } from '../atoms/userAtom';
import type { Room } from '../types/Room';

export function useBooking() {
  const [user] = useAtom(authAtom);

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
      const newBooking = {
        roomId: room.id,
        date: Timestamp.fromDate(date),
        startTime: Timestamp.fromDate(startDate),
        endTime: Timestamp.fromDate(endDate),
        createdAt: serverTimestamp(),
        userId: user.uid,
      };
      await addDoc(collection(db, collections.bookings), newBooking);
      alert(
        `Bokningen lyckades.
        \n${room.name} Är nu bokat kl ${time}-${startHour + 1}:00 ${formatDate(
          date
        )}`
      );
      onBookingSuccess(time);
    } catch (error) {
      alert('Något gick fel vid bokningen.');
    }
  };

  return { bookTimeSlot };
}
