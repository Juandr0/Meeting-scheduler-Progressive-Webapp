import { useLocation } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import { MdArrowBackIos } from 'react-icons/md';
import { AppSizes } from '../constants/AppSizes';
import type { Room } from './RoomsPage';
import { mockBookings } from '../services/firebase';

export default function RoomDetailsPage() {
  const location = useLocation();
  const room: Room = location.state?.room;

  if (!room) {
    return <div>Inga rumsdata tillgängliga</div>;
  }

  return (
    <main>
      <header className='flex justify-between items-center py-5 px-10'>
        <MdArrowBackIos size={AppSizes.defaultIconSize} className='pointer-' />
        <div className='flex items-center flex-col'>
          <h2 className='text-2xl'>4-10 augusti</h2>
          <h2 className='text-xl'>Vecka 32</h2>
        </div>
        <MdArrowForwardIos size={AppSizes.defaultIconSize} />
      </header>
    </main>
  );
}
