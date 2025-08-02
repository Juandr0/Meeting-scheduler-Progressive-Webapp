// src/services/authService.ts
import { signInWithEmailAndPassword, type User } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { getAuthErrorMessage } from '../utils/auth/authErrorMessages';

export const signIn = async (
  email: string,
  password: string
): Promise<User | string> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    return getAuthErrorMessage(error.code);
  }
};

// export const handleSignUp = () => {
//   createUserWithEmailAndPassword(email: string, password: string)
//     .then((userCredential) => {
//       // Signed up
//       const user = userCredential.user;
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
// };
