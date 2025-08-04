import RoomCard from '../components/RoomCard/RoomCard';
import { roomsAtom } from '../atoms/roomsAtom';
import { useAtomValue } from 'jotai';
import { calculateIfOpen } from '../utils/dateUtils';

export default function RoomsPage() {
  const rooms = useAtomValue(roomsAtom);

  const sortedRooms = [...rooms].sort((a, b) => {
    const aDisabled = a.isClosed ? 1 : 0;
    const bDisabled = b.isClosed ? 1 : 0;
    const aIsOpen = calculateIfOpen(a.openFrom, a.openTo) ? 0 : 1;
    const bIsOpen = calculateIfOpen(b.openFrom, b.openTo) ? 0 : 1;

    if (aDisabled !== bDisabled) {
      return aDisabled - bDisabled;
    }

    if (aIsOpen !== bIsOpen) {
      return aIsOpen - bIsOpen;
    }

    return a.name.localeCompare(b.name);
  });

  return (
    <section className='flex flex-col items-center gap-4 mx-auto my-5 px-2 sm:px-0'>
      {sortedRooms.map((room) => (
        <RoomCard room={room} key={room.id} />
      ))}
    </section>
  );
}
