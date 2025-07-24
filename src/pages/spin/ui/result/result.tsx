import { LoadableLottie } from '@/shared/components/lottie/loadable-lottie';
import { TouchableLottie } from '@/shared/components/lottie/touchable-lottie';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { useNavigate, useParams } from 'react-router';
import ConfettiExplosion from 'react-confetti-explosion';
import { shareURL } from '@telegram-apps/sdk-react';
import { Icons } from '@/shared/ui/icons/icons';
import { useGetLobby } from '@/entities/lobby';
import { useEffect, useState } from 'react';

export const Result = () => {
  const navigate = useNavigate();
  const { winnerId, id } = useParams();
  const winnerIdParam = Number(winnerId);
  const lobbyId = Number(id);
  const [isExplodeConfetti, setIsExplodeConfetti] = useState(false);

  const { lobby, loading, error } = useGetLobby(lobbyId);

  useEffect(() => {
    if (lobby) {
      setIsExplodeConfetti(true);
    }
  }, [lobby]);

  // Показываем skeleton загрузку пока данные не загружены
  if (loading) {
    return (
      <div className="pb-25">
        <header className="mb-1.5 py-2 flex items-center justify-between px-4">
          <div className="basis-10 min-h-10 bg-gray-300 rounded-lg animate-pulse" />
          <div className="flex-1 mx-4 h-8 bg-gray-300 rounded animate-pulse" />
          <div className="basis-10 min-h-10 bg-gray-300 rounded-lg animate-pulse" />
        </header>
        <div className="px-4 mb-4 pb-2">
          <div className="text-center mb-4">
            <div className="size-25 mb-1 bg-gray-300 rounded-full mx-auto animate-pulse" />
            <div className="h-6 w-24 bg-gray-300 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 justify-center items-center gap-1 max-w-80 mx-auto">
            <div className="p-2 h-16 bg-gray-300 rounded-2xl animate-pulse" />
            <div className="p-2 h-16 bg-gray-300 rounded-2xl animate-pulse" />
          </div>
        </div>
        <div className="px-4">
          <div className="h-6 w-40 bg-gray-300 rounded mb-4 animate-pulse" />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-300 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Показываем ошибку если данные не загрузились
  if (error || !lobby) {
    return (
      <div className="grid place-content-center h-full">
        <div className="text-center text-white">
          <h2 className="text-xl mb-2">Ошибка загрузки</h2>
          <p className="text-gray-400">Не удалось загрузить данные лобби</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-blue rounded-lg">
            На главную
          </button>
        </div>
      </div>
    );
  }

  const winner = lobby.participants.find(
    (participant) => participant.userId === winnerIdParam,
  );

  const totalAmount = lobby.participants.reduce((acc, participant) => {
    return acc + participant.amount;
  }, 0);

  const gifts = lobby.participants.reduce(
    (acc, participant) => {
      return acc.concat(participant.gifts);
    },
    [] as Array<{
      __typename?: 'Gift';
      id: string;
      slug: string;
      price: number;
      blocked: boolean;
    }>,
  );

  const handleShareLinkToGame = () => {
    shareURL(window.location.href);
  };

  const handleClose = () => {
    navigate('/');
  };

  const winRate =
    totalAmount === 0 ? 0 : ((winner?.amount || 0) / totalAmount) * 100;

  return (
    <div className="pb-25">
      {isExplodeConfetti && (
        <ConfettiExplosion
          duration={3000}
          particleSize={16}
          particleCount={200}
        />
      )}
      <header className="mb-1.5 py-2 flex items-center justify-between px-4">
        <button
          onClick={handleShareLinkToGame}
          className="basis-10 min-h-10 shrink-0 grid place-content-center cursor-pointer rounded-lg bg-white/10 backdrop-blur-[20px]">
          <Icons className="size-4" name="share" />
        </button>
        <h1 className="flex-1 font-bold text-2xl text-white text-center">
          Победитель
        </h1>
        <button
          onClick={handleClose}
          className="basis-10 min-h-10 shrink-0 grid place-content-center cursor-pointer rounded-lg bg-white/10 backdrop-blur-[20px]">
          <Icons className="size-4" name="cross" />
        </button>
      </header>
      <div className="px-4 mb-4 pb-2">
        <div className="text-center mb-4">
          <Avatar
            url={winner?.user.image || ''}
            className="size-25 mb-1 border-2 border-gray-350 mx-auto"
          />
          <h1 className="text-lg font-bold">{winner?.user.username}</h1>
        </div>
        <div className="grid grid-cols-2 justify-center items-center gap-1 max-w-80 mx-auto ">
          <div className="p-2 bg-white/10 backdrop-blur-[1.25rem] border border-white/8 rounded-2xl text-center">
            <h6 className="text-gray-200 text-base/4.5 mb-1">Выигрыш</h6>
            <p className="flex items-center justify-center gap-1 font-bold text-lg text-white">
              {totalAmount.toFixed(0)} TON{' '}
              <div className="bg-blue size-4 rounded-full grid place-content-center">
                <Icons name="ton" className="size-4" />
              </div>{' '}
            </p>
          </div>
          <div className="p-2 bg-white/10 backdrop-blur-[1.25rem] border border-white/8 rounded-2xl text-center">
            <h6 className="text-gray-200 text-base/4.5 mb-1">Шанс</h6>
            <p className="flex items-center justify-center gap-1 font-bold text-lg text-white">
              {winRate.toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
      <div className="px-4">
        <p className="text-lg font-bold text-white mb-4">Полученные гифты:</p>
        <div className="grid grid-cols-3 gap-2">
          {gifts.map((gift) => (
            <LoadableLottie slug={gift.slug} key={gift.id}>
              {(animation) => (
                <GiftCard price={gift.price} animation={animation} />
              )}
            </LoadableLottie>
          ))}
        </div>
      </div>
    </div>
  );
};

type GiftCardProps = {
  price: number;
  animation: unknown;
};

const GiftCard = (props: GiftCardProps) => {
  const { animation, price } = props;

  return (
    <div>
      <div className="border border-white/40 relative rounded-lg overflow-hidden mb-2">
        <TouchableLottie
          animation={animation}
          className="aspect-square rounded-lg overflow-hidden -mb-px"
        />
      </div>
      <p className="flex items-center justify-center gap-1">
        <span className="text-white font-bold text-sm">{price}</span>
        <div className="bg-blue size-4 rounded-full grid place-content-center">
          <Icons name="ton" className="size-4" />
        </div>
      </p>
    </div>
  );
};
