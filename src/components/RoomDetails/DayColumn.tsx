import { useState } from 'react';
import { useBooking } from '../../hooks/useBooking';
import type { Room } from '../../types/Room';
import { getWeekdayLabel } from '../../utils/dateUtils';

type DayColumnProps = {
  date: Date;
  allTimeSlots: string[];
  bookedSlots: string[];
  room: Room;
};

export default function DayColumn({
  date,
  allTimeSlots: times,
  bookedSlots: bookedSlots,
  room,
}: DayColumnProps) {
  const label = date.getDate().toString();
  const currentDay = getWeekdayLabel(date);
  const { bookTimeSlot } = useBooking();
  const [booked, setBooked] = useState(bookedSlots);

  const onBookingSucces = (newBooking: string) => {
    setBooked((prev) => [...prev, newBooking]);
  };
  return (
    <div className='flex flex-col items-center border-r border-gray-300 last:border-r-0 px-1 xs:px-2 md:px-4 min-w-[40px] xs:w-full'>
      <span className='font-bold text-lg'>{currentDay}</span>
      <span className='text-xl'>{label}</span>
      <div className='border-b border-gray-300 w-full my-2' />
      <div className='flex flex-col pt-2 gap-2 w-full'>
        {times.map((time) => {
          const isBooked = booked.includes(time);
          return (
            <button
              key={time}
              onClick={() =>
                !isBooked && bookTimeSlot(room, time, date, onBookingSucces)
              }
              disabled={isBooked}
              className={`rounded-lg border h-10 w-full text-[0.8rem] xs:text-md sm:text-lg md:text-xl
                ${
                  isBooked
                    ? 'border-gray-400 bg-gray-300 text-gray-600 cursor-not-allowed pointer-events-none'
                    : 'border-gray-400 bg-green-100 hover:bg-green-200 cursor-pointer'
                }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
