import { useEffect, useState } from 'react';
import type { Booking } from '../types/Booking';
import { useAtom } from 'jotai';
import { bookingsAtom } from '../atoms/bookingsAtom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

import type { BookingRaw } from '../types/BookingRaw';

import { collections } from '../constants/constants';
import { convertBooking } from '../utils/ConvertBooking';

export function useFetchBookings(id: string) {
  const [isLoading, setIsloading] = useState(true);
  const [, setBookings] = useAtom(bookingsAtom);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookingsList: Booking[] = [];
        const q = query(
          collection(db, collections.bookings),
          where('roomId', '==', id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const bookingRaw = doc.data() as BookingRaw;
          const booking = convertBooking(bookingRaw);
          bookingsList.push(booking);
        });
        setBookings(bookingsList);
      } catch (e) {
        console.error(`${e}`);
      } finally {
        setIsloading(false);
      }
    };

    getBookings();
  }, [id]);

  return { isLoading };
}
