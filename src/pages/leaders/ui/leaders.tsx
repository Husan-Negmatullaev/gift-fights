import { useGetLeaderboard } from "@/entities/leaderboards";
import { LoadingSpinner } from "@/shared/components/loading-spinner/loading-spinner";
import { Icons } from "@/shared/ui/icons/icons";
import { LeaderUsers } from "./leader-users";

export const Leaders = () => {
	const { data, loading } = useGetLeaderboard(0, 100);

	const leaderboards = data?.leaderboard ?? [];

	if (loading) {
		return (
			<div className="grid place-content-center h-full">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className="grid grid-rows-[365px_1fr] gap-3 pb-10">
			<LeaderUsers leaders={leaderboards} />

			<div className="px-6">
				<h6 className="text-eight font-medium px-2 mb-1">Глобальный рейтинг</h6>
				<ul className="grid gap-2 peer empty:mb-20">
					{leaderboards.map((leaderboard, index) => (
						<li className="group" key={index}>
							<div className="group-first:bg-blue bg-dark-blue-50 min-h-10.5 flex items-center gap-2 justify-between rounded-lg px-3">
								<div className="flex items-center gap-2 text-sm ">
									<span>#{leaderboard.rank}</span>
									<span>{leaderboard.user.username}</span>
								</div>

								<div className="flex items-center font-medium text-sm">
									<span>{leaderboard.score?.toFixed(2)}</span>
									<Icons name="ton" width={22} height={22} />
								</div>
							</div>
						</li>
					))}
				</ul>
				<div className="peer-empty:block hidden">
					<p className="text-center font-medium text-lg">Нет данных</p>
				</div>
			</div>
		</div>
	);
};
