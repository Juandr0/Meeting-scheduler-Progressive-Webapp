import { IoIosArrowForward } from 'react-icons/io';
import { AppSizes } from '../../constants/AppSizes';
import { calculateIfOpen } from '../../utils/TimeUtils';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants/AppRoutes';
import type { Room } from '../../pages/RoomsPage';
import StatusBadge from './StatusBadge';

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
    // Stängt rum. ej klickbart
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

  // Vanlig öppen rum-card med länk
  return (
    <Link
      to={AppRoutes.RoomDetailsPage(id)}
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
        size={AppSizes.defaultIconSize}
        className='text-gray-400 ml-4 flex-shrink-0'
      />
    </Link>
  );
}
