import { Icons } from '@/shared/ui/icons/icons';

export const AddTon = () => {
  return (
    <div className="grid items-center grid-cols-[20px_1fr_28px] gap-3 bg-dark-blue-100 py-1 pl-2 pr-1 rounded-full">
      <Icons name="ton" className="text-white" width={20} height={20} />

      <span>2 000</span>

      <button
        type="button"
        className="grid place-content-center bg-blue h-7 rounded-full cursor-pointer">
        <Icons name="plus" width={8} height={8} />
      </button>
    </div>
  );
};
