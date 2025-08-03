import { Link } from 'react-router-dom';
import { appRoutes } from '../constants/constants';
import { useAtom } from 'jotai';
import { authAtom } from '../atoms/userAtom';

type DropdownMenuProps = {
  onClose: () => void;
  onSignOut: () => void;
};

export default function DropdownMenu({
  onClose,
  onSignOut,
}: DropdownMenuProps) {
  const [user] = useAtom(authAtom);
  return (
    <div className='absolute right-0 top-full w-52 bg-white border border-gray-300 rounded-lg shadow-xl z-50'>
      <div className='p-4 border-b border-gray-300 font-semibold text-gray-700'>
        {user?.email}
      </div>

      <Link
        to={appRoutes.MyBookings}
        className='block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-150'
        onClick={() => {
          onClose();
        }}
      >
        Mina bokningar
      </Link>

      <button
        type='button'
        className='block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-semibold transition-colors duration-150'
        onClick={() => {
          onSignOut();
          onClose();
        }}
      >
        Logga ut
      </button>
    </div>
  );
}
