import { useLocation, Link, useMatch } from 'react-router-dom';

import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { appRoutes, appSizes } from '../constants/constants';
import { authAtom } from '../atoms/userAtom';
import { useAtom } from 'jotai';

export default function Header() {
  const user = useAtom(authAtom);
  const location = useLocation();
  const isHome = location.pathname === appRoutes.RoomsPage;

  const isDetails = useMatch(appRoutes.RoomDetailsPagePath);
  const roomName = location.state?.room?.name as string | undefined;

  const getTitleFromPath = () => {
    if (isHome) return 'Mötesrum';
    if (isDetails) return roomName || 'Detaljer';
    return '';
  };

  return (
    <div className='bg-gray-200 absolute top-0 right-0 left-0 h-[100px]'>
      <header className='px-4 h-[100px] max-w-4xl mx-auto flex items-center justify-between relative'>
        <div className='w-[40px]'>
          {!isHome && (
            <Link to={appRoutes.RoomsPage}>
              <IoChevronBackCircleSharp size={appSizes.defaultIconSize} />
            </Link>
          )}
        </div>

        {/* Center: titel */}
        <h1 className='absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold xs:text-3xl sm:text-4xl'>
          {getTitleFromPath()}
        </h1>

        {/* placeholder*/}
        <div className='flex flex-col items-start space-y-0.5 mr-4 min-w-[150px]'>
          <p className='text-sm text-gray-700 truncate'>{user[0]?.email}</p>
          <button
            onClick={() => {}}
            className='text-amber-800 hover:text-amber-950 underline focus:outline-none cursor-pointer text-xs font-semibold'
            aria-label='Gå till Mina bokningar'
            type='button'
          >
            Mina bokningar
          </button>
        </div>
      </header>
    </div>
  );
}
