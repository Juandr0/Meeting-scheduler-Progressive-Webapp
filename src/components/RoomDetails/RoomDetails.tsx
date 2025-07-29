import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { AppSizes } from '../../constants/AppSizes';
import DayColumn from './DayColumn';
import { mockBookings } from '../../services/firebase';
import { GenerateTimeSlots } from '../../utils/GenerateTimeSlots';
import type { Room } from '../../pages/RoomsPage';
import { GetWeekdayLabel } from '../../utils/GetWeekDayLabel';
import { GetUniqueDates } from '../../utils/GetUniqueDates';
import GetWeekNumber from '../../utils/CalculateWeek';
import GetMonth from '../../utils/GetMonth';

export default function RoomDetails({ room }: { room: Room }) {
  const roomBookings = mockBookings.filter((b) => b.roomId === room.id);
  const uniqueDates = GetUniqueDates(roomBookings);
  const allSlots = GenerateTimeSlots(room.openFrom, room.openTo);
  const monthStr = GetMonth(uniqueDates[0].split('-')[1]);
  const firstDay = uniqueDates[0].split('-')[2];
  const lastDay = uniqueDates[uniqueDates.length - 1].split('-')[2];

  return (
    <div className='overflow-x-auto'>
      <header className='flex justify-between items-center py-5 px-10'>
        <button>
          <MdArrowBackIos size={AppSizes.defaultIconSize} />
        </button>
        <div className='flex items-center flex-col'>
          <h2 className='text-2xl'>
            {firstDay}-{lastDay} {monthStr}
          </h2>
          <h2 className='text-xl'>
            Vecka {GetWeekNumber(new Date(uniqueDates[0]))}
          </h2>
        </div>
        <button>
          <MdArrowForwardIos size={AppSizes.defaultIconSize} />
        </button>
      </header>

      <section className='px-2 pb-4'>
        <div className='flex justify-between gap-2'>
          {uniqueDates.map((dateStr) => {
            const currentDay = GetWeekdayLabel(dateStr);
            const bookedSlots = roomBookings
              .filter((b) => b.date === dateStr)
              .map((b) => b.startTime);
            const availableSlots = allSlots.filter(
              (slot) => !bookedSlots.includes(slot)
            );

            return (
              <DayColumn
                key={dateStr}
                label={currentDay}
                date={dateStr}
                times={availableSlots}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
