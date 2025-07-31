import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './constants/AppRoutes';
import RoomsPage from './pages/RoomsPage';
import RoomDetailsPage from './pages/RoomDetailPage';
import Header from './components/Header';
import { AppSizes } from './constants/AppSizes';

function App() {
  return (
    <div>
      <Header />
      <main
        className='max-w-4xl mx-auto'
        style={{ paddingTop: AppSizes.headerHeight }}
      >
        <Routes>
          <Route path={AppRoutes.RoomsPage} element={<RoomsPage />} />
          <Route
            path={AppRoutes.RoomDetailsPagePath}
            element={<RoomDetailsPage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
