import { db } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { roomsAtom } from '../atoms/roomsAtom';
import type { Room } from '../types/Room';
import { collections } from '../constants/constants';

export function useAppInit() {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useAtom(roomsAtom);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomList: Room[] = [];
        const querySnapshot = await getDocs(collection(db, collections.rooms));
        querySnapshot.forEach((doc) => {
          roomList.push(doc.data() as Room);
        });
        setRooms(roomList);
      } catch (e) {
        console.error(`error ${e}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return { isLoading, rooms };
}
