export type Room = {
  id: string;
  name: string;
  openFrom: string;
  openTo: string;
  description?: string;
  isClosed?: boolean;
  isClosedDescription?: string;
};
