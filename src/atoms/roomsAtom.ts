import { atom } from 'jotai';
import type { Room } from '../pages/RoomsPage';

export const roomsAtom = atom<Room[]>([]);
