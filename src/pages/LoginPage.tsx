import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { auth } from '../config/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <main className='min-h-screen flex items-start justify-center pt-24 px-4 sm:px-0'>
      <section className='w-full max-w-sm p-6 bg-white rounded-2xl shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Logga in</h1>

        <label className='block mb-4'>
          <span className='text-sm font-medium text-gray-700'>
            Användarnamn
          </span>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
          />
        </label>

        <label className='block mb-6 relative'>
          <span className='text-sm font-medium text-gray-700'>Lösenord</span>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-1 block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute top-9 right-3 text-gray-500'
            aria-label='Toggle password visibility'
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </label>

        <button
          onClick={handleLogin}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors'
        >
          Logga in
        </button>
      </section>
    </main>
  );
}
