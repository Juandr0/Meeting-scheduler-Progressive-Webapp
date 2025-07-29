export function GetWeekdayLabel(dateStr: string): string {
  const dayNames = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
  const date = new Date(dateStr);
  return dayNames[date.getDay()];
}
