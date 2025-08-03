import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAtom } from 'jotai';
import { authAtom } from '../atoms/userAtom';
import { signIn } from '../services/authService';

export default function LoginPage() {
  const [, setUser] = useAtom(authAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleLogin = async () => {
    const result = await signIn(email.trim(), password);
    if (typeof result !== 'string') {
      setUser(result);
    } else {
      setLoginError(result);
    }
  };

  return (
    <main className='min-h-screen flex items-start justify-center pt-24 px-4 sm:px-0'>
      <section className='w-full max-w-sm p-6 bg-white rounded-2xl shadow-md'>
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

        <label className='block mb-2 relative'>
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

        {loginError && (
          <p className='text-sm text-red-600 mb-4'>{loginError}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={!isFormValid}
          className={`w-full font-bold py-2 px-4 rounded-lg transition-colors ${
            isFormValid
              ? 'bg-brown-700 hover:bg-brown-900 text-white cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
          }`}
        >
          Logga in
        </button>
      </section>
    </main>
  );
}
