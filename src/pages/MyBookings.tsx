import { useAtom } from 'jotai';
import { userBookingAtom } from '../atoms/userBookingsAtom';
import { roomsAtom } from '../atoms/roomsAtom';
import { getMonth, getWeekdayLabel } from '../utils/dateUtils';
import { removeBooking } from '../services/removeBooking';
import type { Booking } from '../types/Booking';

export default function MyBookings() {
  const [userBookings, setUserBookings] = useAtom(userBookingAtom);
  const [rooms] = useAtom(roomsAtom);
  console.log('User bookings:', userBookings);

  function getRoomName(roomId: string) {
    const room = rooms.find((r) => r.id === roomId);
    return room ? room.name : 'Okänt rum';
  }

  function formatDateTime(date: Date) {
    if (!date) return '';
    const d = new Date(date);
    const weekday = getWeekdayLabel(d);
    const day = d.getDate();
    const month = getMonth(d.getMonth());
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${weekday} ${day} ${month} ${hours}:${minutes}`;
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
    <div className='max-w-md mx-auto font-sans mt-6'>
      <h2 className='text-2xl font-semibold mb-4'>Mina Bokningar</h2>

      {userBookings.length === 0 ? (
        <p>Inga bokningar än</p>
      ) : (
        userBookings.map((booking, index) => (
          <div
            key={`${booking.roomId}-${booking.startTime}-${index}`}
            className='relative border border-gray-300 rounded-lg p-4 mb-4 shadow-sm bg-white'
          >
            <button
              type='button'
              aria-label='Avboka bokning'
              title='Avboka bokning'
              className='absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500 text-white text-lg font-bold flex items-center justify-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400'
              onClick={() => handleCancel(booking)}
            >
              ×
            </button>

            <h3 className='mb-2 font-medium'>
              Rum: {getRoomName(booking.roomId)}
            </h3>
            <p className='mb-1'>
              Start: <strong>{formatDateTime(booking.startTime)}</strong>
            </p>
            <p className='mb-1'>
              Slut: <strong>{formatDateTime(booking.endTime)}</strong>
            </p>
            {booking.createdAt && (
              <p className='text-sm text-gray-600'>
                Bokad: {formatDateTime(booking.createdAt)}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
