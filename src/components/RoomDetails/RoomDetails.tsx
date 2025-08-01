import { useAtom } from 'jotai';
import { bookingsAtom } from '../../atoms/bookingsAtom';
import { useFetchBookings } from '../../hooks/useFetchBookings';
import type { Room } from '../../types/Room';
import { generateTimeSlots } from '../../utils/bookingUtils';

import { getWeekDates, getWeekStartDate } from '../../utils/dateUtils';
import { getBookedSlotsForDate } from '../../utils/bookingUtils';

import DayColumn from './DayColumn';
import RoomHeader from './RoomHeader';
import { useState } from 'react';

type Props = {
  room: Room;
};

export default function RoomDetails({ room }: Props) {
  const { isLoading } = useFetchBookings(room.id);
  const [bookings] = useAtom(bookingsAtom);

  const [weekStartDate, setWeekStartDate] = useState(() =>
    getWeekStartDate(new Date())
  );
  const weekDates = getWeekDates(weekStartDate);

  const roomBookings = bookings.filter((b) => b.roomId === room.id);
  const allTimeSlots = generateTimeSlots(room.openFrom, room.openTo);

  const hasAvailableSlots = weekDates.some((date) => {
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

  const goToPreviousWeek = () => {
    const prevWeek = new Date(weekStartDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setWeekStartDate(prevWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(weekStartDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setWeekStartDate(nextWeek);
  };

  return (
    <div className='overflow-x-auto flex flex-col items-center'>
      <RoomHeader
        dates={weekDates}
        onPrevWeek={goToPreviousWeek}
        onNextWeek={goToNextWeek}
      />
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
