import { lobbyImagesByBets, useGetLobbies } from "@/entities/lobby";
import { LobbyStatus } from "@/shared/api/graphql/graphql";
import { LoadingSpinner } from "@/shared/components/loading-spinner/loading-spinner";
import { Link } from "react-router";

function getLobbyBetKey(
	minBet: number | null,
	maxBet: number | null,
): Record<"background" | "image", string> {
	if (minBet === null && maxBet === null) {
		return {
			image: "/assets/images/main/infinite-cube.webp",
			background: "/assets/images/play/octopus.webp",
		};
	}

	return lobbyImagesByBets[`min_${minBet!}_max_${maxBet!}`];
}

export const Main = () => {
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
		<div className="py-8 px-6 grid gap-9 content-start">
			{lobbies.map((lobby) => {
				const images = getLobbyBetKey(
					lobby.minBet ?? null,
					lobby.maxBet ?? null,
				);

				const isAllBetsNullable =
					lobby.minBet === null && lobby.maxBet === null;

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
										Делайте ставки, выигрывайте, но не превышайте сумму ставки:
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
											<div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
												{lobby.maxBet} TON
											</div>
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

			{/* <Link to="/spin" className="block">
        <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2.5xl text-white">
          <div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-4.5 rounded-2.5xl">
            <img
              alt="octopus"
              src="/assets/images/play/octopus.webp"
              className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
            />
            <div className="max-w-48 relative">
              <h2 className="text-lg/5 font-medium mb-1.5">Прокрут Бомжа</h2>
              <p className="text-tiny mb-2">
                Делайте ставки, выигрывайте, но не превышайте сумму ставки:
              </p>
              <div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
                <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                  0.1 TON
                </div>
                -
                <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                  1 TON
                </div>
              </div>
            </div>
          </div>
          <img
            alt="telegram cap"
            src="/assets/images/main/bag-of-tons.webp"
            className="pointer-events-none h-32 absolute -top-3 right-2 scale-160 drop-shadow-[0px_0px_1.27px_0px_#6BCEFF,0px_0px_1.27px_0px_#6BCEFF,0px_0px_4.44px_0px_#6BCEFF,0px_0px_8.87px_0px_#6BCEFF,0px_0px_15.21px_0px_#6BCEFF,0px_0px_26.61px_0px_#6BCEFF]"
          />
        </article>
      </Link>
      <Link to="/spin" className="block">
        <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2.5xl text-white">
          <div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-4.5 rounded-2.5xl">
            <img
              alt="octopus"
              src="/assets/images/play/octopus.webp"
              className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
            />
            <div className="max-w-48 relative">
              <h2 className="text-lg/5 font-medium mb-1.5">Прокрут Новичка</h2>
              <p className="text-tiny mb-2">
                Делайте ставки, выигрывайте, но не превышайте сумму ставки:
              </p>
              <div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
                <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                  1 TON
                </div>
                -
                <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                  5 TON
                </div>
              </div>
            </div>
          </div>
          <img
            alt="telegram cap"
            src="/assets/images/main/chest-of-tons.webp"
            className="pointer-events-none h-32 absolute -top-3 right-5 scale-170"
          />
        </article>
      </Link>
      <Link to="/spin" className="block">
        <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2.5xl text-white">
          <div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-4.5 rounded-2.5xl">
            <img
              alt="octopus"
              src="/assets/images/play/octopus.webp"
              className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
            />
            <div className="max-w-48 relative">
              <h2 className="text-lg/5 font-medium mb-1.5">
                Прокрут Инвестора
              </h2>
              <p className="text-tiny mb-2">
                Делайте ставки, выигрывайте, но не превышайте сумму ставки:
              </p>
              <div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
                <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                  5 TON
                </div>
                -
                <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                  20 TON
                </div>
              </div>
            </div>
          </div>
          <img
            alt="telegram cap"
            src="/assets/images/main/handbag-of-tons.webp"
            className="pointer-events-none h-32 absolute -top-3 right-2 scale-170"
          />
        </article>
      </Link>
      <Link to="/spin" className="block">
        {' '}
        <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2.5xl text-white">
          <div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-4.5 rounded-2.5xl">
            <img
              alt="octopus"
              src="/assets/images/play/octopus.webp"
              className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
            />
            <div className="max-w-48 relative">
              <h2 className="text-lg/5 font-medium mb-1.5">Прокрут Удачи</h2>
              <p className="text-tiny mb-2">
                Делайте ставки, выигрывайте, но не превышайте сумму ставки:
              </p>
              <div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
                <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                  20 TON
                </div>
                -
                <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                  50 TON
                </div>
              </div>
            </div>
          </div>
          <img
            alt="telegram cap"
            src="/assets/images/main/lucky-chest-of-tons.webp"
            className="pointer-events-none h-32 absolute -top-3 right-2 scale-160"
          />
        </article>
      </Link>
      <Link to="/spin" className="block">
        <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2.5xl text-white">
          <div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-4.5 rounded-2.5xl">
            <img
              alt="octopus"
              src="/assets/images/play/octopus.webp"
              className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
            />
            <div className="max-w-48 relative">
              <h2 className="text-lg/5 font-medium mb-1.5">
                Эпический прокрут
              </h2>
              <p className="text-tiny mb-2">
                Делайте ставки, выигрывайте, но не превышайте сумму ставки:
              </p>
              <div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
                <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                  50 TON
                </div>
                -
                <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                  100 TON
                </div>
              </div>
            </div>
          </div>
          <img
            alt="telegram cap"
            src="/assets/images/main/epic-chest-of-tons.webp"
            className="pointer-events-none h-32 absolute -top-2 right-2 scale-160"
          />
        </article>
      </Link>
      <Link to="/spin" className="block">
        <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2.5xl text-white">
          <div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-4.5 rounded-2.5xl">
            <img
              alt="octopus"
              src="/assets/images/play/octopus.webp"
              className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
            />
            <div className="max-w-48 relative">
              <h2 className="text-lg/5 font-medium mb-1.5">
                Безлимитный прокрут
              </h2>
              <p className="text-tiny mb-2">
                Делайте ставки, выигрывайте, но не превышайте сумму ставки:
              </p>
              <div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
                <div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
                  ∞ TON
                </div>
              </div>
            </div>
          </div>
          <img
            alt="telegram cap"
            src="/assets/images/main/infinite-cube.webp"
            className="pointer-events-none h-32 absolute -top-2 right-2 scale-160"
          />
        </article>
      </Link> */}
		</div>
	);
};
