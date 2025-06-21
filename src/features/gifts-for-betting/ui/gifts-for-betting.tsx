import { Toggle } from '@/shared/ui/toggle/toggle';
import { Checkbox } from '@/shared/ui/checkbox/checkbox';
import type { ComponentPropsWithRef } from 'react';

type GiftsForBettingProps = {
  checkbox: ComponentPropsWithRef<'input'>;
};

export const GiftsForBetting = (props: GiftsForBettingProps) => {
  const { checkbox } = props;

  return (
    <div className="grid items-center grid-cols-2 gap-5.5">
      <h1 className="text-white font-semibold text-xl/6">Gift's для ставок</h1>
      <Toggle variant="dark" className="justify-self-end" />

      <ul className="col-span-2 grid gap-4">
        {Array.from({ length: 100 }).map((_item, index) => (
          <li key={index}>
            <button
              type="button"
              className="w-full relative bg-dark-blue-50 grid gap-3 items-center grid-cols-[28px_1fr_50px] min-h-9.5 px-1.5 rounded-md">
              <Checkbox variant="light" {...checkbox} />
              <h4 className="text-left font-medium text-sm/4">Лягушки</h4>

              <img
                alt="pepe"
                src="/assets/images/gifts/pepe.webp"
                className="absolute top-0 right-0 size-12.5 -translate-y-4 scale-150 pointer-events-none"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
