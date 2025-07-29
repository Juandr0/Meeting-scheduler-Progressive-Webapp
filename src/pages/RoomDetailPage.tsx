import { useLocation } from 'react-router-dom';
import type { Room } from './RoomsPage';
import RoomDetails from '../components/RoomDetails/RoomDetails';

export default function RoomDetailsPage() {
  const location = useLocation();
  const room: Room = location.state?.room;

  if (!room) {
    return <div>Inga rumsdata tillgängliga</div>;
  }

  return (
    <main>
      <RoomDetails room={room} />
    </main>
  );
}
