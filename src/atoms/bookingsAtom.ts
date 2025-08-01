import { atom } from 'jotai';
import type { Booking } from '../types/Booking';

export const bookingsAtom = atom<Booking[]>([]);
