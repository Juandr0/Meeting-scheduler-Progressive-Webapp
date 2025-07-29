type DayColumnProps = {
  label: string;
  date: string;
  times: string[];
};

export default function DayColumn({ label, date, times }: DayColumnProps) {
  return (
    <div className='flex flex-col items-center min-w-[70px]'>
      <span className='text-xl'>{label}</span>
      <span className='font-bold text-lg'>{date}</span>
      <div className='border-t-1 border-gray-300 w-full' />
      <div className='flex flex-col gap-3 pt-5'>
        {times.map((time) => (
          <span key={time} className='text-lg'>
            <button className='rounded-2xl bg-green-200 p-5'>{time}</button>
          </span>
        ))}
      </div>
    </div>
  );
}
