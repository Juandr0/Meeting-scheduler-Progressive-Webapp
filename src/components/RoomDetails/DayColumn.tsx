import { useBooking } from '../../hooks/useBooking';
import type { Room } from '../../pages/RoomsPage';
import TimeFormatter from '../../utils/TimeFormatter';

type DayColumnProps = {
  date: Date;
  times: string[];
  room: Room;
};

export default function DayColumn({ date, times, room }: DayColumnProps) {
  const label = date.getDate().toString();
  const currentDay = TimeFormatter.getWeekdayLabel(date);
  const { bookTimeSlot } = useBooking();

  return (
    <div className='flex flex-col items-center border-r border-gray-300 last:border-r-0 px-1 xs:px-2 md:px-4 min-w-[40px] xs:w-full  '>
      <span className='font-bold text-lg'>{currentDay}</span>
      <span className='text-xl'>{label}</span>
      <div className='border-b border-gray-300 w-full my-2' />
      <div className='flex flex-col pt-2 gap-4 w-full'>
        {times.map((time) => (
          <button
            key={time}
            onClick={() => {
              bookTimeSlot(room, time, date);
            }}
            className='rounded-lg border border-gray-400 h-10 w-full bg-green-100 xs:h-15 p-1 text-[0.8rem] xs:text-md sm:text-lg md:text-xl'
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}
