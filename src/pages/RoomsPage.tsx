import RoomCard from '../components/RoomCard/RoomCard';
import { roomsAtom } from '../atoms/roomsAtom';
import { useAtomValue } from 'jotai';

export default function RoomsPage() {
  const rooms = useAtomValue(roomsAtom);

  return (
    <section className='flex flex-col items-center gap-4 mx-auto my-5'>
      {rooms.map((room) => (
        <RoomCard room={room} key={room.id} />
      ))}
    </section>
  );
}
