import { GiftHeaderCard } from '@/entities/gift/ui/gift-header-card';
import { SpinGifts } from '@/features/spin-gifts';

export const Spin = () => {
  return (
    <div className="grid gap-6 py-11.5 mx-auto">
      <SpinGifts />

      <div className="px-6">
        <h1 className="text-base mb-3">Игроки и ставки</h1>
        <div className="grid grid-flow-row auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(107px,_1fr))] gap-3">
          <GiftHeaderCard
            name="Ожидание игрока"
            url="/assets/images/gifts/gift.webp"
          />
          <GiftHeaderCard
            name="Ожидание игрока"
            url="/assets/images/gifts/gift.webp"
          />
          <GiftHeaderCard
            name="Ожидание игрока"
            url="/assets/images/gifts/gift.webp"
          />
          <GiftHeaderCard
            name="Ожидание игрока"
            url="/assets/images/gifts/gift.webp"
          />
          <GiftHeaderCard name="Ожидание игрока" />
          <GiftHeaderCard name="Ожидание игрока" />
          <GiftHeaderCard name="Ожидание игрока" />
          <GiftHeaderCard name="Ожидание игрока" />
          <GiftHeaderCard name="Ожидание игрока" />
        </div>
      </div>
    </div>
  );
};
