import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { AppSizes } from '../../constants/AppSizes';
import DayColumn from './DayColumn';
import { mockBookings } from '../../services/firebase';
import { GenerateTimeSlots } from '../../utils/GenerateTimeSlots';
import type { Room } from '../../pages/RoomsPage';
import TimeFormatter from '../../utils/TimeFormatter';

type Props = {
  room: Room;
};

export default function RoomDetails({ room }: Props) {
  const roomBookings = mockBookings.filter((b) => b.roomId === room.id);

  if (roomBookings.length === 0) {
    return <p className='text-center'>Inga lediga tider för detta rum.</p>;
  }

  const firstBookingDate = getFirstBookingDate(roomBookings);
  const weekStart = TimeFormatter.getWeekStartDate(firstBookingDate);
  const weekDates = TimeFormatter.getWeekDates(weekStart);
  const allSlots = GenerateTimeSlots(room.openFrom, room.openTo);
  const headerDate = getHeaderDateRange(weekDates);

  return (
    <div className='overflow-x-auto flex flex-col items-center'>
      <Header
        title={headerDate}
        week={TimeFormatter.getWeekNumber(firstBookingDate)}
      />

      <section className='px-2 pb-4 w-full flex justify-center'>
        <div className='flex flex-nowrap gap-2 overflow-x-auto'>
          {weekDates.map((date) => {
            const label = date.getDate().toString();
            const currentDay = TimeFormatter.getWeekdayLabel(date);

            const bookedSlots = getBookedSlotsForDate(roomBookings, date);
            const availableSlots = allSlots.filter(
              (slot) => !bookedSlots.includes(slot)
            );

            return (
              <DayColumn
                key={currentDay}
                label={label}
                date={currentDay}
                times={availableSlots}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

// Helpers

function getFirstBookingDate(bookings: typeof mockBookings) {
  return bookings
    .map((b) => b.startTime)
    .sort((a, b) => a.getTime() - b.getTime())[0];
}

function getBookedSlotsForDate(bookings: typeof mockBookings, date: Date) {
  return bookings
    .filter(
      (b) =>
        b.startTime.getFullYear() === date.getFullYear() &&
        b.startTime.getMonth() === date.getMonth() &&
        b.startTime.getDate() === date.getDate()
    )
    .map((b) => TimeFormatter.formatTime(b.startTime));
}

function getHeaderDateRange(weekDates: Date[]): string {
  const first = weekDates[0];
  const last = weekDates[6];
  const firstDay = first.getDate();
  const lastDay = last.getDate();
  const firstMonth = TimeFormatter.getMonth(first.getMonth());
  const lastMonth = TimeFormatter.getMonth(last.getMonth());

  return firstMonth === lastMonth
    ? `${firstDay}-${lastDay} ${firstMonth}`
    : `${firstDay} ${firstMonth}-${lastDay} ${lastMonth}`;
}

function Header({ title, week }: { title: string; week: number }) {
  return (
    <header className='flex w-full justify-between items-center py-5 px-4 sm:px-10'>
      <button>
        <MdArrowBackIos size={AppSizes.defaultIconSize} />
      </button>
      <div className='flex items-center flex-col'>
        <h2 className='text-2xl'>{title}</h2>
        <h2 className='text-xl'>Vecka {week}</h2>
      </div>
      <button>
        <MdArrowForwardIos size={AppSizes.defaultIconSize} />
      </button>
    </header>
  );
}
