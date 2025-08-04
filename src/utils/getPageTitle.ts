import { matchPath, useLocation } from 'react-router-dom';
import { appRoutes } from '../constants/constants';

export function getTitleFromPath(): string {
  const location = useLocation();
  const roomName = (location.state as { room?: { name?: string } })?.room?.name;
  if (location.pathname === appRoutes.LoginPage) return 'Sign in';
  if (location.pathname === appRoutes.RoomsPage) return 'Rooms';
  if (location.pathname === appRoutes.MyBookings) return 'My bookings';
  if (matchPath(appRoutes.RoomDetailsPagePath, location.pathname)) {
    return roomName || 'Details';
  }
  return '';
}
