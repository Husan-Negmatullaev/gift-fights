import { useState, useEffect } from 'react';
import { Avatar } from '@/shared/ui/avatar/avatar';
import clsx from 'clsx';
import type { GetLobbyQuery } from '@/shared/api/graphql/graphql';
import { useUserJoinedToLobbySocket } from '../hooks/use-user-joined-to-lobby-subscription';

interface Segment {
  id: number;
  url: string;
  value: string;
  color: string;
}

type SpinCarouselProps = {
  gifts: string[];
  onSelected(): void;
  lobby: GetLobbyQuery['lobby'];
  participants: GetLobbyQuery['lobby']['participants'];
};

export const SpinCarousel = (props: SpinCarouselProps) => {
  const { onSelected, lobby, participants } = props;
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [gameTimer, setGameTimer] = useState(5);
  const [countdown, setCountdown] = useState(lobby.timeToStart);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [gamePhase, setGamePhase] = useState<
    'waiting' | 'spinning' | 'finished' | 'celebrating'
  >('waiting');
  const [isHighlighting, setIsHighlighting] = useState(false);

  const hasEnoughPlayers = participants.length >= 2;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (gamePhase === 'waiting' && countdown > 0 && hasEnoughPlayers) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (gamePhase === 'waiting' && countdown === 0 && hasEnoughPlayers) {
      handleAutoSpin();
    }

    return () => clearTimeout(timer);
  }, [countdown, gamePhase, hasEnoughPlayers]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (gamePhase === 'spinning' && gameTimer > 0) {
      timer = setTimeout(() => setGameTimer(gameTimer - 1), 1000);
    }

    return () => clearTimeout(timer);
  }, [gameTimer, gamePhase]);

  const handleAutoSpin = () => {
    if (!hasEnoughPlayers) return;

    setGamePhase('spinning');
    setIsSpinning(true);
    setGameTimer(5);

    const spins = 5 + Math.random() * 5;
    const finalRotation = rotation + spins * 360 + Math.random() * 360;
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);

      const segmentAngle = 360 / segments.length;
      const normalizedRotation = (360 - (finalRotation % 360)) % 360;
      const selectedIndex = Math.floor(normalizedRotation / segmentAngle);
      setSelectedSegment(selectedIndex);

      // Start celebration phase with highlighting
      setGamePhase('celebrating');
      setIsHighlighting(true);

      // After 800ms, move to finished state
      setTimeout(() => {
        onSelected();
        setGamePhase('finished');
        setIsHighlighting(false);
      }, 800);
    }, 5000);
  };

  // const handleManualSpin = () => {
  //   if (isSpinning || gamePhase !== 'waiting' || !hasEnoughPlayers) return;
  //   handleAutoSpin();
  //   joinToLobby(lobby.id);
  // };

  const getPhaseText = () => {
    if (!hasEnoughPlayers) {
      return 'Нужно 2+ \n игроков';
    }

    switch (gamePhase) {
      case 'waiting':
        return countdown > 0 ? `${countdown} сек` : 'Starting...';
      case 'spinning':
        return `${gameTimer} сек`;
      case 'celebrating':
        return selectedSegment !== null
          ? segments[selectedSegment].value
          : 'Winner!';
      case 'finished':
        return selectedSegment !== null
          ? segments[selectedSegment].value
          : 'Game Over';
      default:
        return `${countdown} сек`;
    }
  };

  const getPhaseLabel = () => {
    if (!hasEnoughPlayers) {
      return 'Waiting:';
    }

    switch (gamePhase) {
      case 'waiting':
        return 'Начало через:';
      case 'spinning':
        return 'Игра:';
      case 'celebrating':
      case 'finished':
        return 'Победитель:';
      default:
        return 'Начало через:';
    }
  };

  const getWinnerIconStyle = (segmentIndex: number) => {
    const isWinner = selectedSegment === segmentIndex;
    const isCelebrating = gamePhase === 'celebrating' && isHighlighting;

    if (isWinner && isCelebrating) {
      return {
        background: 'linear-gradient(45deg, #ffd700, #ffed4e, #ffd700)',
        borderColor: '#ffd700',
        boxShadow:
          '0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)',
        transform: 'translate(-50%, -50%) scale(1.3)',
        animation: 'pulse 0.5s ease-in-out infinite alternate',
      };
    } else if (isWinner && gamePhase === 'finished') {
      return {
        background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
        borderColor: '#ffd700',
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
        transform: 'translate(-50%, -50%) scale(1.2)',
      };
    }

    return {};
  };

  // const handleToggleModal = () => {
  //   setIsOpenModal((prev) => !prev);
  // };

  useUserJoinedToLobbySocket(lobby.id, (payload) => {
    console.log('Кто-то присоединился к лобби!', payload);
  });

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="flex flex-col items-center">
        <div className={`relative ${!hasEnoughPlayers ? 'opacity-60' : ''}`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl scale-110"></div>
          <div className="relative w-80 h-80 rounded-full">
            <div
              className={clsx(
                hasEnoughPlayers
                  ? 'shadow-[inset_0px_0px_10px_0px_--alpha(var(--color-blue-100)_/_50%),inset_0px_0px_4px_0px_--alpha(var(--color-white)_/_25%)]'
                  : 'shadow-[inset_0px_0px_10px_0px_--alpha(var(--color-red-100)_/_50%),inset_0px_0px_4px_0px_--alpha(var(--color-white)_/_25%)]',
                gamePhase === 'celebrating'
                  ? 'transition-transform duration-300 ease-out'
                  : '',
                'size-full rounded-full relative overflow-hidden transition-transform duration-[5000ms] ease-out ',
              )}
              style={{
                background: '#2D353F',
                transform: `rotate(${rotation}deg)`,
                transitionTimingFunction: isSpinning
                  ? 'cubic-bezier(0.17, 0.67, 0.12, 0.99)'
                  : 'ease',
              }}>
              {/* Segment Lines */}
              {participants.map((_, index) => (
                <div
                  key={index}
                  className="shadow-[inset_0px_0px_10px_0px_--alpha(var(--color-blue-100)_/_50%),inset_0px_0px_4px_0px_--alpha(var(--color-white)_/_25%)] absolute w-0.5 h-40 top-0 left-1/2 transform -translate-x-1/2 origin-bottom"
                  style={{
                    transform: `translateX(-50%) rotate(${index * 45}deg)`,
                  }}
                />
              ))}

              {/* Icons - Properly Centered in Each Segment */}
              {participants.map((segment, index, list) => {
                const segmentAngle = 360 / list.length; // 360 / 8 segments
                const angleInRadians =
                  (index * segmentAngle + segmentAngle / 2) * (Math.PI / 180);
                const radius = 115; // Distance from center
                const x = Math.cos(angleInRadians - Math.PI / 2) * radius;
                const y = Math.sin(angleInRadians - Math.PI / 2) * radius;

                return (
                  <div
                    key={segment.id}
                    className={clsx(
                      selectedSegment === index && isHighlighting
                        ? 'animate-pulse'
                        : '',
                      'shadow-[0px_0px_15px_3px_var(--color-blue-350)] absolute rounded-full flex items-center justify-center',
                    )}
                    style={{
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: 'translate(-50%, -50%)',
                      ...getWinnerIconStyle(index),
                    }}>
                    <Avatar
                      className="size-6.5"
                      url="/assets/images/leaders/avatar.webp"
                    />
                  </div>
                );
              })}
            </div>

            <div
              className={clsx(
                gamePhase === 'celebrating'
                  ? 'scale-110 border-yellow-400/70 shadow-yellow-500/30'
                  : '',
                'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-dark-blue-950 rounded-full flex flex-col items-center justify-center border-15 border-dark-blue box-content',
                !hasEnoughPlayers &&
                  'shadow-[0px_0px_10px_0px_--alpha(var(--color-red-100)_/_50%),0px_0px_4px_0px_--alpha(var(--color-white)_/_25%)]',
                hasEnoughPlayers &&
                  'shadow-[0px_0px_10px_0px_--alpha(var(--color-blue-100)_/_50%),0px_0px_4px_0px_--alpha(var(--color-white)_/_25%)]',
              )}>
              <p className="text-xs mb-px font-medium">{getPhaseLabel()}</p>
              <p
                className={clsx(
                  'text-2xl font-medium line-clamp-2 w-32 mx-auto text-center',
                )}>
                {getPhaseText()}
              </p>
            </div>
          </div>

          <Arrow className="drop-shadow-[0px_0px_6.3px] drop-shadow-blue-100 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-7" />
        </div>

        {/* Winner Display */}
        {/* {selectedSegment !== null && gamePhase === 'finished' && (
          <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-cyan-400/30 shadow-lg shadow-cyan-500/25">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center border border-cyan-400/50">
                {segments[selectedSegment].icon}
              </div>
              <p className="text-xl font-bold text-cyan-400">
                {segments[selectedSegment].value}
              </p>
            </div>
            <p className="text-sm text-slate-400">Congratulations! You won!</p>
          </div>
        )} */}
      </div>

      {/* <Modal open={isOpenModal} onClose={handleToggleModal}>
        <p className="text-lg font-medium mb-7.5 text-center mt-2 mx-2">
          Вы хотите сделать ставку ? После подтверждения ее нельзя будет
          отменить !
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={handleToggleModal}
            className="cursor-pointer min-h-10.5 grid place-content-center border border-white rounded-lg">
            Не буду ставить
          </button>
          <button
            type="button"
            onClick={handleManualSpin}
            className="cursor-pointer min-h-10.5 grid place-content-center bg-blue rounded-lg">
            Сделать ставку
          </button>
        </div>
      </Modal> */}
    </div>
  );
};

