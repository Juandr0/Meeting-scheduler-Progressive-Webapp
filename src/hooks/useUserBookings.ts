// hooks/useUserBookings.ts
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { authAtom } from '../atoms/userAtom';
import { userBookingAtom } from '../atoms/userBookingsAtom';
import type { Booking } from '../types/Booking';
import { collections } from '../constants/constants';

export const useUserBookings = () => {
  const [user] = useAtom(authAtom);
  const [, setUserBookings] = useAtom(userBookingAtom);

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!user?.uid) return;

      const q = query(
        collection(db, collections.bookings),
        where('userId', '==', user.uid)
      );

      const snapshot = await getDocs(q);
      const bookings: Booking[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Booking),
        bookingId: doc.id,
      }));

      setUserBookings(bookings);
    };

    fetchUserBookings();
  }, [user?.uid]);
};
