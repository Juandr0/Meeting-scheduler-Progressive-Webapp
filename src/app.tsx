import { Route, Routes } from 'react-router-dom';

import RoomsPage from './pages/RoomsPage';
import RoomDetailsPage from './pages/RoomDetailPage';
import Header from './components/Header';

import { useAppInit } from './hooks/useAppInit';
import { appRoutes, appSizes } from './constants/constants';
import LoginPage from './pages/LoginPage';

function App() {
  const { isLoading } = useAppInit();

  if (isLoading)
    return (
      <>
        <Header />
        <div className='flex flex-col items-center justify-center h-64'>
          <span className='text-gray-500'>Hämtar mötesrum...</span>
        </div>
      </>
    );

  return (
    <>
      <Header />
      <main
        className='max-w-4xl mx-auto'
        style={{ paddingTop: appSizes.headerHeight }}
      >
        <Routes>
          <Route path={appRoutes.LoginPage} element={<LoginPage />} />
          <Route path={appRoutes.RoomsPage} element={<RoomsPage />} />
          <Route
            path={appRoutes.RoomDetailsPagePath}
            element={<RoomDetailsPage />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
