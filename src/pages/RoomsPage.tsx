import RoomCard from '../components/RoomCard/RoomCard';
import { roomsAtom } from '../atoms/roomsAtom';
import { useAtomValue } from 'jotai';

export default function RoomsPage() {
  const rooms = useAtomValue(roomsAtom);
  rooms.sort;
  return (
    <section className='flex flex-col items-center gap-4 mx-auto my-5'>
      {rooms
        .slice()
        .sort()
        .sort((a, b) => {
          const aDisabled = a.isClosed ? 1 : 0;
          const bDisabled = b.isClosed ? 1 : 0;

          if (aDisabled !== bDisabled) {
            return aDisabled - bDisabled;
          }
          return a.name.localeCompare(b.name);
        })
        .map((room) => (
          <RoomCard room={room} key={room.id} />
        ))}
    </section>
  );
}
