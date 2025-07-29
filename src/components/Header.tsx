import { useLocation, Link, useMatch } from 'react-router-dom';
import { AppRoutes } from '../constants/AppRoutes';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { AppSizes } from '../constants/AppSizes';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === AppRoutes.RoomsPage;

  const isDetails = useMatch(AppRoutes.RoomDetailsPagePath);
  const roomName = location.state?.room?.name as string | undefined;

  const getTitleFromPath = () => {
    if (isHome) return 'Mötesrum';
    if (isDetails) return roomName || 'Detaljer';
    return '';
  };

  return (
    <div className='bg-gray-200'>
      <header className='px-4 h-[100px] max-w-4xl mx-auto flex items-center justify-between relative'>
        <div className='w-[40px]'>
          {!isHome && (
            <Link to={AppRoutes.RoomsPage}>
              <IoChevronBackCircleSharp size={AppSizes.defaultIconSize} />
            </Link>
          )}
        </div>

        {/* Center: titel */}
        <h1 className='absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold xs:text-3xl sm:text-4xl'>
          {getTitleFromPath()}
        </h1>

        {/* placeholder*/}
        <div className='w-[40px]' />
      </header>
    </div>
  );
}
