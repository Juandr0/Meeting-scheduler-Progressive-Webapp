const bookings = [
  { id: 1, title: 'Bokning 1', date: '2025-08-02', location: 'Stockholm' },
  { id: 2, title: 'Bokning 2', date: '2025-08-05', location: 'Göteborg' },
  { id: 3, title: 'Bokning 3', date: '2025-08-10', location: 'Malmö' },
];

export default function MyBookings() {
  return (
    <div
      style={{
        maxWidth: 400,
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2> Mina Bokningar </h2>
      {bookings.length === 0 ? (
        <p> Inga bokningar än </p>
      ) : (
        bookings.map(({ id, title, date, location }) => (
          <div
            key={id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ margin: '0 0 6px 0' }}>{title}</h3>
            <p style={{ margin: '4px 0' }}>
              Datum: <strong>{date}</strong>
            </p>
            <p style={{ margin: '4px 0' }}>
              Plats: <strong>{location}</strong>
            </p>
          </div>
        ))
      )}
    </div>
  );
}
