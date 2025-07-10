import { AppLottie } from '@/shared/components/lottie/app-lottie';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { Icons } from '@/shared/ui/icons/icons';
import { useGetMySquare, useGetRewards } from '@/entities/leaderboards';
import { Place, type GetLeaderboardQuery } from '@/shared/api/graphql/graphql';
import { LoadableLottie } from '@/shared/components/lottie/loadable-lottie';

type LeaderUsersProps = {
  leaders: GetLeaderboardQuery['leaderboard'];
};

// function _removeLottieBackground(lottieData: any) {
//   if (!lottieData.layers || !Array.isArray(lottieData.layers))
//     return lottieData;

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const isBackgroundLayer = (layer: any) => {
//     const name = (layer.nm || '').toLowerCase().trim();
//     return (
//       layer.ty === 1 || // solid color layer
//       name.includes('bg') ||
//       name.includes('background') ||
//       name === 'фон' ||
//       name === 'фон1' ||
//       name === 'фон2'
//     );
//   };

//   const filteredLayers = lottieData.layers.filter(
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     (layer: any) => !isBackgroundLayer(layer),
//   );
//   return {
//     ...lottieData,
//     layers: filteredLayers,
//   };
// }

export const LeaderUsers = (props: LeaderUsersProps) => {
  const { leaders } = props;

  const { data: myScore } = useGetMySquare();
  const { data: rewards } = useGetRewards();

  const users: Record<
    number,
    {
      reward: {
        __typename?: 'Gift';
        id: string;
        slug: string;
        place?: Place | null;
      } | null;
      leaderboard: {
        username: string;
        __typename?: 'User';
        image?: string | null;
      } | null;
      position: { top: string; left: number };
    }
  > = {
    1: {
      reward: rewards?.find((reward) => reward.place === Place.First) ?? null,
      leaderboard: leaders[0]?.user ?? null,
      position: {
        top: '45px',
        left: 0,
      },
    },
    2: {
      reward: rewards?.find((reward) => reward.place === Place.Second) ?? null,
      leaderboard: leaders[2]?.user ?? null,
      position: {
        top: '0px',
        left: 50,
      },
    },
    3: {
      reward: rewards?.find((reward) => reward.place === Place.Third) ?? null,
      leaderboard: leaders[3]?.user ?? null,
      position: {
        top: '40px',
        left: 100,
      },
    },
  };

  return (
    <div className="bg-linear-360 from-blue-50 from-0% to-blue-100 to-100% py-4 px-6 rounded-b-3xl">
      <h1 className="mb-4.5 text-center text-white font-semibold text-2xl">
        Лидеры битв
      </h1>
      <div className="min-h-50 max-w-89 mx-auto relative mb-4">
        {Object.entries(users).map(([index, leader]) => {
          return (
            <div
              key={index}
              className="absolute"
              style={{
                top: leader.position.top,
                left: `${leader.position.left}%`,
                transform: `translateX(-${leader.position.left}%)`,
              }}>
              <div className="h-20 w-20">
                <LoadableLottie slug={leader.reward?.slug ?? ''}>
                  {(animation, loading) => {
                    return loading ? (
                      <div className="size-full" />
                    ) : (
                      <AppLottie
                        style={lottieSizes}
                        animation={animation}
                        className="absolute inset-0 object-cover"
                      />
                    );
                  }}
                </LoadableLottie>
              </div>

              <div className="grid place-items-center -mt-1 relative">
                <Avatar
                  className="size-10.5 -mb-1.5 relative"
                  url={leader.leaderboard?.image ?? ''}
                />

                <div className=" text-tiny font-thin flex items-center bg-gray-50/30 border border-white/30 shadow-[0px_4px_4px_0px_--alpha(var(--color-black)_/_7%)] min-h-5.5 px-3 text-center rounded-full">
                  {leader.leaderboard?.username ?? ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h6 className="text-eight font-medium px-2 mb-1">Твой ранг</h6>
        <div className="flex items-center justify-between bg-dark-blue-150 rounded-lg px-3 min-h-13">
          <div className="flex items-center gap-2">
            {myScore?.rank && <span>#{myScore?.rank}</span>}
            <span>{myScore?.user.username}</span>
          </div>

          <div className="text-sm font-medium flex items-center">
            <span>{myScore?.score ?? 0}</span>
            <Icons name="ton" width={22} height={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

const lottieSizes = {
  width: 93 * 1.8,
  height: 80 * 1.8,
  left: -40,
  top: -25,
};
