import { PVP } from '@/features/pvp';
import { YourGifts } from '@/features/your-gifts';
import { BlockTimer } from '@/shared/components/block-timer/block-timer';

export const Fight = () => {
  return (
    <div className="grid gap-6 py-2">
      <div className="grid grid-cols-2 items-center gap-2 px-6 mb-1">
        <h1 className="font-bold text-xl text-white">Лобби игроков</h1>
        <BlockTimer content="60 сек" className="justify-self-end" />
      </div>

      <div className="min-h-59 px-6 grid place-content-center bg-dark-blue-50">
        <PVP />
      </div>

      <div className="px-6">
        <YourGifts />
      </div>
    </div>
  );
};
