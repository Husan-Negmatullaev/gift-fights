import { playWinSound } from "@/entities/gift";
import { BottomButton } from "@/shared/components/bottom-button/bottom-button";
import { Modal } from "@/shared/ui/modal/modal";
import { useCallback, useState, type ReactNode } from "react";
import { Icons } from "@/shared/ui/icons/icons";
import { WheelSegment } from "./wheel-segment";
import { playSpinSound } from "@/entities/gift/utils/gift-sounds";

export interface SpinResult {
  prize: {
    id: number;
    name: string;
    value: number;
    color: string;
    icon: ReactNode;
    rarity: string;
  };
  winningSegment: number;
  spinNumber: number;
  timestamp: number;
}

const PRIZES: Array<{
  id: number;
  name: string;
  value: number;
  color: string;
  icon: ReactNode;
  rarity: string;
}> = [
  {
    id: 1,
    name: "JACKPOT",
    value: 1000,
    color: "#FFD700",
    icon: <Icons name="box" />,
    rarity: "legendary",
  },
  {
    id: 2,
    name: "MEGA WIN",
    value: 500,
    color: "#FF6B35",
    icon: <Icons name="box" />,
    rarity: "epic",
  },
  {
    id: 3,
    name: "BIG PRIZE",
    value: 250,
    color: "#4ECDC4",
    icon: <Icons name="box" />,
    rarity: "rare",
  },
  {
    id: 4,
    name: "BONUS",
    value: 100,
    color: "#45B7D1",
    icon: <Icons name="box" />,
    rarity: "rare",
  },
  {
    id: 5,
    name: "COINS",
    value: 50,
    color: "#96CEB4",
    icon: <Icons name="box" />,
    rarity: "common",
  },
  {
    id: 6,
    name: "GIFT",
    value: 75,
    color: "#FECA57",
    icon: <Icons name="box" />,
    rarity: "common",
  },
  {
    id: 7,
    name: "AWARD",
    value: 150,
    color: "#FF9FF3",
    icon: <Icons name="box" />,
    rarity: "rare",
  },
  {
    id: 8,
    name: "SUPER",
    value: 300,
    color: "#A8E6CF",
    icon: <Icons name="box" />,
    rarity: "epic",
  },
];

type SpinCarouselProps = {
  onResult(result: SpinResult): void;
};

