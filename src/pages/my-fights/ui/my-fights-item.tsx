import type { ParticipantWithRelations } from "@/entities/lobby/hooks/use-get-participants";
import { LobbyStatus } from "@/shared/api/graphql/graphql";
import { useMemo } from "react";

// Constants for better maintainability
const STATUS_CONFIG = {
	[LobbyStatus.WaitingForPlayers]: {
		color: "bg-[#FFCA38]",
		text: "Ожидание игроков",
	},
	[LobbyStatus.Countdown]: {
		color: "bg-[#FFCA38]",
		text: "Ожидание",
	},
	[LobbyStatus.InProcess]: {
		color: "bg-[#00FB36]",
		text: "Идет",
	},
	[LobbyStatus.Completed]: {
		color: "bg-[#C4C4C4]",
		text: "Завершено",
	},
} as const;

const RESULT_CONFIG = {
	winner: {
		color: "text-[#00FB36]",
		text: "Победа",
	},
	loser: {
		color: "text-[#FF4747]",
		text: "Поражение",
	},
	inProgress: {
		color: "",
		text: "В процессе",
	},
} as const;

interface MyFightsItemProps {
	fight: ParticipantWithRelations;
}

export const MyFightsItem = ({ fight }: MyFightsItemProps) => {
	console.log("FIGHT: ", fight?.lobby);
	const statusConfig = useMemo(() => {
		if (!fight?.lobby?.status) {
			return { color: "", text: "" };
		}
		return STATUS_CONFIG[fight.lobby.status] || { color: "", text: "" };
	}, [fight?.lobby?.status]);

	const resultConfig = useMemo(() => {
		const myAmount = fight?.lobby?.participants?.find(
			(participant) => participant.userId === fight.userId,
		)?.amount;
		const totalAmount = fight?.lobby?.participants?.reduce(
			(acc, participant) => acc + participant.amount,
			0,
		);
		const percent = totalAmount > 0 ? ((myAmount ?? 0) / totalAmount) * 100 : 0;

		if (fight?.lobby.status !== LobbyStatus.Completed) {
			return {
				color: "",
				text: `${percent.toFixed(1)}%`,
			};
		}

		const isWinner = fight.lobby.winnerId === fight.userId;
		const isLoser = fight.lobby.status === LobbyStatus.Completed && !isWinner;

		if (isWinner) {
			return RESULT_CONFIG.winner;
		}
		if (isLoser) {
			return RESULT_CONFIG.loser;
		}
		return RESULT_CONFIG.inProgress;
	}, [
		fight?.lobby?.winnerId,
		fight?.userId,
		fight?.lobby?.status,
		fight?.lobby?.participants,
	]);

	const formattedAmount = useMemo(() => {
		const amount = fight?.amount;
		return amount ? `${amount.toFixed(2)} TON` : "0 TON";
	}, [fight?.amount]);

	if (!fight || !fight.lobby) {
		return null;
	}

	return (
		<div className="bg-[#FFFFFF1A] backdrop-blur-[10px] flex rounded-2xl p-4 flex-col border border-[#FFFFFF1A] relative">
			<div className="flex flex-row justify-between mb-1">
				<p className="font-bold">
					Битва "{fight.lobby.title ?? "Без названия"}"
				</p>
				<div
					className={`${statusConfig.color} text-black px-1 rounded-full text-[10px] font-bold uppercase items-center justify-center flex`}
				>
					{statusConfig.text}
				</div>
			</div>
			<div className="flex flex-row gap-2 text-[#A8A8A8]">
				<p>{formattedAmount}</p>•
				<p>{`${fight?.lobby?.participants?.length ?? 0}`}</p>•
				<p className={resultConfig.color}>{resultConfig.text}</p>
			</div>
		</div>
	);
};
