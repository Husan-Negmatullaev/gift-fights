export const lobbyImagesByBets: Record<
  `min_${number}_max_${number}`,
  Record<"background" | "image", string>
> = {
  "min_0.1_max_1": {
    image: "/assets/images/main/bag-of-tons.webp",
    background: "/assets/images/play/octopus.webp",
  },
  min_1_max_5: {
    image: "/assets/images/main/chest-of-tons.webp",
    background: "/assets/images/play/octopus.webp",
  },
  min_5_max_20: {
    image: "/assets/images/main/handbag-of-tons.webp",
    background: "/assets/images/play/octopus.webp",
  },
  min_20_max_50: {
    image: "/assets/images/main/lucky-chest-of-tons.webp",
    background: "/assets/images/play/octopus.webp",
  },
  min_50_max_100: {
    image: "/assets/images/main/epic-chest-of-tons.webp",
    background: "/assets/images/play/octopus.webp",
  },
};
