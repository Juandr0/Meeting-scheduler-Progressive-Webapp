import { matchPath, useLocation } from 'react-router-dom';
import { appRoutes } from '../constants/constants';

export function getTitleFromPath(): string {
  const location = useLocation();
  const roomName = (location.state as { room?: { name?: string } })?.room?.name;
  if (location.pathname === appRoutes.LoginPage) return 'Logga in';
  if (location.pathname === appRoutes.RoomsPage) return 'Mötesrum';
  if (matchPath(appRoutes.RoomDetailsPagePath, location.pathname)) {
    return roomName || 'Detaljer';
  }
  return '';
}
