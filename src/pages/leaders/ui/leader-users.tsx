import { AppLottie } from "@/shared/components/lottie/app-lottie";
import { Avatar } from "@/shared/ui/avatar/avatar";
import { Icons } from "@/shared/ui/icons/icons";
import Cap from "@/shared/assets/lottie/cap.json";
import Froggy from "@/shared/assets/lottie/kissed-froggy.json";
import type {
  GetLeaderboardQuery,
  MyScoreQuery,
} from "@/shared/api/graphql/graphql";

type LeaderUsersProps = {
  myScore: MyScoreQuery["myScore"];
  leaderboards: GetLeaderboardQuery["leaderboard"];
};

export const LeaderUsers = (props: LeaderUsersProps) => {
  const { myScore } = props;

  const leaders: Record<
    number,
    {
      leaderboard: { username: string; image: string };
      position: { top: string; left: number };
      animation: unknown;
    }
  > = {
    1: {
      leaderboard: {
        username: "username",
        image: "/assets/images/leaders/avatar.webp",
      },
      animation: Cap,
      position: {
        top: "45px",
        left: 0,
      },
    },
    2: {
      leaderboard: {
        username: "username",
        image: "/assets/images/leaders/avatar.webp",
      },
      animation: Cap,
      position: {
        top: "0px",
        left: 50,
      },
    },
    3: {
      leaderboard: {
        username: "username",
        image: "/assets/images/leaders/avatar.webp",
      },
      animation: Froggy,
      position: {
        top: "40px",
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
        {Object.entries(leaders).map(([index, leader]) => {
          // const animation = index < 2 ? Cap : Froggy;
          // const leaderOptions = leadersObjects[index];
          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${leader.position.left}%`,
                transform: `translateX(-${leader.position.left}%)`,
                top: leader.position.top,
              }}
            >
              <div style={{ width: 93, height: 80 }}>
                <AppLottie
                  animation={leader.animation}
                  style={{
                    width: 93 * 1.8,
                    height: 80 * 1.8,
                    left: -40,
                    top: -25,
                  }}
                  className="absolute inset-0 object-cover"
                />
              </div>

              <div className="grid place-items-center -mt-1 relative">
                <Avatar
                  className="size-10.5 -mb-1.5 relative"
                  url={leader.leaderboard.image}
                />

                <div className=" text-tiny font-thin flex items-center bg-gray-50/30 border border-white/30 shadow-[0px_4px_4px_0px_--alpha(var(--color-black)_/_7%)] min-h-5.5 px-3 text-center rounded-full">
                  {leader.leaderboard.username}
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
            <span>#{myScore.rank}</span>
            <span>{myScore.user.username}</span>
          </div>

          <div className="text-sm font-medium flex items-center">
            <span>{myScore.score}</span>
            <Icons name="ton" width={22} height={22} />
          </div>
        </div>
      </div>
    </div>
  );
};
