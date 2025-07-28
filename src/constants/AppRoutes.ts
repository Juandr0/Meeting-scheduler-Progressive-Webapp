export const AppRoutes = {
  RoomsPage: '/',
  RoomDetailsPagePath: '/room/:id', 
  RoomDetailsPage: (id: string) =>  `/room/${id}`,
}
