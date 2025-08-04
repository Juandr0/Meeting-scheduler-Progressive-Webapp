import { db } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { roomsAtom } from '../atoms/roomsAtom';
import { userAtom } from '../atoms/userAtom';
import { userBookingAtom } from '../atoms/userBookingsAtom';
import type { Room } from '../types/Room';
import type { Booking } from '../types/Booking';
import { collections } from '../constants/constants';
import { fetchUserBookings } from '../services/fetchUserBookings';

export function useAppInit() {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useAtom(roomsAtom);
  const [user] = useAtom(userAtom);
  const [, setUserBookings] = useAtom(userBookingAtom);

  const shouldFetch = !!user;

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchRooms = async () => {
      try {
        const roomList: Room[] = [];
        const querySnapshot = await getDocs(collection(db, collections.rooms));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          roomList.push(data as Room);
        });
        setRooms(roomList);
      } catch (e) {
        console.error(`error fetching rooms: ${e}`);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchBookings = async () => {
      try {
        if (user?.uid) {
          const bookings: Booking[] = await fetchUserBookings(user.uid);
          setUserBookings(bookings);
        }
      } catch (e) {
        console.error(`error fetching user bookings: ${e}`);
      }
    };

    fetchRooms();
    fetchBookings();
  }, [user]);

  return { isLoading, rooms };
}
