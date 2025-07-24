import { useGetLive } from "@/entities/user";
import { Icons } from "@/shared/ui/icons/icons";
import { motion } from "framer-motion";
import React, { memo } from "react";

interface LiveWinnersProps {
	// Optional props for customization
	take?: number;
	skip?: number;
}

export const LiveWinners: React.FC<LiveWinnersProps> = memo(
	({ take = 6, skip = 0 }) => {
		const { live, loading, error } = useGetLive({ take, skip });

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
						{loading ? (
							// Loading state
							<div className="flex gap-1">
								{Array.from({ length: 6 }).map((_, index) => (
									<div
										key={`loading-${index}`}
										className="aspect-square w-[52px] h-[52px] flex-shrink-0 scrollbar-hide relative flex items-center justify-center"
									>
										<div className="w-[40px] h-[40px] bg-gray-600 rounded-full animate-pulse"></div>
									</div>
								))}
							</div>
						) : error ? (
							// Error state
							<div className="text-red-500 text-sm">
								Failed to load live data
							</div>
						) : (
							// Live users data
							live
								?.slice(0, 6)
								.filter((user: any) => user.lastWonAmount > 0)
								.map((user: any, index: number) => {
									if (index === 0) {
										return (
											<motion.div
												key={`user-animated-${user.id}`}
												className="aspect-square w-[52px] h-[52px] flex-shrink-0 scrollbar-hide relative flex items-center justify-center"
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.5 }}
											>
												<img
													src={user.image || ""}
													alt={user.displayName || user.username}
													className="object-cover rounded-full w-[40px] h-[40px] border border-[#494A4A] border-[1px]"
												/>
												<div className="absolute -bottom-[5px] backdrop-blur-[10px] rounded-full px-1 py-1 h-5 flex items-center justify-center border border-[#FFFFFF14]">
													<span className="text-[8px] text-white font-medium">
														{String(user.lastWonAmount || 0).length > 4
															? `${String(user.lastWonAmount || 0).slice(
																	0,
																	5,
															  )}...`
															: user.lastWonAmount || 0}
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
											key={`user-${index}-${user.id}`}
											className="aspect-square w-[52px] h-[52px] flex-shrink-0 scrollbar-hide relative flex items-center justify-center"
										>
											<img
												src={user.image || ""}
												alt={user.displayName || user.username}
												className="object-cover rounded-full w-[40px] h-[40px] border border-[#494A4A] border-[1px]"
											/>
											<div className="absolute -bottom-[5px] backdrop-blur-[10px] rounded-full px-1 py-1 h-5 flex items-center justify-center border border-[#FFFFFF14]">
												<span className="text-[10px] font-bold">
													{String(user.lastWonAmount || 0).length > 4
														? `${String(user.lastWonAmount || 0).slice(
																0,
																5,
														  )}...`
														: user.lastWonAmount || 0}
												</span>
												<div className="bg-[#0088CC] rounded-full w-[10px] h-[10px] flex items-center justify-center ml-[2px]">
													<Icons name="ton" className="w-[8px] h-[8px]" />
												</div>
											</div>
										</div>
									);
								})
						)}
					</div>
				</div>
			</header>
		);
	},
);
