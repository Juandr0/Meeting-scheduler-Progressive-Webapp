import { useAtom } from 'jotai';
import { authAtom } from '../atoms/userAtom';
import { bookingsAtom } from '../atoms/bookingsAtom';
import { roomsAtom } from '../atoms/roomsAtom';
import { getMonth, getWeekdayLabel } from '../utils/dateUtils';

export default function MyBookings() {
  const [user] = useAtom(authAtom);
  const [bookings, setBookings] = useAtom(bookingsAtom);
  const [rooms] = useAtom(roomsAtom);

  const userBookings = bookings.filter(
    (booking) => booking.userId === user?.uid
  );

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

  function handleCancel(roomId: string, startTime: Date) {
    if (!confirm('Vill du verkligen avboka denna tid?')) return;

    const updatedBookings = bookings.filter(
      (b) =>
        !(
          b.roomId === roomId &&
          new Date(b.startTime).getTime() === new Date(startTime).getTime() &&
          b.userId === user?.uid
        )
    );
    setBookings(updatedBookings);
  }

  return (
    <div className='max-w-md mx-auto font-sans mt-6'>
      <h2 className='text-2xl font-semibold mb-4'>Mina Bokningar</h2>

      {userBookings.length === 0 ? (
        <p>Inga bokningar än</p>
      ) : (
        userBookings.map(({ roomId, startTime, endTime, createdAt }, index) => (
          <div
            key={`${roomId}-${startTime}-${index}`}
            className='relative border border-gray-300 rounded-lg p-4 mb-4 shadow-sm bg-white'
          >
            <button
              type='button'
              aria-label='Avboka bokning'
              title='Avboka bokning'
              className='absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500 text-white text-lg font-bold flex items-center justify-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400'
              onClick={() => handleCancel(roomId, startTime)}
            >
              ×
            </button>

            <h3 className='mb-2 font-medium'>Rum: {getRoomName(roomId)}</h3>
            <p className='mb-1'>
              Start: <strong>{formatDateTime(startTime)}</strong>
            </p>
            <p className='mb-1'>
              Slut: <strong>{formatDateTime(endTime)}</strong>
            </p>
            {createdAt && (
              <p className='text-sm text-gray-600'>
                Bokad: {formatDateTime(createdAt)}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
