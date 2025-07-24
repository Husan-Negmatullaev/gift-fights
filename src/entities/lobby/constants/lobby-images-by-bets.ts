export const lobbyImagesByBets: Record<
  `min_${number}_max_${number | null}`,
  Record<"background" | "image" | "gradient", string>
> = {
  "min_0.1_max_1": {
    image: "/assets/images/main/bag-of-tons.webp",
    background: "/assets/images/play/octopus.webp",
    gradient: "linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(90deg, #30220E 0%, #70654E 100%)",
  },
  min_1_max_10: {
    image: "/assets/images/main/chest-of-tons.webp",
    background: "/assets/images/play/octopus.webp",
    gradient: "linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(90deg, #4EDA94 0%, #74EF9B 100%)",
  },
  min_5_max_20: {
    image: "/assets/images/main/handbag-of-tons.webp",
    background: "/assets/images/play/octopus.webp",
    gradient: "linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(90deg, #1D89F1 0%, #6FC5FF 100%) ",
  },
  min_10_max_50: {
    image: "/assets/images/main/lucky-chest-of-tons.webp",
    background: "/assets/images/play/octopus.webp",
    gradient: "linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(90deg, #7C32DC 0%, #DD83FF 100%) ",
  },
  min_50_max_null: {
    image: "/assets/images/main/epic-chest-of-tons.webp",
    background: "/assets/images/play/octopus.webp",
    gradient: "bg-gradient-to-r from-red-500 to-red-600",
  },
};
