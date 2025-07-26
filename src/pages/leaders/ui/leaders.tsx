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

			<div className="px-6 mt-30">
				<ul className="grid gap-2 peer empty:mb-20">
					{leaderboards.map((leaderboard, index) => (
						<li className="group" key={index}>
							<div className="bg-[#FFFFFF1A] backdrop-blur-[20px] min-h-10.5 flex items-center gap-2 justify-between rounded-2xl px-3 py-2 border border-[#797979]">
								<div className="flex items-center gap-2">
									<span className="text-[#A8A8A8] w-12 text-center">
										#{leaderboard.rank}
									</span>
									<img
										src={
											leaderboard?.user.image ||
											"/assets/images/main/pepe_heart.webp"
										}
										alt={leaderboard.user.username}
										className="w-10 h-10 rounded-full border border-[#494A4A]"
										onError={(e) => {
											e.currentTarget.src =
												"/assets/images/main/pepe_heart.webp";
										}}
									/>
									<span>{leaderboard.user.username}</span>
								</div>

								<div className="flex items-center font-bold text-lg gap-2">
									<span>{leaderboard.score?.toFixed(2)}</span>
									<div className="bg-[#0088CC] rounded-full w-[16px] h-[16px] flex items-center justify-center ml-[2px] ">
										<Icons name="ton" width={14} height={14} />
									</div>
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