export const SpinCarousel = (props: SpinCarouselProps) => {
  const { onResult } = props;

  const [countdown, setCountdown] = useState(30);
  const [openModal, setOpenModal] = useState(false);
  const [isPlaceBet, setIsPlaceBet] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<SpinResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  // const handleSpinClick = () => {

  // };

  const handleToggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const spinWheel = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);
    setResult(null);

    // Play spin sound
    playSpinSound();

    // Calculate random rotation for 30 seconds of spinning
    // More rotations for longer spin time
    const baseRotation = 360 * (50 + Math.random() * 20); // 50-70 full rotations over 30 seconds
    const finalAngle = Math.random() * 360;
    const totalRotation = rotation + baseRotation + finalAngle;

    setRotation(totalRotation);

    // Determine winning segment (8 segments, 45 degrees each)
    const normalizedAngle = (360 - (finalAngle % 360)) % 360;
    const segmentAngle = 360 / 8;
    const winningSegment = Math.floor(normalizedAngle / segmentAngle) + 1;
    const prize = PRIZES[winningSegment - 1];

    if (!isSpinning) {
      setIsSpinning(true);
      setCountdown(30);

      // Start countdown
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setIsSpinning(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Stop spinning after 30 seconds
    setTimeout(() => {
      setIsSpinning(false);
      const spinResult: SpinResult = {
        prize,
        winningSegment,
        spinNumber: 1,
        timestamp: Date.now(),
      };
      setResult(spinResult);
      setShowResult(true);

      // Play win sound after a short delay
      onResult(spinResult);
      setIsPlaceBet(true);
      setTimeout(() => {
        playWinSound(prize.rarity);
      }, 500);
    }, 30000); // 30 seconds
  }, [isSpinning, onResult, rotation]);

  const handleToggleBet = () => {
    spinWheel();
    handleToggleModal();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative min-h-86 mb-6 mx-auto">
        <div
          className={`absolute w-86 h-86 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform ease-out ${
            isSpinning ? "duration-30000" : "duration-500"
          }`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center center",
          }}
        >
          <WheelSegment
            prize={PRIZES[0]}
            rotation={-90}
            segmentNumber={1}
            className="absolute w-[100px] h-[100px] top-0 left-[122px] flex items-center justify-center"
            isActive={result?.winningSegment === 1 && showResult}
          />

          <WheelSegment
            prize={PRIZES[1]}
            rotation={-44}
            segmentNumber={2}
            className="absolute w-[100px] h-[100px] top-[35px] left-[212px] flex items-center justify-center"
            isActive={result?.winningSegment === 2 && showResult}
          />

          <WheelSegment
            prize={PRIZES[2]}
            className="absolute w-[100px] h-[100px] top-[122px] left-[245px] flex items-center justify-center"
            rotation={0}
            segmentNumber={3}
            isActive={result?.winningSegment === 3 && showResult}
          />

          <WheelSegment
            prize={PRIZES[3]}
            rotation={45}
            segmentNumber={4}
            className="absolute w-[100px] h-[100px] top-[210px] left-[210px] flex items-center justify-center"
            isActive={result?.winningSegment === 4 && showResult}
          />

          <WheelSegment
            prize={PRIZES[4]}
            className="absolute w-[100px] h-[100px] top-[245px] left-[122px] flex items-center justify-center"
            rotation={90}
            segmentNumber={5}
            isActive={result?.winningSegment === 5 && showResult}
          />

          <WheelSegment
            prize={PRIZES[5]}
            className="absolute w-[100px] h-[100px] top-[205px] left-[35px] flex items-center justify-center"
            rotation={135}
            segmentNumber={6}
            isActive={result?.winningSegment === 6 && showResult}
          />

          <WheelSegment
            prize={PRIZES[6]}
            rotation={-180}
            segmentNumber={7}
            className="absolute w-[100px] h-[100px] top-[122px] left-[0px] flex items-center justify-center"
            isActive={result?.winningSegment === 7 && showResult}
          />

          <WheelSegment
            prize={PRIZES[7]}
            rotation={-135}
            segmentNumber={8}
            className="absolute w-[100px] h-[100px] top-[35px] left-[35px] flex items-center justify-center"
            isActive={result?.winningSegment === 8 && showResult}
          />
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-7 flex items-center justify-center">
          {Arrow}
        </div>

        <div
          // onClick={spinWheel}
          // disabled={isSpinning}
          className="absolute w-[118px] h-[118px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-blue-950 rounded-full shadow-[inset_0px_0px_15px_rgba(26,201,255,0.5),inset_0px_0px_8px_rgba(255,255,255,0.2)] flex flex-col items-center justify-center"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-full blur-[15px] absolute opacity-60" />
          <div className="relative">
            <div className="text-white text-xs text-center font-medium whitespace-nowrap mb-1">
              Начало через :
            </div>
            <div className="text-white text-2xl text-center font-medium">
              {countdown} сек
            </div>
          </div>
        </div>
      </div>

      {!isPlaceBet && (
        <BottomButton
          withShadow
          disabled={isSpinning}
          className="w-full mb-5"
          content="Сделать ставку"
          onClick={handleToggleModal}
        />
      )}
      {isPlaceBet && (
        <button
          type="button"
          className="w-full shadow-[0px_0px_19.6px_0px_--alpha(var(--color-blue-200)_/_50%)] min-h-13.5 rounded-2xl bg-linear-360 from-blue-50 from-0% to-blue-100 to-100% cursor-pointer text-white disabled:bg-dark-blue-700 disabled:text-white/50 disabled:shadow-none disabled:bg-linear-[none] disabled:cursor-not-allowed px-5"
        >
          <div className="font-medium text-lg/5 grid grid-cols-2">
            <div className="text-tiny/3 font-thin text-left">Ставка:</div>
            <div className="text-tiny/3 font-thin text-right">Шанс победы:</div>
            <div className="text-lg/5 font-medium text-left">12 TON</div>
            <div className="text-lg/5 font-medium text-right">42%</div>
          </div>
        </button>
      )}
      <Modal open={openModal} onClose={handleToggleModal}>
        <p className="text-lg font-medium mb-7.5 text-center mt-2 mx-2">
          Вы хотите сделать ставку ? После подтверждения ее нельзя будет
          отменить !
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={handleToggleModal}
            className="cursor-pointer min-h-10.5 grid place-content-center border border-white rounded-lg"
          >
            Не буду ставить
          </button>
          <button
            type="button"
            onClick={handleToggleBet}
            className="cursor-pointer min-h-10.5 grid place-content-center bg-blue rounded-lg"
          >
            Сделать ставку
          </button>
        </div>
      </Modal>
    </div>
  );
};

const Arrow = (
  <svg
    width="56"
    height="50"
    viewBox="0 0 56 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_di_264_815)">
      <path
        d="M7.66932 16.1581C5.19489 12.161 8.06985 7 12.7709 7H28H43.2291C47.9301 7 50.8051 12.161 48.3307 16.1581L33.1016 40.759C30.7559 44.5481 25.2441 44.5481 22.8984 40.759L7.66932 16.1581Z"
        fill="#2D3B4B"
      />
      <path
        d="M12.7705 8H43.2295C47.1468 8.00029 49.5424 12.301 47.4805 15.6318L32.251 40.2324C30.2962 43.39 25.7038 43.39 23.749 40.2324L8.51953 15.6318C6.45758 12.301 8.8532 8.00029 12.7705 8Z"
        stroke="white"
        stroke-width="2"
      />
    </g>
    <defs>
      <filter
        id="filter0_di_264_815"
        x="0.461719"
        y="0.7"
        width="55.0766"
        height="49.2008"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="3.15" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.101961 0 0 0 0 0.788235 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_264_815"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_264_815"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="5.2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.101961 0 0 0 0 0.788235 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_264_815"
        />
      </filter>
    </defs>
  </svg>
);
