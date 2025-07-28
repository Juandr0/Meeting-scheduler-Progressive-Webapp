import RoomCard from '../components/RoomCard/RoomCard';
import { mockRooms } from '../services/firebase';

export type Room = {
  id: string;
  name: string;
  openFrom: string;
  openTo: string;
  description?: string;
};

export default function RoomsPage() {
  return (
    <section className='flex flex-col items-center gap-4 mx-auto'>
      {mockRooms.map((room) => (
        <RoomCard room={room} />
      ))}
    </section>
  );
}
