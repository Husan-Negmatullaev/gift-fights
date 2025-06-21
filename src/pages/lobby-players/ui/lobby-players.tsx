import { GiftHeaderCard } from '@/entities/gift';
import { YourGifts } from '@/features/your-gifts';
import { BlockTimer } from '@/shared/components/block-timer/block-timer';
import { BottomButton } from '@/shared/components/bottom-button/bottom-button';
import { useNavigate } from 'react-router';

export const LobbyPlayers = () => {
  const navigate = useNavigate();

  const handleNavigateToSpin = () => navigate('/spin');

  return (
    <div>
      <div className="pt-2 pb-4 px-6 flex items-center gap-2 justify-between">
        <h1 className="font-bold text-xl text-white">Лобби игроков</h1>

        <BlockTimer content="60 сек" />
      </div>

      <div className="grid grid-flow-row auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(107px,_1fr))] gap-3 bg-dark-blue-50 px-6 py-3 mb-5">
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

      <div className="grid gap-6 px-6 pb-5">
        <BottomButton
          className="w-full"
          content={'Поделиться лобби'}
          onClick={handleNavigateToSpin}
        />

        <YourGifts />
      </div>
    </div>
  );
};
