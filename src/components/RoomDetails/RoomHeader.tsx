import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { appSizes } from '../../constants/constants';

import { getHeaderDateRange } from '../../utils/formatters';
import { getWeekNumber } from '../../utils/dateUtils';

type Props = {
  dates: Date[];
  onPrevWeek: () => void;
  onNextWeek: () => void;
};

export default function RoomHeader({ dates, onPrevWeek, onNextWeek }: Props) {
  const title = getHeaderDateRange(dates);
  const week = getWeekNumber(dates[0]);
  const currentWeek = getWeekNumber(new Date());

  return (
    <header className='flex w-full justify-between items-center py-5 px-4 sm:px-10'>
      <button
        onClick={onPrevWeek}
        disabled={week <= currentWeek}
        className={
          week <= currentWeek
            ? 'opacity-10 cursor-not-allowed pointer-events-none:'
            : ''
        }
      >
        <MdArrowBackIos
          size={appSizes.defaultIconSize}
          className={week <= currentWeek ? 'cursor-not-allowed' : ''}
        />
      </button>

      <div className='flex items-center flex-col'>
        <h2 className='text-2xl'>{title}</h2>
        <h2 className='text-xl'>Week {week}</h2>
      </div>
      <button onClick={onNextWeek}>
        <MdArrowForwardIos size={appSizes.defaultIconSize} />
      </button>
    </header>
  );
}
