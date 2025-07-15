import { useState, useCallback, useEffect } from 'react';
import { LobbyStatus, type GetLobbyQuery } from '@/shared/api/graphql/graphql';

interface WheelSegment {
  id: number;
  label: string;
  stake: number;
  color: number;
  reward: string;
  playerName: string;
  startAngle: number;
  endAngle: number;
  angle: number;
  percentage: number;
  userId: number;
  userImage?: string;
}

interface SpinWheelState {
  isSpinning: boolean;
  isEternalSpinning: boolean;
  rotation: number;
  gameTimer: number;
  countdown: number;
  selectedSegment: number | null;
  gamePhase: LobbyStatus;
  isHighlighting: boolean;
  gameStarted: boolean;
  pendingWinnerId: string | null;
  segments: WheelSegment[];
  hasEnoughPlayers: boolean;
  isSearchingWinner: boolean; // Новое состояние для поиска победителя
}

interface SpinWheelProps {
  lobby: GetLobbyQuery['lobby'];
  onSelected: (winnerId: string) => void;
}

export const useSpinWheel = ({ lobby, onSelected }: SpinWheelProps) => {
  const [state, setState] = useState<SpinWheelState>({
    isSpinning: false,
    isEternalSpinning: false,
    rotation: 0,
    gameTimer: 15,
    countdown: lobby.timeToStart,
    selectedSegment: null,
    gamePhase: lobby.status,
    isHighlighting: false,
    gameStarted: false,
    pendingWinnerId: null,
    segments: [],
    hasEnoughPlayers: lobby.participants.length >= 2,
    isSearchingWinner: false,
  });

  // Преобразуем участников в сегменты колеса
  const transformParticipantsToSegments = useCallback(
    (participants: GetLobbyQuery['lobby']['participants']): WheelSegment[] => {
      if (participants.length === 0) return [];

      const totalStakes = participants.reduce(
        (sum, participant) => sum + (participant.amount || 1),
        0,
      );
      let currentAngle = 0;

      return participants.map((participant) => {
        const stake = participant.amount || 1;
        const segmentPercentage = (stake / totalStakes) * 100;
        const angle = (segmentPercentage / 100) * 2 * Math.PI;
        const startAngle = currentAngle;
        currentAngle += angle;

        return {
          stake,
          id: participant.id,
          label: participant.user.username,
          color: 0x2d353f, // Используем единый цвет как в spin-carousel
          reward: `$${(stake * 2).toFixed(2)}`,
          playerName: participant.user.username,
          startAngle,
          endAngle: currentAngle,
          angle,
          percentage: segmentPercentage,
          userId: participant.userId,
          userImage: participant.user.image as string,
        };
      });
    },
    [],
  );

  // Обновляем сегменты при изменении участников
  useEffect(() => {
    const segments = transformParticipantsToSegments(lobby.participants);

    setState((prev) => ({
      ...prev,
      segments,
      hasEnoughPlayers: lobby.participants.length >= 2,
    }));
  }, [lobby.participants, transformParticipantsToSegments]);

  const getPhaseText = useCallback(() => {
    const phaseText = (() => {
      if (!state.hasEnoughPlayers) {
        return 'Нужно 2+ игрока';
      }

      // Если ищем победителя, показываем это
      if (state.isSearchingWinner) {
        return 'Ищем победителя';
      }

      switch (state.gamePhase) {
        case LobbyStatus.WaitingForPlayers:
          return 'Ready to start';
        case LobbyStatus.Countdown:
          return `${state.countdown} сек`;
        case LobbyStatus.InProcess:
          return `${state.gameTimer} сек`;
        case LobbyStatus.Completed:
          return state.selectedSegment !== null
            ? state.segments[state.selectedSegment]?.playerName || 'Game Over'
            : 'Game Over';
        default:
          return 'Ready to start';
      }
    })();

    console.log('🔌 useSpinWheel: getPhaseText:', {
      phaseText,
      gamePhase: state.gamePhase,
      countdown: state.countdown,
      gameTimer: state.gameTimer,
      hasEnoughPlayers: state.hasEnoughPlayers,
      isSearchingWinner: state.isSearchingWinner,
    });

    return phaseText;
  }, [
    state.hasEnoughPlayers,
    state.gamePhase,
    state.countdown,
    state.gameTimer,
    state.selectedSegment,
    state.segments,
    state.isSearchingWinner,
  ]);

  const getPhaseLabel = useCallback(() => {
    if (!state.hasEnoughPlayers) {
      return 'Waiting:';
    }

    // Если ищем победителя, показываем соответствующий лейбл
    if (state.isSearchingWinner) {
      return 'Статус:';
    }

    switch (state.gamePhase) {
      case LobbyStatus.WaitingForPlayers:
        return 'Начало через:';
      case LobbyStatus.Countdown:
        return 'Начало через:';
      case LobbyStatus.InProcess:
        return 'Игра:';
      case LobbyStatus.Completed:
        return 'Победитель:';
      default:
        return 'Начало через:';
    }
  }, [state.hasEnoughPlayers, state.gamePhase, state.isSearchingWinner]);

  const calculateWinnerRotation = useCallback(
    (winnerId: string) => {
      const activeParticipants = lobby.participants;
      let selectedIndex = activeParticipants.findIndex(
        (participant) => participant.userId === Number(winnerId),
      );

      if (selectedIndex === -1) {
        selectedIndex = Math.floor(Math.random() * activeParticipants.length);
      }

      const currentSegmentAngle = 360 / activeParticipants.length;
      const targetAngle =
        selectedIndex * currentSegmentAngle + currentSegmentAngle / 2;
      const extraSpins = 2 + Math.random() * 2;
      const finalTargetRotation =
        state.rotation + extraSpins * 360 + (360 - targetAngle);

      return { finalTargetRotation, selectedIndex };
    },
    [lobby.participants, state.rotation],
  );

  const stopSpinAndSelectWinner = useCallback(
    (winnerId: string) => {
      if (!state.isEternalSpinning) {
        return;
      }

      const { finalTargetRotation, selectedIndex } =
        calculateWinnerRotation(winnerId);

      setState((prev) => ({
        ...prev,
        isEternalSpinning: false,
        isSpinning: true,
        rotation: finalTargetRotation,
      }));

      // После завершения анимации (12 секунд)
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          isSpinning: false,
          selectedSegment: selectedIndex,
          gamePhase: LobbyStatus.Completed,
          isHighlighting: true,
          isSearchingWinner: false, // Сбрасываем состояние поиска победителя
        }));

        // Ждем 800мс и вызываем onSelected
        setTimeout(() => {
          onSelected(winnerId);
          setState((prev) => ({
            ...prev,
            isHighlighting: false,
          }));
        }, 1000); // Изменили с 2000 на 800мс
      }, 12000); // 12 секунд для завершения анимации
    },
    [
      state.isEternalSpinning,
      state.isSpinning,
      state.rotation,
      calculateWinnerRotation,
      onSelected,
    ],
  );

  const startEternalSpin = useCallback(() => {
    if (!state.gameStarted) return;

    setState((prev) => ({
      ...prev,
      gamePhase: LobbyStatus.InProcess,
      isEternalSpinning: true,
      gameTimer: 5,
    }));
  }, [state.gameStarted]);

  const handleAutoSpin = useCallback(
    (winnerId: string) => {
      console.log('🔌 handleAutoSpin вызван:', {
        winnerId,
        isEternalSpinning: state.isEternalSpinning,
        isSpinning: state.isSpinning,
        gamePhase: state.gamePhase,
      });

      // Устанавливаем состояние поиска победителя
      setState((prev) => ({
        ...prev,
        isSearchingWinner: true,
      }));

      if (state.isEternalSpinning) {
        // Если уже вращается вечно, останавливаем и выбираем победителя
        console.log('🔌 Останавливаем вечное вращение...');
        stopSpinAndSelectWinner(winnerId);
      } else if (state.isSpinning) {
        // Если уже идет финальная анимация, просто ждем
        console.log('🔌 Колесо уже останавливается, ждем завершения...');
      } else {
        // Если не вращается, начинаем вечное вращение
        console.log('🔌 Начинаем вечное вращение...');
        setState((prev) => ({
          ...prev,
          pendingWinnerId: winnerId,
        }));
        startEternalSpin();
      }
    },
    [
      state.isEternalSpinning,
      state.isSpinning,
      state.gamePhase,
      stopSpinAndSelectWinner,
      startEternalSpin,
    ],
  );

  const startGame = useCallback(() => {
    if (!state.hasEnoughPlayers || state.gameStarted) return;

    setState((prev) => ({
      ...prev,
      gameStarted: true,
      gamePhase: LobbyStatus.Countdown,
      countdown: lobby.timeToStart,
    }));
  }, [state.hasEnoughPlayers, state.gameStarted, lobby.timeToStart]);

  // Анимация вечного вращения
  useEffect(() => {
    let animationFrame: number;

    if (state.isEternalSpinning) {
      const animate = () => {
        setState((prev) => ({
          ...prev,
          rotation: prev.rotation + 3, // Уменьшили скорость с 10 до 3
        }));
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [state.gamePhase, state.isEternalSpinning, state.rotation]);

  // Автоматическая остановка вращения при наличии победителя
  useEffect(() => {
    if (
      state.isEternalSpinning &&
      state.pendingWinnerId &&
      state.gamePhase === LobbyStatus.InProcess
    ) {
      const timer = setTimeout(() => {
        stopSpinAndSelectWinner(state.pendingWinnerId!);
        setState((prev) => ({
          ...prev,
          pendingWinnerId: null,
        }));
      }, 8000); // Увеличили до 8 секунд для более длительного вращения

      return () => clearTimeout(timer);
    }
  }, [
    state.isEternalSpinning,
    state.pendingWinnerId,
    state.gamePhase,
    stopSpinAndSelectWinner,
  ]);

  // Таймер обратного отсчета
  useEffect(() => {
    console.log('🔌 useSpinWheel: таймер обратного отсчета:', {
      gamePhase: state.gamePhase,
      countdown: state.countdown,
      gameStarted: state.gameStarted,
    });

    let timer: ReturnType<typeof setTimeout>;

    if (state.gamePhase === LobbyStatus.Countdown && state.countdown > 0) {
      console.log(`🔌 useSpinWheel: обратный отсчет - ${state.countdown} сек`);
      timer = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          countdown: prev.countdown - 1,
        }));
      }, 1000);
    } else if (
      state.gamePhase === LobbyStatus.Countdown &&
      state.countdown === 0
    ) {
      console.log('🔌 useSpinWheel: обратный отсчет завершен, начинаем игру');
      const demoWinnerId =
        lobby.participants.length > 0
          ? lobby.participants[
              Math.floor(Math.random() * lobby.participants.length)
            ].userId.toString()
          : Math.floor(Math.random() * state.segments.length).toString();
      handleAutoSpin(demoWinnerId);
    }

    return () => clearTimeout(timer);
  }, [
    state.countdown,
    state.gamePhase,
    lobby.participants,
    state.segments.length,
    handleAutoSpin,
  ]);

  // Таймер игры
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (
      state.gamePhase === LobbyStatus.InProcess &&
      state.gameTimer > 0 &&
      !state.isEternalSpinning
    ) {
      timer = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          gameTimer: prev.gameTimer - 1,
        }));
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [state.gameTimer, state.gamePhase, state.isEternalSpinning]);

  // Обновление состояния при изменении лобби
  useEffect(() => {
    console.log('🔌 useSpinWheel: обновление состояния лобби:', {
      currentGamePhase: state.gamePhase,
      lobbyStatus: lobby.status,
      lobbyTimeToStart: lobby.timeToStart,
      participantsLength: lobby.participants.length,
    });

    setState((prev) => ({
      ...prev,
      countdown: lobby.timeToStart,
      gamePhase: lobby.status,
      hasEnoughPlayers: lobby.participants.length >= 2,
    }));
  }, [
    lobby.timeToStart,
    lobby.status,
    lobby.participants.length,
    state.gamePhase,
  ]);

  return {
    // Состояние
    isSpinning: state.isSpinning,
    isEternalSpinning: state.isEternalSpinning,
    rotation: state.rotation,
    gameTimer: state.gameTimer,
    countdown: state.countdown,
    selectedSegment: state.selectedSegment,
    gamePhase: state.gamePhase,
    isHighlighting: state.isHighlighting,
    gameStarted: state.gameStarted,
    segments: state.segments,
    hasEnoughPlayers: state.hasEnoughPlayers,
    isSearchingWinner: state.isSearchingWinner,

    // Методы
    getPhaseText,
    getPhaseLabel,
    handleAutoSpin,
    startGame,

    // Обновление состояния извне (для интеграции с socket.io)
    updateGamePhase: (phase: LobbyStatus) => {
      console.log('🔌 useSpinWheel: updateGamePhase вызван:', {
        newPhase: phase,
        currentPhase: state.gamePhase,
      });
      setState((prev) => ({ ...prev, gamePhase: phase }));
    },
    updateCountdown: (countdown: number) => {
      console.log('🔌 useSpinWheel: updateCountdown вызван:', {
        newCountdown: countdown,
        currentCountdown: state.countdown,
      });
      setState((prev) => ({ ...prev, countdown }));
    },
    setGameStarted: (started: boolean) => {
      console.log('🔌 useSpinWheel: setGameStarted вызван:', {
        newGameStarted: started,
        currentGameStarted: state.gameStarted,
      });
      setState((prev) => ({ ...prev, gameStarted: started }));
    },
  };
};

