export const appRoutes = {
  LoginPage: '/login-page',
  MyBookings: '/my-bookings',
  RoomsPage: '/',
  RoomDetailsPagePath: '/room/:id',
  RoomDetailsPage: (id: string) => `/room/${id}`,
};

export const appSizes = {
  defaultIconSize: 40,
  headerHeight: 100,
};

export const collections = {
  bookings: 'bookings',
  rooms: 'rooms',
};

export const dayNames = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];

export const monthMap = [
  'januari',
  'februari',
  'mars',
  'april',
  'maj',
  'juni',
  'juli',
  'augusti',
  'september',
  'oktober',
  'november',
  'december',
] as const;
