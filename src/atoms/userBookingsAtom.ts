import { atom } from 'jotai';
import type { Booking } from '../types/Booking';

export const userBookingAtom = atom<Booking[]>([]);
