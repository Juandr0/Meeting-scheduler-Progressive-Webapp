import { Link, useLocation } from 'react-router-dom';
import { IoChevronBackCircleSharp, IoMenu, IoClose } from 'react-icons/io5';
import { useState } from 'react';

import { appColors, appRoutes, appSizes } from '../constants/constants';
import { userAtom } from '../atoms/userAtom';
import { useAtom } from 'jotai';
import { getTitleFromPath } from '../utils/getPageTitle';
import DropdownMenu from './DropdownMenu';
import { signOutUser } from '../services/authService';

export default function Header() {
  const [user, setUser] = useAtom(userAtom);
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const noBackButtonRoutes = [appRoutes.RoomsPage, appRoutes.LoginPage];
  const shouldShowBackButton = !noBackButtonRoutes.includes(location.pathname);

  const showHamburgerMenu = location.pathname !== appRoutes.LoginPage && !!user;

  const handleLogout = () => {
    signOutUser();
    setUser(undefined);
  };

  return (
    <div className='bg-white shadow-md absolute top-0 right-0 left-0 h-[100px] z-50'>
      <header className='px-4 h-[100px] max-w-4xl mx-auto flex items-center justify-between relative'>
        {/* Back */}
        <div className='w-[40px]'>
          {shouldShowBackButton && (
            <Link to={appRoutes.RoomsPage}>
              <IoChevronBackCircleSharp
                size={appSizes.defaultIconSize}
                color={appColors.brown700}
              />
            </Link>
          )}
        </div>

        {/* Titel */}
        <h1 className='absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold xs:text-3xl sm:text-4xl'>
          {getTitleFromPath()}
        </h1>

        {/* Höger */}
        {menuOpen && (
          <DropdownMenu
            onClose={function (): void {
              setMenuOpen(false);
            }}
            onSignOut={function (): void {
              handleLogout();
            }}
          />
        )}

        {/* Burgarmeny */}
        <div className='flex items-center justify-end space-x-2 min-w-[40px]'>
          {showHamburgerMenu ? (
            <div className='relative'>
              <button
                aria-label={menuOpen ? 'Stäng meny' : 'Öppna meny'}
                onClick={() => setMenuOpen((open) => !open)}
                className='text-amber-800 hover:text-amber-950 focus:outline-none transition-colors duration-200
                           w-10 h-10 flex items-center justify-center'
                type='button'
              >
                {menuOpen ? (
                  <IoClose
                    size={appSizes.defaultIconSize}
                    color={appColors.brown700}
                  />
                ) : (
                  <IoMenu
                    size={appSizes.defaultIconSize}
                    color={appColors.brown700}
                  />
                )}
              </button>
            </div>
          ) : (
            <div className='w-40' />
          )}
        </div>
      </header>
    </div>
  );
}
