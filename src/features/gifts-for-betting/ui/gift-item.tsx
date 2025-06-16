import { Checkbox } from '@/shared/ui/checkbox/checkbox';
import clsx from 'clsx';

type GiftItemProps = {
  className?: string;
};

export const GiftItem = (props: GiftItemProps) => {
  const { className } = props;

  return (
    <button
      type="button"
      className={clsx(
        className,
        'relative bg-dark-blue-50 grid gap-3 items-center grid-cols-[28px_1fr_50px] min-h-9.5 px-1.5 rounded-md',
      )}>
      <Checkbox />
      <h4 className="text-left font-medium text-sm/4">Лягушки</h4>

      <img
        alt="pepe"
        src="/assets/images/gifts/pepe.webp"
        className="absolute top-0 right-0 size-12.5 -translate-y-4 scale-150 pointer-events-none"
      />
    </button>
  );
};
