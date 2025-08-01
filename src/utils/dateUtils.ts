import { dayNames, monthMap } from '../constants/constants';

export function timeStringToDate(timeStr: string): Date {
  const now = new Date();
  const [hours, minutes] = timeStr.split(':').map(Number);
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );
}

export function calculateIfOpen(openFrom: string, openTo: string): boolean {
  const now = new Date();
  const fromDate = timeStringToDate(openFrom);
  const toDate = timeStringToDate(openTo);

  return now >= fromDate && now <= toDate;
}

export function getMonth(monthIndex: number): string {
  return monthMap[monthIndex] || '';
}

export function getWeekdayLabel(date: Date): string {
  return dayNames[date.getDay()];
}

export function getWeekNumber(date: Date): number {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const diffInMs = date.getTime() - firstDay.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return Math.floor(diffInDays / 7) + 1;
}

export function getWeekStartDate(date: Date): Date {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate() + diff);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

export function getWeekDates(weekStartDate: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStartDate);
    d.setDate(weekStartDate.getDate() + i);
    return d;
  });
}

export function getCurrentWeekDates(): Date[] {
  const today = new Date();
  const start = getWeekStartDate(today);
  return getWeekDates(start);
}