const Arrow = ({ className }: { className: string }) => {
  return (
    <svg
      width="44"
      height="37"
      fill="none"
      viewBox="0 0 44 37"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#2D3B4B"
        stroke="white"
        strokeWidth="2"
        d="M6.77051 1H37.2295C41.1468 1.00029 43.5424 5.30099 41.4805 8.63184L26.251 33.2324C24.2962 36.39 19.7038 36.39 17.749 33.2324L2.51953 8.63184C0.457582 5.30099 2.8532 1.00029 6.77051 1Z"
      />
    </svg>
  );
};

const segments: Segment[] = [
  {
    id: 0,
    color: '#2D353F',
    value: 'Grand Prize',
    url: '/assets/images/leaders/avatar.webp',
  },
  {
    id: 1,
    color: '#2D353F',
    value: 'Gift Box',
    url: '/assets/images/leaders/avatar.webp',
  },
  {
    id: 2,
    color: '#2D353F',
    value: 'Star Bonus',
    url: '/assets/images/leaders/avatar.webp',
  },
  {
    id: 3,
    color: '#2D353F',
    value: 'Diamond',
    url: '/assets/images/leaders/avatar.webp',
  },
  {
    id: 4,
    color: '#2D353F',
    value: 'Royal Crown',
    url: '/assets/images/leaders/avatar.webp',
  },
  {
    id: 5,
    color: '#2D353F',
    value: 'Gold Coins',
    url: '/assets/images/leaders/avatar.webp',
  },
  {
    id: 6,
    color: '#2D353F',
    value: 'Precious Gem',
    url: '/assets/images/leaders/avatar.webp',
  },
  {
    id: 7,
    color: '#2D353F',
    value: 'Lightning Bonus',
    url: '/assets/images/leaders/avatar.webp',
  },
];