// const lobby: GetLobbyQuery['lobby'] = {
//   id: 89,
//   title: 'Прокрут Новичка',
//   status: LobbyStatus.WaitingForPlayers, // Начинаем с ожидания
//   minBet: 1,
//   maxBet: 5,
//   timeToStart: 10, // Увеличили время отсчета
//   winnerId: 1,
//   createdAt: '2025-07-15T06:58:40.019Z',
//   updatedAt: '2025-07-15T06:58:40.019Z',
//   countdownExpiresAt: null,
//   participants: [
//     {
//       id: 1000,
//       userId: 1,
//       amount: 1,
//       user: {
//         username: 'husan',
//         image: 'https://avatar.iran.liara.run/public/15',
//       },
//       gifts: [
//         {
//           price: 1,
//           blocked: false,
//           slug: 'BDayCandle-168379',
//           id: '5031ad20-642f-4350-9cff-7498456d727e',
//         },
//       ],
//     },
//     {
//       id: 1001,
//       userId: 6,
//       amount: 1,
//       user: {
//         username: 'ax',
//         image: 'https://avatar.iran.liara.run/public/16',
//       },
//       gifts: [
//         {
//           price: 1,
//           blocked: false,
//           slug: 'BDayCandle-168379',
//           id: '5031ad20-642f-4350-9cff-7498456d727e',
//         },
//       ],
//     },
//   ],
//   __typename: 'Lobby',
// };
