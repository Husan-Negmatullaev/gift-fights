import { Toggle } from '@/shared/ui/toggle/toggle';
import { GiftItem } from './gift-item';

export const GiftsForBetting = () => {
  return (
    <div className="grid items-center grid-cols-2 gap-5.5">
      <h1 className="text-white font-semibold text-xl/6">Gift's для ставок</h1>
      <Toggle className="justify-self-end" />

      <ul className="col-span-2 grid gap-4">
        {Array.from({ length: 100 }).map((_item, index) => (
          <li key={index}>
            <GiftItem className="w-full" />
          </li>
        ))}
      </ul>
    </div>
  );
};
