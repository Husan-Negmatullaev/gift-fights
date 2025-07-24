import { Icons } from "@/shared/ui/icons/icons";
import { motion } from "framer-motion";
import React, { memo } from "react";

// Mock data for development
const mockLiveData = {
	online: 1234,
	gifts: [
		{
			id: "1",
			slug: "gift-1",
			title: "Epic Chest",
			animationUrl:
				"https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740",
			price: 1500,
			model: "chest",
			symbol: "epic",
			background: "blue",
			blocked: false,
			externalId: "ext-1",
			msgId: 1001,
			userId: "user-1",
			symbolPermille: 1000,
			rarityPermille: 800,
			backgroundPermille: 600,
			createdAt: "2024-01-01T00:00:00Z",
			updatedAt: "2024-01-01T00:00:00Z",
		},
		{
			id: "2",
			slug: "gift-2",
			title: "Lucky Bag",
			animationUrl:
				"https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740",
			price: 2500,
			model: "bag",
			symbol: "lucky",
			background: "green",
			blocked: false,
			externalId: "ext-2",
			msgId: 1002,
			userId: "user-2",
			symbolPermille: 1200,
			rarityPermille: 900,
			backgroundPermille: 700,
			createdAt: "2024-01-01T00:00:00Z",
			updatedAt: "2024-01-01T00:00:00Z",
		},
		{
			id: "3",
			slug: "gift-3",
			title: "Mystery Box",
			animationUrl:
				"https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740",
			price: 3000,
			model: "box",
			symbol: "mystery",
			background: "purple",
			blocked: false,
			externalId: "ext-3",
			msgId: 1003,
			userId: "user-3",
			symbolPermille: 1500,
			rarityPermille: 1000,
			backgroundPermille: 800,
			createdAt: "2024-01-01T00:00:00Z",
			updatedAt: "2024-01-01T00:00:00Z",
		},
		{
			id: "4",
			slug: "gift-4",
			title: "Golden Trophy",
			animationUrl:
				"https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740",
			price: 5000,
			model: "trophy",
			symbol: "golden",
			background: "gold",
			blocked: false,
			externalId: "ext-4",
			msgId: 1004,
			userId: "user-4",
			symbolPermille: 2000,
			rarityPermille: 1200,
			backgroundPermille: 900,
			createdAt: "2024-01-01T00:00:00Z",
			updatedAt: "2024-01-01T00:00:00Z",
		},
		{
			id: "5",
			slug: "gift-5",
			title: "Diamond Ring",
			animationUrl:
				"https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740",
			price: 7500,
			model: "ring",
			symbol: "diamond",
			background: "crystal",
			blocked: false,
			externalId: "ext-5",
			msgId: 1005,
			userId: "user-5",
			symbolPermille: 2500,
			rarityPermille: 1500,
			backgroundPermille: 1000,
			createdAt: "2024-01-01T00:00:00Z",
			updatedAt: "2024-01-01T00:00:00Z",
		},
		{
			id: "6",
			slug: "gift-6",
			title: "Legendary Sword",
			animationUrl:
				"https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740",
			price: 10000,
			model: "sword",
			symbol: "legendary",
			background: "fire",
			blocked: false,
			externalId: "ext-6",
			msgId: 1006,
			userId: "user-6",
			symbolPermille: 3000,
			rarityPermille: 2000,
			backgroundPermille: 1200,
			createdAt: "2024-01-01T00:00:00Z",
			updatedAt: "2024-01-01T00:00:00Z",
		},
	],
};

interface LiveWinnersProps {
	gifts: any[];
}

export const LiveWinners: React.FC<LiveWinnersProps> = memo(({}) => {
	const live = mockLiveData;

	return (
		<header className="w-full flex items-center overflow-x-auto scrollbar-hide pb-3 px-2 mb-4">
			<div className="flex items-center justify-center gap-[4px] transform -rotate-90 w-[40px] mt-4">
				<div className="w-[10px] h-[10px] bg-[#004917] rounded-full flex items-center justify-center animate-pulse">
					<div className="w-[5px] h-[5px] bg-[#28E05C] rounded-full "></div>
				</div>
				<p className="text-[#5BEF8D] text-[14px]">{"Live"}</p>
			</div>
			<div className="flex items-center scrollbar-hide">
				<div className="flex gap-1 scrollbar-hide">
					{live?.gifts?.slice(0, 6).map((item: any, index: number) => {
						if (index === 0) {
							return (
								<motion.div
									key={`gift-animated-${item.id}`}
									className="aspect-square w-[52px] h-[52px] flex-shrink-0 scrollbar-hide relative flex items-center justify-center"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
								>
									<img
										src={item.animationUrl}
										alt={item.title}
										className="object-cover rounded-full w-[40px] h-[40px] border border-[#494A4A] border-[1px]"
									/>
									<div className="absolute -bottom-[5px] backdrop-blur-[10px] rounded-full px-1 py-1 h-5 flex items-center justify-center border border-[#FFFFFF14]">
										<span className="text-[8px] text-white font-medium">
											{String(item.price).length > 4
												? `${String(item.price).slice(0, 5)}...`
												: item.price}
										</span>
										<div className="bg-[#0088CC] rounded-full w-[10px] h-[10px] flex items-center justify-center ml-[2px]">
											<Icons name="ton" className="w-[6px] h-[6px]" />
										</div>
									</div>
								</motion.div>
							);
						}
						return (
							<div
								key={`gift-${index}-${item.id}`}
								className="aspect-square w-[52px] h-[52px] flex-shrink-0 scrollbar-hide relative flex items-center justify-center"
							>
								<img
									src={item.animationUrl}
									alt={item.title}
									className="object-cover rounded-full w-[40px] h-[40px] border border-[#494A4A] border-[1px]"
								/>
								<div className="absolute -bottom-[5px]  backdrop-blur-[10px] rounded-full px-1 py-1 h-5 flex items-center justify-center border border-[#FFFFFF14]">
									<span className="text-[10px] font-bold">
										{String(item.price).length > 4
											? `${String(item.price).slice(0, 5)}...`
											: item.price}
									</span>
									<div className="bg-[#0088CC] rounded-full w-[10px] h-[10px] flex items-center justify-center ml-[2px]">
										<Icons name="ton" className="w-[8px] h-[8px]" />
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</header>
	);
});
