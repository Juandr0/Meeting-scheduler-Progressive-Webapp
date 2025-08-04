import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { formatDateString } from '../utils/formatters';
import { collections } from '../constants/constants';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtom';
import type { Room } from '../types/Room';
import { userBookingAtom } from '../atoms/userBookingsAtom';
import type { BookingRaw } from '../types/BookingRaw';
import { convertBooking } from '../utils/ConvertBooking';

export function useBooking() {
  const [user] = useAtom(userAtom);
  const [, setUserBookings] = useAtom(userBookingAtom);

  const bookTimeSlot = async (
    room: Room,
    time: string,
    date: Date,
    onBookingSuccess: (time: string) => void
  ) => {
    if (!user) {
      alert('You must be logged in to book a room.');
      return;
    }

    const [hourStr] = time.split(':');
    const startHour = parseInt(hourStr, 10);

    const startDate = new Date(date);
    startDate.setHours(startHour, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(startHour + 1, 0, 0, 0);

    const confirmBooking = window.confirm(
      `Confirmation
      \nBook meeting room ${room.name} ${formatDateString(date)} at ${time}-${
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
        `Success!
        \nBooked ${room.name} ${formatDateString(date)} at ${time}-${
          startHour + 1
        }:00`
      );
      onBookingSuccess(time);

      const convertedBooking = convertBooking(newBooking);
      setUserBookings((prev) => [...prev, convertedBooking]);
    } catch (error) {
      alert(`An error has occured.\n Error message: ${error}`);
    }
  };

  return { bookTimeSlot };
}
