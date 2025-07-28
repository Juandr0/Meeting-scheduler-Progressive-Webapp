function timeStringToDate(timeStr: string): Date {
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
