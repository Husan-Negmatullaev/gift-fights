import { useGetParticipants } from "@/entities/lobby/hooks";
import { BottomButton } from "@/shared/components/bottom-button/bottom-button";
import { LoadingSpinner } from "@/shared/components/loading-spinner/loading-spinner";
import { useNavigate } from "react-router";
import { MyFightsItem } from "./my-fights-item";

export const MyFights = () => {
	const { participants, loading } = useGetParticipants({ take: 50, skip: 0 });

	const navigate = useNavigate();

	return (
		<div className="pb-16">
			<div className="px-6 pb-6 pt-3">
				{participants.length > 0 && (
					<h5 className="font-bold text-[24px] mb-2">Мои битвы:</h5>
				)}

				{loading && (
					<div className="mt-10 mx-auto flex justify-center">
						<LoadingSpinner />
					</div>
				)}
				{!loading && participants.length === 0 && (
					<div className="absolute inset-0 flex items-center justify-center text-center">
						<div>
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
							/>
						</div>
					</div>
				)}
				<div className="flex flex-col gap-3">
					{participants.map((participant) => (
						<MyFightsItem key={participant.id} fight={participant} />
					))}
				</div>
			</div>
		</div>
	);
};
