export const appRoutes = {
  LoginPage: '/login-page',
  MyBookings: '/my-bookings',
  RoomsPage: '/',
  RoomDetailsPagePath: '/room/:id',
  RoomDetailsPage: (id: string) => `/room/${id}`,
};

export const appColors = {
  brown700: '#92400e',
};
export const appSizes = {
  defaultIconSize: 40,
  headerHeight: 100,
};

export const collections = {
  bookings: 'bookings',
  rooms: 'rooms',
};

export const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const monthMap = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;
