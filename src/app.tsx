import { Route, Routes, Navigate } from 'react-router-dom';
import RoomsPage from './pages/RoomsPage';
import RoomDetailsPage from './pages/RoomDetailPage';
import Header from './components/Header';
import { useAppInit } from './hooks/useAppInit';
import { appRoutes, appSizes } from './constants/constants';
import LoginPage from './pages/LoginPage';
import { useAtom } from 'jotai';
import { authAtom } from './atoms/userAtom';
import MyBookings from './pages/MyBookings';

function App() {
  const { isLoading } = useAppInit();
  const [user] = useAtom(authAtom);

  if (isLoading && user) {
    return (
      <>
        <Header />
        <div className='flex flex-col items-center justify-center h-64'>
          <span className='text-gray-500'>Loading rooms...</span>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <main
        className='max-w-4xl mx-auto'
        style={{ paddingTop: appSizes.headerHeight }}
      >
        <Routes>
          {!user ? (
            <>
              <Route path={appRoutes.LoginPage} element={<LoginPage />} />
              <Route
                path='*'
                element={<Navigate to={appRoutes.LoginPage} replace />}
              />
            </>
          ) : (
            <>
              <Route path={appRoutes.MyBookings} element={<MyBookings />} />
              <Route path={appRoutes.RoomsPage} element={<RoomsPage />} />
              <Route
                path={appRoutes.RoomDetailsPagePath}
                element={<RoomDetailsPage />}
              />
              <Route
                path='*'
                element={<Navigate to={appRoutes.RoomsPage} replace />}
              />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
