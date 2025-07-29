export default function GetWeekNumber(date: Date): number {
  const firstDay = new Date(date.getFullYear(), 0, 1);

  const diffInMs = date.getTime() - firstDay.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return Math.floor(diffInDays / 7) + 1;
}
