import type { Booking } from '../types/Booking';

const monthMap: Record<string, string> = {
  '0': 'januari',
  '1': 'februari',
  '2': 'mars',
  '3': 'april',
  '4': 'maj',
  '5': 'juni',
  '6': 'juli',
  '7': 'augusti',
  '8': 'september',
  '9': 'oktober',
  '10': 'november',
  '11': 'december',
};

const dayNames = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];

const TimeFormatter = {
  getUniqueDates(bookings: Booking[]): string[] {
    const uniqueDates = Array.from(
      new Set(
        bookings.map((b) => b.startTime.toISOString().slice(0, 10)) // 'YYYY-MM-DD'
      )
    );
    uniqueDates.sort();
    return uniqueDates;
  },

  getMonth(monthIndex: number): string {
    return monthMap[monthIndex.toString()] || '';
  },

  getWeekdayLabel(date: Date): string {
    return dayNames[date.getDay()];
  },

  getWeekNumber(date: Date): number {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const diffInMs = date.getTime() - firstDay.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return Math.floor(diffInDays / 7) + 1;
  },

  formatTime(date: Date): string {
    return date.toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  formatDate(date: Date): string {
    const day = date.getDate();
    const monthName = this.getMonth(date.getMonth());
    const weekday = this.getWeekdayLabel(date);
    return `${weekday} ${day} ${monthName}`;
  },

  getWeekStartDate(date: Date): Date {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const weekStart = new Date(date);
    weekStart.setDate(weekStart.getDate() + diff);
    weekStart.setHours(0, 0, 0, 0);
    return weekStart;
  },

  getWeekDates(weekStartDate: Date): Date[] {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStartDate);
      d.setDate(weekStartDate.getDate() + i);
      dates.push(d);
    }
    return dates;
  },
};

export default TimeFormatter;
