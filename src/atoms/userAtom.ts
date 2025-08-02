import type { User } from 'firebase/auth';
import { atom } from 'jotai';

export const authAtom = atom<User | undefined>();
