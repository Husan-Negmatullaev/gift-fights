import { Icons } from "@/shared/ui/icons/icons";
import { LeaderUsers } from "./leader-users";
import {
  useGetLeaderboard,
  useGetMySquare,
  useGetRewards,
} from "@/entities/leaderboards";

export const Leaders = () => {
  const { data: myScore } = useGetMySquare();
  const { data } = useGetLeaderboard(0, 100);
  const { data: rewards } = useGetRewards();

  console.log(rewards);

  const leaderboards =
    data?.leaderboard && data?.leaderboard.length > 0 ? data?.leaderboard : [];

  return (
    <div className="grid gap-3">
      {myScore && leaderboards && leaderboards.length > 0 && (
        <LeaderUsers myScore={myScore} leaderboards={leaderboards} />
      )}

      <div className="px-6">
        <h6 className="text-eight font-medium px-2 mb-1">Глобальный рейтинг</h6>
        <ul className="grid gap-2">
          {leaderboards.map((leaderboard, index) => (
            <li className="group" key={index}>
              <div className="group-first:bg-blue bg-dark-blue-50 min-h-10.5 flex items-center gap-2 justify-between rounded-lg px-3">
                <div className="flex items-center gap-2 text-sm ">
                  <span>#{leaderboard.rank}</span>
                  <span>{leaderboard.user.username}</span>
                </div>

                <div className="flex items-center font-medium text-sm">
                  <span>{leaderboard.score}</span>
                  <Icons name="ton" width={22} height={22} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
