export function GenerateTimeSlots(openFrom: string, openTo: string): string[] {
  const openHour = parseInt(openFrom.split(':')[0], 10);
  const closingHour = parseInt(openTo.split(':')[0], 10);

  var slots = [];

  for (var i = openHour; i < closingHour; i++) {
    const hoursStr = i.toString().padStart(2, '0');
    slots.push(`${hoursStr}:00`);
  }
  return slots;
}
