import RoomCard from '../components/RoomCard/RoomCard';
import { mockRooms } from '../services/firebase';

export type Room = {
  id: string;
  name: string;
  openFrom: string;
  openTo: string;
  description?: string;
  isClosed?: boolean;
  isClosedDescription?: string;
};

export default function RoomsPage() {
  return (
    <section className='flex flex-col items-center gap-4 mx-auto my-5'>
      {mockRooms.map((room) => (
        <RoomCard room={room} key={room.id} />
      ))}
    </section>
  );
}
