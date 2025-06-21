import { GiftHeaderCard } from '@/entities/gift';

export const PVP = () => {
  return (
    <div className="grid grid-flow-row grid-rows-[170px] grid-cols-[repeat(3,_107px)] gap-3">
      <GiftHeaderCard />

      <div className="self-center">
        <img src="/assets/images/pvp/swords.webp" alt="" />
      </div>

      <GiftHeaderCard />
    </div>
  );
};
