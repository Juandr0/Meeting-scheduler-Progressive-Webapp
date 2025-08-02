import { db } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { roomsAtom } from '../atoms/roomsAtom';
import type { Room } from '../types/Room';
import { collections } from '../constants/constants';
import { authAtom } from '../atoms/userAtom';

export function useAppInit() {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useAtom(roomsAtom);
  const [user] = useAtom(authAtom);

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
        console.error(`error ${e}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [user]);

  return { isLoading, rooms };
}
