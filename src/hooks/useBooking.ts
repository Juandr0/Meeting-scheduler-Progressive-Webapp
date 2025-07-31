// hooks/useBooking.ts
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../constants/config/firebaseConfig';
import type { Room } from '../pages/RoomsPage';
import { FirebasePaths } from '../constants/FirebasePaths';

export function useBooking() {
  const bookTimeSlot = async (
    room: Room,
    startTime: string,
    date: Date,
    duration: number = 60
  ) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const [hourStr, minuteStr] = startTime.split(':');
    const startHour = +hourStr;
    const startMinute = +minuteStr;

    const endTotalMinutes = startHour * 60 + startMinute + duration;
    const endHour = Math.floor(endTotalMinutes / 60);
    const endMinute = endTotalMinutes % 60;

    const timeRange = `${pad(startHour)}:${pad(startMinute)}-${pad(
      endHour
    )}:${pad(endMinute)}`;

    const startDate = new Date(date);
    startDate.setHours(startHour, startMinute, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(endHour, endMinute, 0, 0);

    const confirm = window.confirm(`\n
      Boka ${room.name} kl ${timeRange}`);
    if (!confirm) return;

    try {
      const newBooking = {
        roomId: room.id,
        date: Timestamp.fromDate(date),
        startTime: Timestamp.fromDate(startDate),
        endTime: Timestamp.fromDate(endDate),
        createdAt: serverTimestamp(),
        //TODO: Lägg till UID när auth är implementerat
        userId: '',
      };
      const docRef = await addDoc(
        collection(db, FirebasePaths.bookings),
        newBooking
      );

      console.log('Bokning skapad!', docRef);
    } catch (error) {
      console.error('Fel vid bokning:', error);
      alert('Något gick fel vid bokningen.');
    }
  };

  return { bookTimeSlot };
}
