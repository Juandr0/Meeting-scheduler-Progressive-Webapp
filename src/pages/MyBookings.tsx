import { useAtom } from 'jotai';
import { userBookingAtom } from '../atoms/userBookingsAtom';
import { roomsAtom } from '../atoms/roomsAtom';
import { formatDate, formatTime } from '../utils/formatters';
import { removeBooking } from '../services/removeBooking';
import type { Booking } from '../types/Booking';

export default function MyBookings() {
  const [userBookings, setUserBookings] = useAtom(userBookingAtom);
  const [rooms] = useAtom(roomsAtom);

  userBookings.sort((a, b) => {
    return a.startTime.getTime() - b.startTime.getTime();
  });

  function getRoomName(roomId: string) {
    const room = rooms.find((r) => r.id === roomId);
    return room ? room.name : 'Okänt rum';
  }

  function formatBookingDateRange(start: Date, end: Date) {
    return `${formatDate(start)} ${formatTime(start)}-${formatTime(end)}`;
  }

  async function handleCancel(booking: Booking) {
    const confirmDelete = confirm('Vill du verkligen avboka denna tid?');
    if (!confirmDelete) return;

    try {
      await removeBooking(booking);

      setUserBookings((prev) =>
        prev.filter(
          (b) =>
            !(
              b.roomId === booking.roomId &&
              new Date(b.startTime).getTime() ===
                new Date(booking.startTime).getTime() &&
              b.userId === booking.userId
            )
        )
      );
    } catch (err) {
      console.error('Kunde inte ta bort bokningen:', err);
    }
  }

  return (
    <div className='max-w-md mx-auto font-sans mt-6 px-4'>
      {userBookings.length === 0 ? (
        <p className='text-center text-gray-600'>Inga bokningar ännu</p>
      ) : (
        userBookings.map((booking, index) => {
          const start = new Date(booking.startTime);
          const end = new Date(booking.endTime);
          const createdAt = booking.createdAt
            ? new Date(booking.createdAt)
            : null;

          return (
            <div
              key={`${booking.roomId}-${booking.startTime}-${index}`}
              className='relative border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white mb-6'
            >
              <div className='p-5 text-center'>
                <h3 className='text-lg font-semibold text-gray-800 mb-1'>
                  {getRoomName(booking.roomId)}
                </h3>

                <p className='text-sm text-gray-700'>
                  {formatBookingDateRange(start, end)}
                </p>

                {createdAt && (
                  <p className='text-xs text-gray-500 mt-1'>
                    Bokad: {formatDate(createdAt)} {formatTime(createdAt)}
                  </p>
                )}
              </div>

              <button
                type='button'
                onClick={() => handleCancel(booking)}
                className='w-full bg-red-700 text-white py-3 text-sm font-semibold hover:bg-red-800 transition-colors'
              >
                Avboka tid
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
