import { lobbyImagesByBets, useGetLobbies } from '@/entities/lobby';
import { useTelegram } from '@/entities/telegram';
import { LobbyStatus } from '@/shared/api/graphql/graphql';
import { LoadingSpinner } from '@/shared/components/loading-spinner/loading-spinner';
import { Link } from 'react-router';

function getLobbyBetKey(
  minBet: number | null,
  maxBet: number | null,
): Record<'background' | 'image', string> {
  if (minBet === 50 && maxBet === null) {
    return {
      image: '/assets/images/main/epic-chest-of-tons.webp',
      background: '/assets/images/play/octopus.webp',
    };
  }

  if (minBet === null || maxBet === null) {
    return {
      image: '/assets/images/main/infinite-cube.webp',
      background: '/assets/images/play/octopus.webp',
    };
  }

  return lobbyImagesByBets[`min_${minBet}_max_${maxBet}`];
}

export const Main = () => {
  const tg = useTelegram();

  const { lobbies, loading } = useGetLobbies(15, 0, [
    LobbyStatus.Countdown,
    LobbyStatus.InProcess,
    LobbyStatus.WaitingForPlayers,
  ]);

  if (loading) {
    return (
      <div className="grid place-content-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="pb-4">
      <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% text-white mb-8">
        <div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-6">
          <img
            alt="octopus"
            src={'/assets/images/play/telegrams.webp'}
            className="pointer-events-none absolute -top-2 left-2 w-87"
          />
          <div className="max-w-56 relative">
            <h2 className="text-lg/5 font-medium mb-1.5 text-[16px]">
              {'Хочешь добавить NFT-гифт ?'}
            </h2>
            <p className="text-tiny mb-2 text-[14px]">Жми сюда 👇</p>
            <div
              onClick={() => {
                tg.openTelegramLink('https://t.me/labs_relayer');
              }}
              className="grid place-content-center bg-white text-blue px-4 min-h-7.5 max-w-31 text-xs font-semibold rounded-2.5">
              @labs_relayer
            </div>
          </div>
        </div>
        <img
          alt="telegram cap"
          src={'assets/images/main/ton-plus.png'}
          className="pointer-events-none h-24 absolute top-3 right-9 scale-160 drop-shadow-[0px_0px_1.27px_0px_#6BCEFF,0px_0px_1.27px_0px_#6BCEFF,0px_0px_4.44px_0px_#6BCEFF,0px_0px_8.87px_0px_#6BCEFF,0px_0px_15.21px_0px_#6BCEFF,0px_0px_26.61px_0px_#6BCEFF]"
        />
      </article>
      <div className="px-6 grid gap-9 content-start">
        {lobbies.map((lobby) => {
          const images = getLobbyBetKey(
            lobby.minBet ?? null,
            lobby.maxBet ?? null,
          );

          const isAllBetsNullable =
            lobby.minBet === null && lobby.maxBet === null;

          console.log(lobby.minBet, lobby.maxBet, images.image);

          return (
            <Link to={`/spin/${lobby.id}`} className="block" key={lobby.id}>
              <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2.5xl text-white">
                <div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-4.5 rounded-2.5xl">
                  <img
                    alt="octopus"
                    src={images.background}
                    className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
                  />
                  <div className="max-w-48 relative">
                    <h2 className="text-lg/5 font-medium mb-1.5">
                      {lobby.title}
                    </h2>
                    <p className="text-tiny mb-2">
                      Делайте ставки, выигрывайте, но не превышайте сумму
                      ставки:
                    </p>
                    {isAllBetsNullable ? (
                      <div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
                        <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                          ∞ TON
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
                        <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                          {lobby.minBet} TON
                        </div>
                        -
                        {lobby.maxBet ? (
                          <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                            {lobby.maxBet} TON
                          </div>
                        ) : (
                          <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                            ∞ TON
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <img
                  alt="telegram cap"
                  src={images.image}
                  className="pointer-events-none h-32 absolute -top-3 right-2 scale-160 drop-shadow-[0px_0px_1.27px_0px_#6BCEFF,0px_0px_1.27px_0px_#6BCEFF,0px_0px_4.44px_0px_#6BCEFF,0px_0px_8.87px_0px_#6BCEFF,0px_0px_15.21px_0px_#6BCEFF,0px_0px_26.61px_0px_#6BCEFF]"
                />
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
