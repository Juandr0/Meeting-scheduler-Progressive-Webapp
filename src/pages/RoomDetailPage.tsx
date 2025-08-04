import { useLocation } from 'react-router-dom';
import RoomDetails from '../components/RoomDetails/RoomDetails';
import type { Room } from '../types/Room';

export default function RoomDetailsPage() {
  const location = useLocation();
  const room: Room = location.state?.room;

  if (!room) {
    return <div>No roomdata available. Try another room</div>;
  }

  return (
    <main>
      <RoomDetails room={room} />
    </main>
  );
}
