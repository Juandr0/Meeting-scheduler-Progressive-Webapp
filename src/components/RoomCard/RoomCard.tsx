import { IoIosArrowForward } from 'react-icons/io';

import { calculateIfOpen } from '../../utils/dateUtils';
import { Link } from 'react-router-dom';

import StatusBadge from './StatusBadge';
import type { Room } from '../../types/Room';
import { appColors, appRoutes, appSizes } from '../../constants/constants';

export default function RoomCard({ room }: { room: Room }) {
  const {
    name,
    openFrom,
    openTo,
    id,
    description,
    isClosed,
    isClosedDescription,
  } = room;
  const isOpen = calculateIfOpen(openFrom, openTo);

  if (isClosed) {
    return (
      <div className='w-full max-w-md rounded-2xl shadow-sm p-4 border border-gray-300 bg-gray-200 text-gray-600 select-none cursor-not-allowed'>
        <div className='flex flex-col gap-2'>
          <h2 id={`room-${id}-label`} className='text-lg font-semibold'>
            {name} (Stängt)
          </h2>
          <p id={`room-${id}-desc`} className='text-sm'>
            {isClosedDescription ?? 'Rummet är tillfälligt stängt.'}
          </p>
          <div className='text-sm'>
            <p>
              Öppettider:{' '}
              <span className='font-medium'>
                {openFrom} – {openTo}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={appRoutes.RoomDetailsPage(id)}
      state={{ room }}
      aria-label={`Visa detaljer för mötesrummet ${name}`}
      className='w-full max-w-md flex items-center justify-between bg-white rounded-2xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition cursor-pointer no-underline'
    >
      <div className='flex-1 flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg text-black font-semibold'>{name}</h2>
          <StatusBadge isOpen={isOpen} />
        </div>
        <p className='text-sm text-gray-600'>{description}</p>
        <div className='text-sm text-gray-600'>
          <p>
            Öppettider:{' '}
            <span className='font-medium'>
              {openFrom} – {openTo}
            </span>
          </p>
        </div>
      </div>

      <IoIosArrowForward
        size={appSizes.defaultIconSize}
        className='text-gray-400 ml-4 flex-shrink-0'
        color={appColors.brown700}
      />
    </Link>
  );
}
