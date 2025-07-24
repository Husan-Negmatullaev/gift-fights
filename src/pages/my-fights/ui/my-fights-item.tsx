export const MyFightsItem = ({ fight }: { fight: any }) => {
	let statusColor;
	switch (fight.status) {
		case "Ожидание":
			statusColor = "bg-[#FFCA38]";
			break;
		case "Идет":
			statusColor = "bg-[#00FB36]";
			break;
		case "Завершено":
			statusColor = "bg-[#C4C4C4]";
			break;
		default:
			break;
	}

	let winnerItem;
	let resultText;
	if (fight.isWinner) {
		winnerItem = "text-[#00FB36]";
		resultText = "Победа";
	} else if (fight.isLoser) {
		winnerItem = "text-[#FF4747]";
		resultText = "Поражение";
	}
	return (
		<div className="bg-[#FFFFFF1A] backdrop-blur-[10px] flex rounded-2xl p-4 flex-col border border-[#FFFFFF1A] relative">
			<div className="flex flex-row justify-between mb-1">
				<p className="font-bold">Битва "{fight.title}"</p>
				<div
					className={`${statusColor} text-black px-1 rounded-full text-[10px] font-bold uppercase items-center justify-center flex`}
				>
					{fight.status}
				</div>
			</div>
			<div className="flex flex-row gap-2 text-[#A8A8A8]">
				<p>
					{fight.reward}
					{" TON"}
				</p>
				•<p>{`${fight.wins} / ${fight.ofWins}`}</p>•
				<p className={winnerItem}>{resultText || `Шанс: ${fight.chance}%`}</p>
			</div>
		</div>
	);
};
