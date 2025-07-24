import { BottomButton } from "@/shared/components/bottom-button/bottom-button";
import { LoadingSpinner } from "@/shared/components/loading-spinner/loading-spinner";
import { useNavigate } from "react-router";
import { MyFightsItem } from "./my-fights-item";

export const MyFights = () => {
	const loading = false;
	const fights: any[] = [
		// {
		// 	id: 1,
		// 	title: "Бомж",
		// 	reward: 100,
		// 	wins: 10,
		// 	ofWins: 10,
		// 	chance: 10,
		// 	status: "Ожидание",
		// 	isWinner: false,
		// 	isLoser: false,
		// },
		// {
		// 	id: 2,
		// 	title: "Новичок",
		// 	reward: 100,
		// 	wins: 10,
		// 	ofWins: 10,
		// 	chance: 10,
		// 	status: "Идет",
		// 	isWinner: false,
		// 	isLoser: false,
		// },
		// {
		// 	id: 3,
		// 	title: "Эпический",
		// 	reward: 100,
		// 	wins: 10,
		// 	ofWins: 10,
		// 	chance: 10,
		// 	status: "Завершено",
		// 	isWinner: true,
		// 	isLoser: false,
		// },
		// {
		// 	id: 4,
		// 	title: "Безлимитный",
		// 	reward: 100,
		// 	wins: 10,
		// 	ofWins: 10,
		// 	chance: 10,
		// 	status: "Завершено",
		// 	isWinner: false,
		// 	isLoser: true,
		// },
	];

	const navigate = useNavigate();

	return (
		<div className="pb-16">
			<div className="px-6 pb-6 pt-3">
				{fights.length > 0 && (
					<h5 className="font-bold text-[24px] mb-2">Мои битвы:</h5>
				)}

				{loading && (
					<div className="mt-10 mx-auto flex justify-center">
						<LoadingSpinner />
					</div>
				)}
				{!loading && fights.length === 0 && (
					<div className="mt-40 text-center">
						<img
							className="w-50 h-50 mx-auto"
							src={"assets/images/empty-fights.png"}
							alt=""
						/>
						<p className=" font-bold text-lg">Нет активных битв</p>
						<p className="font-regular text-lg text-[#A8A8A8]">
							{"Выберите бокс и начните игру"}
						</p>
						<BottomButton
							withShadow
							content="Начать битву"
							className="px-4 mt-4"
							onClick={() => {
								navigate("/");
							}}
							// onClick={handleSubmit((penis) => penis.gifts)}
						/>
					</div>
				)}
				<div className="flex flex-col gap-3">
					{fights.map((fight) => (
						<MyFightsItem key={fight.id} fight={fight} />
					))}
				</div>
			</div>
		</div>
	);
};
