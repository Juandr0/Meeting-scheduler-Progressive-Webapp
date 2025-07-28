type StatusBadgeProps = {
  isOpen: boolean;
};

export default function StatusBadge({ isOpen }: StatusBadgeProps) {
  return (
    <div
      className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
        ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isOpen ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      {isOpen ? 'Öppet' : 'Stängt'}
    </div>
  );
}
