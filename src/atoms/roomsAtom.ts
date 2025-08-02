import { atom } from 'jotai';
import type { Room } from '../types/Room';

export const roomsAtom = atom<Room[]>([]);
