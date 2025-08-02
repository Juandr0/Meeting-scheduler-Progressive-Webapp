type DropdownMenuProps = {
  onClose: () => void;
  onSignOut: () => void;
};

export default function DropdownMenu({
  onClose,
  onSignOut,
}: DropdownMenuProps) {
  return (
    <div className='absolute right-0 top-full w-52 bg-white border border-gray-300 rounded-lg shadow-xl z-50'>
      <div className='p-4 border-b border-gray-300 font-semibold text-gray-700'>
        Inloggad
      </div>

      <button
        type='button'
        className='block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-150'
        onClick={onClose} // Stänger menyn, navigering kan ske utanför
      >
        Mina bokningar
      </button>

      <button
        type='button'
        className='block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-semibold transition-colors duration-150'
        onClick={() => {
          onSignOut();
          onClose();
        }}
      >
        Logga ut
      </button>
    </div>
  );
}
