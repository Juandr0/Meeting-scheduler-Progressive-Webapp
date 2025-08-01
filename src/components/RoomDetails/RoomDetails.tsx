import { useAtom } from 'jotai';
import { bookingsAtom } from '../../atoms/bookingsAtom';
import { useFetchBookings } from '../../hooks/useFetchBookings';
import type { Room } from '../../types/Room';
import { generateTimeSlots } from '../../utils/bookingUtils';

import { getCurrentWeekDates } from '../../utils/dateUtils';
import { getBookedSlotsForDate } from '../../utils/bookingUtils';

import DayColumn from './DayColumn';
import RoomHeader from './RoomHeader';

type Props = {
  room: Room;
};

export default function RoomDetails({ room }: Props) {
  const { isLoading } = useFetchBookings(room.id);
  const [bookings] = useAtom(bookingsAtom);

  const roomBookings = bookings.filter((b) => b.roomId === room.id);
  const allTimeSlots = generateTimeSlots(room.openFrom, room.openTo);

  // Byt ut TimeFormatter.getCurrentWeekDates mot din nya funktion
  const weekDates = getCurrentWeekDates();

  const hasAvailableSlots = weekDates.some((date) => {
    // Byt ut getBookedSlotsForDate
    const bookedSlots = getBookedSlotsForDate(roomBookings, date);
    return allTimeSlots.some((slot) => !bookedSlots.includes(slot));
  });

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center h-64'>
        <span className='text-gray-500'>Laddar bokningar...</span>
      </div>
    );
  }

  if (!hasAvailableSlots) {
    return <p className='text-center'>Inga tillgängliga tider.</p>;
  }

  return (
    <div className='overflow-x-auto flex flex-col items-center'>
      <RoomHeader dates={weekDates} />
      <section className='pb-4 w-full'>
        <div className='flex flex-nowrap overflow-x-auto border-gray-300 justify-center'>
          {weekDates.map((date) => {
            const bookedSlots = getBookedSlotsForDate(roomBookings, date);

            return (
              <DayColumn
                key={`${room.id}-${date.toISOString()}`}
                date={date}
                allTimeSlots={allTimeSlots}
                bookedSlots={bookedSlots}
                room={room}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
