import { getMonth, getWeekdayLabel } from './dateUtils';

export function formatTimeHHmm(date: Date): string {
  return date.toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateString(date: Date): string {
  const day = date.getDate();
  const monthName = getMonth(date.getMonth());
  const weekday = getWeekdayLabel(date);
  return `${weekday} ${day} ${monthName}`;
}

export function getHeaderDateRange(weekDates: Date[]): string {
  const first = weekDates[0];
  const last = weekDates[6];
  const firstDay = first.getDate();
  const lastDay = last.getDate();
  const firstMonth = getMonth(first.getMonth());
  const lastMonth = getMonth(last.getMonth());

  return firstMonth === lastMonth
    ? `${firstDay}-${lastDay} ${firstMonth}`
    : `${firstDay} ${firstMonth}-${lastDay} ${lastMonth}`;
}
