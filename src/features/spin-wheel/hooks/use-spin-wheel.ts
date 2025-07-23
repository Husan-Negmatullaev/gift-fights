import { useState, useCallback, useEffect, useRef } from 'react';
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
  isSlowingDown: boolean; // Новое состояние для плавного замедления
  rotation: number;
  targetRotation?: number; // Целевая позиция для плавного перехода
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
  // Реф для отслеживания предыдущего сегмента (для звука)
  const previousSegmentRef = useRef<number>(-1);

  // Функция воспроизведения звука клика
  const playClickSound = useCallback(() => {
    try {
      const audio = new Audio('/assets/audio/cs-spin.wav');
      audio.volume = 0.3; // Уменьшаем громкость
      audio.play().catch((e) => console.log('Audio play failed:', e));
    } catch (e) {
      console.log('Audio creation failed:', e);
    }
  }, []);

  // Функция для определения текущего сегмента по углу поворота
  const getCurrentSegment = useCallback(
    (rotation: number, segmentsCount: number) => {
      if (segmentsCount === 0) return -1;

      // Нормализуем угол к положительному значению
      const normalizedRotation =
        ((rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

      // Размер каждого сегмента в радианах
      const segmentSize = (Math.PI * 2) / segmentsCount;

      // Определяем текущий сегмент (стрелка указывает вверх)
      const currentSegment = Math.floor(normalizedRotation / segmentSize);

      return currentSegment;
    },
    [],
  );

  // Функция для расчета актуального countdown на основе countdownExpiresAt
  const calculateActualCountdown = useCallback(() => {
    // ВСЕГДА используем countdownExpiresAt для точного расчета если он есть
    if (lobby.countdownExpiresAt) {
      const now = new Date().getTime();
      const expiresAt = new Date(lobby.countdownExpiresAt).getTime();
      const timeLeft = Math.max(0, Math.ceil((expiresAt - now) / 1000));
      return timeLeft;
    }

    // Если countdownExpiresAt отсутствует, но статус Countdown - это проблема перезагрузки страницы
    if (lobby.status === LobbyStatus.Countdown) {
      console.warn(
        '⚠️ Countdown phase without countdownExpiresAt - likely page reload during countdown',
      );
      return 0; // Немедленно переходим к следующей фазе
    }

    // Для других статусов возвращаем 0 - не используем неактуальный timeToStart
    console.warn('⚠️ No countdownExpiresAt available, returning 0');
    return 0;
  }, [lobby.countdownExpiresAt, lobby.status]);

  const [state, setState] = useState<SpinWheelState>({
    isSpinning: false,
    isEternalSpinning: false,
    isSlowingDown: false,
    rotation: 0,
    gameTimer: 15,
    countdown: calculateActualCountdown(),
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
        return 'Ожидание';
      }

      // Особый случай: обнаружена перезагрузка во время countdown
      if (
        lobby.status === LobbyStatus.Countdown &&
        !lobby.countdownExpiresAt &&
        state.countdown === 0
      ) {
        return 'Синхронизация...';
      }

      // Особый случай: обнаружена перезагрузка во время InProcess
      if (
        lobby.status === LobbyStatus.InProcess &&
        !state.gameStarted &&
        state.gameTimer === 5
      ) {
        return 'Восстановление игры...';
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

    return phaseText;
  }, [
    state.hasEnoughPlayers,
    state.gamePhase,
    state.countdown,
    state.gameTimer,
    state.selectedSegment,
    state.segments,
    state.isSearchingWinner,
    state.gameStarted,
    lobby.status,
    lobby.countdownExpiresAt,
  ]);

  const getPhaseLabel = useCallback(() => {
    if (!state.hasEnoughPlayers) {
      return 'Waiting:';
    }

    // Особые случаи для перезагрузки страницы
    if (
      lobby.status === LobbyStatus.Countdown &&
      !lobby.countdownExpiresAt &&
      state.countdown === 0
    ) {
      return 'Статус:';
    }

    if (
      lobby.status === LobbyStatus.InProcess &&
      !state.gameStarted &&
      state.gameTimer === 5
    ) {
      return 'Статус:';
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
  }, [
    state.hasEnoughPlayers,
    state.gamePhase,
    state.isSearchingWinner,
    state.gameStarted,
    state.countdown,
    state.gameTimer,
    lobby.status,
    lobby.countdownExpiresAt,
  ]);

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

      // Сначала переходим в фазу замедления
      setState((prev) => ({
        ...prev,
        isEternalSpinning: false,
        isSlowingDown: true,
        targetRotation: finalTargetRotation, // Сохраняем целевую позицию
      }));

      // Через 2 секунды замедления переходим к финальной анимации
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          isSlowingDown: false,
          isSpinning: true,
        }));

        // После завершения финальной анимации (1.5 секунды для более плавной остановки)
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            isSpinning: false,
            selectedSegment: selectedIndex,
            gamePhase: LobbyStatus.Completed,
            isHighlighting: true,
            isSearchingWinner: false,
          }));

          // Ждем 500мс и вызываем onSelected
          setTimeout(() => {
            onSelected(winnerId);
            setState((prev) => ({
              ...prev,
              isHighlighting: false,
            }));
          }, 500);
        }, 1500); // Увеличили до 1.5 секунды для более плавной финальной анимации
      }, 2000); // 2 секунды замедления
    },
    [state.isEternalSpinning, calculateWinnerRotation, onSelected],
  );

  const startEternalSpin = useCallback(() => {
    if (!state.gameStarted) return;

    // Сбрасываем предыдущий сегмент при начале нового спиннинга
    previousSegmentRef.current = -1;

    setState((prev) => ({
      ...prev,
      gamePhase: LobbyStatus.InProcess,
      isEternalSpinning: true,
      gameTimer: 5,
    }));
  }, [state.gameStarted]);

  const handleAutoSpin = useCallback(
    (winnerId: string) => {
      // Устанавливаем состояние поиска победителя
      setState((prev) => ({
        ...prev,
        isSearchingWinner: true,
      }));

      if (state.isEternalSpinning) {
        // Если уже вращается вечно, останавливаем и выбираем победителя
        stopSpinAndSelectWinner(winnerId);
      } else if (state.isSpinning) {
        // Если уже идет финальная анимация, просто ждем
      } else {
        // Если не вращается, начинаем вечное вращение
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
      stopSpinAndSelectWinner,
      startEternalSpin,
    ],
  );

  const startGame = useCallback(() => {
    if (!state.hasEnoughPlayers || state.gameStarted) return;

    // Сбрасываем предыдущий сегмент при начале новой игры
    previousSegmentRef.current = -1;

    setState((prev) => ({
      ...prev,
      gameStarted: true,
      gamePhase: LobbyStatus.Countdown,
      countdown: calculateActualCountdown(),
    }));
  }, [state.hasEnoughPlayers, state.gameStarted, calculateActualCountdown]);

  // Анимация вечного вращения, замедления и финальной остановки
  useEffect(() => {
    let animationFrame: number;

    if (state.isEternalSpinning) {
      const animate = () => {
        setState((prev) => {
          const newRotation = prev.rotation + 0.1;

          // Проверяем пересечение границ сегментов для звука
          const segmentsCount = state.segments.length;
          if (segmentsCount > 0) {
            const currentSegment = getCurrentSegment(
              newRotation,
              segmentsCount,
            );
            const previousSegment = previousSegmentRef.current;

            // Если сегмент изменился, воспроизводим звук
            if (currentSegment !== previousSegment && previousSegment !== -1) {
              playClickSound();
            }

            previousSegmentRef.current = currentSegment;
          }

          return {
            ...prev,
            rotation: newRotation,
          };
        });
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    } else if (state.isSlowingDown) {
      // Фаза замедления - постепенно приближаемся к целевой позиции
      let slowdownProgress = 0;
      const startRotation = state.rotation;
      const targetRotation = state.targetRotation || startRotation;

      const animate = () => {
        slowdownProgress += 0.008; // Очень медленное увеличение прогресса
        const progress = Math.min(slowdownProgress, 1);

        // Плавная интерполяция с easing
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentRotation =
          startRotation + (targetRotation - startRotation) * easeOutQuart;

        setState((prev) => {
          // Проверяем пересечение границ сегментов для звука в фазе замедления
          const segmentsCount = state.segments.length;
          if (segmentsCount > 0) {
            const currentSegment = getCurrentSegment(
              currentRotation,
              segmentsCount,
            );
            const previousSegment = previousSegmentRef.current;

            // Если сегмент изменился, воспроизводим звук
            if (currentSegment !== previousSegment && previousSegment !== -1) {
              playClickSound();
            }

            previousSegmentRef.current = currentSegment;
          }

          return {
            ...prev,
            rotation: currentRotation,
          };
        });

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      animationFrame = requestAnimationFrame(animate);
    } else if (state.isSpinning && state.targetRotation !== undefined) {
      // Финальная фаза - плавное вращение к точной позиции победителя
      let finalProgress = 0;
      const startRotation = state.rotation;
      const targetRotation = state.targetRotation;

      const animate = () => {
        finalProgress += 0.01; // Замедлили для более плавной финальной анимации
        const progress = Math.min(finalProgress, 1);

        // Очень плавный easing для финальной остановки
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentRotation =
          startRotation + (targetRotation - startRotation) * easeOutCubic;

        setState((prev) => {
          // Проверяем пересечение границ сегментов для звука в финальной фазе
          const segmentsCount = state.segments.length;
          if (segmentsCount > 0) {
            const currentSegment = getCurrentSegment(
              currentRotation,
              segmentsCount,
            );
            const previousSegment = previousSegmentRef.current;

            // Если сегмент изменился, воспроизводим звук
            if (currentSegment !== previousSegment && previousSegment !== -1) {
              playClickSound();
            }

            previousSegmentRef.current = currentSegment;
          }

          return {
            ...prev,
            rotation: currentRotation,
          };
        });

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [
    state.gamePhase,
    state.isEternalSpinning,
    state.isSlowingDown,
    state.isSpinning,
    state.targetRotation,
    state.segments.length,
    getCurrentSegment,
    playClickSound,
  ]);

  // Автоматическая остановка вращения при наличии победителя
  // ЗАКОММЕНТИРОВАНО: Теперь ждем реального результата от useLobbyWinnerSubscription
  // useEffect(() => {
  //   if (
  //     state.isEternalSpinning &&
  //     state.pendingWinnerId &&
  //     state.gamePhase === LobbyStatus.InProcess
  //   ) {
  //     const timer = setTimeout(() => {
  //       stopSpinAndSelectWinner(state.pendingWinnerId!);
  //       setState((prev) => ({
  //         ...prev,
  //         pendingWinnerId: null,
  //       }));
  //     }, 3000); // Увеличили до 3 секунд для более плавного перехода

  //     return () => clearTimeout(timer);
  //   }
  // }, [
  //   state.isEternalSpinning,
  //   state.pendingWinnerId,
  //   state.gamePhase,
  //   stopSpinAndSelectWinner,
  // ]);

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

  // Специальная обработка для состояния Countdown и InProcess при перезагрузке страницы
  useEffect(() => {
    // Если лобби в состоянии Countdown, но countdownExpiresAt отсутствует - это перезагрузка страницы
    if (lobby.status === LobbyStatus.Countdown && !lobby.countdownExpiresAt) {
      console.log(
        '🔄 Detected page reload during countdown phase, starting game automatically',
      );

      // Устанавливаем игру как начатую и переходим к логике автоматического спина
      setState((prev) => ({
        ...prev,
        gameStarted: true,
        gamePhase: LobbyStatus.Countdown,
        countdown: 0, // Устанавливаем 0 для немедленного перехода к игре
      }));
    }

    // Если лобби в состоянии InProcess при загрузке - тоже обрабатываем как перезагрузку
    if (lobby.status === LobbyStatus.InProcess && !state.gameStarted) {
      console.log(
        '🔄 Detected page reload during InProcess phase, synchronizing game state',
      );

      setState((prev) => ({
        ...prev,
        gameStarted: true,
        gamePhase: LobbyStatus.InProcess,
        countdown: 0,
        gameTimer: 5, // Устанавливаем короткий таймер для быстрого перехода к спину
      }));

      // Запускаем демо-спин через короткое время
      const timer = setTimeout(() => {
        const demoWinnerId =
          lobby.participants.length > 0
            ? lobby.participants[
                Math.floor(Math.random() * lobby.participants.length)
              ].userId.toString()
            : '1';
        handleAutoSpin(demoWinnerId);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [
    lobby.status,
    lobby.countdownExpiresAt,
    state.gameStarted,
    lobby.participants,
    handleAutoSpin,
  ]);

  // Реальное время обновление countdown на основе countdownExpiresAt
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    // Если есть countdownExpiresAt, обновляем каждую секунду
    if (lobby.countdownExpiresAt && state.gamePhase === LobbyStatus.Countdown) {
      interval = setInterval(() => {
        const actualCountdown = calculateActualCountdown();
        setState((prev) => ({
          ...prev,
          countdown: actualCountdown,
        }));

        // Если время истекло, запускаем фальшивый спинер
        if (actualCountdown === 0) {
          console.log(
            '🎮 Countdown завершен (на основе countdownExpiresAt), запускаем фальшивый спинер',
          );

          setState((prev) => ({
            ...prev,
            gamePhase: LobbyStatus.InProcess,
            isEternalSpinning: true,
            gameTimer: 15,
            isSearchingWinner: true,
          }));

          // Очищаем интервал так как countdown завершен
          if (interval) {
            clearInterval(interval);
          }
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [lobby.countdownExpiresAt, state.gamePhase, calculateActualCountdown]);

  // Обновление состояния при изменении лобби
  useEffect(() => {
    const actualCountdown = calculateActualCountdown();

    setState((prev) => ({
      ...prev,
      countdown: actualCountdown,
      gamePhase: lobby.status,
      hasEnoughPlayers: lobby.participants.length >= 2,
    }));
  }, [
    lobby.countdownExpiresAt,
    lobby.status,
    lobby.participants.length,
    calculateActualCountdown,
  ]);

  return {
    // Состояние
    isSpinning: state.isSpinning,
    isEternalSpinning: state.isEternalSpinning,
    isSlowingDown: state.isSlowingDown,
    rotation: state.rotation,
    targetRotation: state.targetRotation,
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
      setState((prev) => ({ ...prev, gamePhase: phase }));
    },
    updateCountdown: (countdown: number) => {
      setState((prev) => ({ ...prev, countdown }));
    },
    setGameStarted: (started: boolean) => {
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
