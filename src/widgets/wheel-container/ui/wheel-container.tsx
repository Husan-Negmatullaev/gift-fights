import { useCallback, useEffect, useState } from 'react';
import { Wheel } from '@/features/wheel';
import {
  useUserJoinedToLobbySocket,
  useLobbyWinnerSubscription,
} from '@/features/wheel';
import { LobbyStatus, type GetLobbyQuery } from '@/shared/api/graphql/graphql';
import { WHEEL_ANIMATION } from '@/shared/constants/wheel-animation-constants';

type WheelContainerProps = {
  onAfterJoinToLobby(): void;
  lobby: GetLobbyQuery['lobby'];
  onWinner(winnerId: string): void;
  // onNavigateToResults?: () => void; // Add navigation callback
};

export const WheelContainer = (props: WheelContainerProps) => {
  const { onWinner, onAfterJoinToLobby, lobby } = props;
  // const {
  //   lobby,
  //   refetch: handleRefetch,
  //   participantCount,
  //   totalAmount,
  //   isActive,
  //   timeRemaining,
  // } = useLobbyInfo({ lobbyId: mockId });

  const participants = lobby.participants;

  const timeRemaining = lobby.countdownExpiresAt
    ? new Date(lobby.countdownExpiresAt).getTime() - Date.now()
    : 0;

  const [targetRotation, setTargetRotation] = useState(0);
  const [predeterminedWinner, setPredeterminedWinner] =
    useState<WheelSegment | null>(null);
  const [spinTimeLeft, setSpinTimeLeft] = useState(0);

  const [countdownTime, setCountdownTime] = useState(0);
  const [status, setStatus] = useState<LobbyStatus>(lobby.status);

  const convertParticipantsToSegments = useCallback((): WheelSegment[] => {
    if (!participants || participants.length === 0) return [];

    const totalAmount = participants.reduce((sum, p) => sum + p.amount, 0);
    const visualOffset = -90; // PIXI 0° is "right", we want 0° to be "up" (under arrow)
    let currentAngleDegrees = 0;

    return participants.map((participant) => {
      const segmentPercentage = (participant.amount / totalAmount) * 100;
      const angleDegrees = (segmentPercentage / 100) * 360; // Angle in degrees

      const startAngleDegrees = currentAngleDegrees + visualOffset;
      const endAngleDegrees = startAngleDegrees + angleDegrees;
      currentAngleDegrees += angleDegrees;

      return {
        id: participant.userId,
        stake: participant.amount,
        label: participant.user.username,
        image: participant.user.image || '',
        playerName: participant.user.username,
        color: generateStableColor(participant.user.username),
        reward: `$${(participant.amount * 2).toFixed(2)}`, // 2x stake as reward
        startAngle: (startAngleDegrees * Math.PI) / 180, // Convert to radians for PIXI
        endAngle: (endAngleDegrees * Math.PI) / 180, // Convert to radians for PIXI
        startAngleDegrees, // Keep degrees for calculations
        endAngleDegrees, // Keep degrees for calculations
        angle: angleDegrees,
        percentage: segmentPercentage,
      };
    });
  }, [participants]);

  // Derive values from lobby data
  const segments = convertParticipantsToSegments();

  // Update status based on lobby state and participants count
  useEffect(() => {
    if (
      lobby.status === LobbyStatus.WaitingForPlayers &&
      segments.length >= 2
    ) {
      // Переходим в статус Countdown когда достаточно игроков
      setStatus(LobbyStatus.Countdown);
    } else if (
      lobby.status === LobbyStatus.WaitingForPlayers &&
      segments.length < 2
    ) {
      // Остаемся в статусе WaitingForPlayers если игроков недостаточно
      setStatus(LobbyStatus.WaitingForPlayers);
    } else {
      // Синхронизируем с lobby статусом для других случаев
      setStatus(lobby.status);
    }
  }, [lobby.status, segments.length]);

  // Update countdown timer based on countdownExpiresAt
  useEffect(() => {
    if (!lobby?.countdownExpiresAt) {
      setCountdownTime(0);
      return;
    }

    const updateCountdown = () => {
      const expiresAt = new Date(lobby.countdownExpiresAt!).getTime() + 8000;
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((expiresAt - now) / 1000));
      setCountdownTime(remaining);
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [lobby?.countdownExpiresAt]);

  const startSpin = useCallback(() => {
    setStatus(LobbyStatus.Completed); // Переходим в статус Completed когда начинается анимация
    // Используем секунды для отображения, конвертируем из миллисекунд
    setSpinTimeLeft(Math.ceil(WHEEL_ANIMATION.TOTAL_ANIMATION_TIME / 1000));
    return { predeterminedWinner: null, targetRotation: 0 };
  }, []);

  useEffect(() => {
    if (status === LobbyStatus.Countdown && timeRemaining === 0) {
      const spinResult = startSpin();
      if (spinResult) {
        setTargetRotation(spinResult.targetRotation);
      }
    }
  }, [status, timeRemaining, startSpin]);

  useEffect(() => {
    if (status === LobbyStatus.Completed && spinTimeLeft > 0) {
      const timer = setTimeout(() => {
        setSpinTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status, spinTimeLeft]);

  // Handle spin completion
  const handleSpinComplete = useCallback(() => {
    if (predeterminedWinner) {
      // Анимация уже завершена, просто вызываем onWinner
      onWinner(predeterminedWinner.id.toString());
    }
  }, [predeterminedWinner, onWinner]);

  useLobbyWinnerSubscription(lobby.id, (payload) => {
    console.log('Winner found, starting wheel spin:', payload);

    // Find the winning segment by winnerId (convert to string for comparison)
    console.log('🔍 SEARCHING FOR WINNER:', {
      payloadWinnerId: payload.payload.winnerId,
      payloadWinnerIdType: typeof payload.payload.winnerId,
      availableSegments: segments.map((s) => ({
        id: s.id,
        idType: typeof s.id,
        playerName: s.playerName,
        idAsString: s.id.toString(),
        idAsNumber: Number(s.id),
      })),
    });

    // Try multiple matching strategies to find the winner
    const winningSegment = segments.find(
      (segment) => Number(segment.id) === Number(payload.payload.winnerId),
    );

    // if (!winningSegment) {
    //   winningSegment = segments.find(
    //     (segment) =>
    //       segment.id.toString() === payload.payload.winnerId.toString(),
    //   );
    // }

    // if (!winningSegment) {
    //   winningSegment = segments.find(
    //     (segment) => Number(segment.id) === Number(payload.payload.winnerId),
    //   );
    // }

    // if (!winningSegment) {
    //   // Last resort: try to match by participant userId
    //   const winnerParticipant = participants.find(
    //     (p) => p.userId === payload.payload.winnerId.toString(),
    //   );
    //   if (winnerParticipant) {
    //     winningSegment = segments.find(
    //       (s) => s.playerName === winnerParticipant.user.username,
    //     );
    //   }
    // }

    console.log('🎯 WINNER SEGMENT FOUND:', {
      found: !!winningSegment,
      winningSegment: winningSegment
        ? {
            id: winningSegment.id,
            playerName: winningSegment.playerName,
            startAngleDegrees: winningSegment.startAngleDegrees,
            endAngleDegrees: winningSegment.endAngleDegrees,
            percentage: winningSegment.percentage,
          }
        : null,
    });

    if (winningSegment) {
      setPredeterminedWinner(winningSegment);

      const winnerCenterDegrees =
        (winningSegment.startAngleDegrees + winningSegment.endAngleDegrees) / 2;

      const rotationNeeded = (360 - winnerCenterDegrees) % 360;
      // const immediateScrollRotation = rotationNeeded * (Math.PI / 180);

      console.log('🎯 Winner rotation calculation:', {
        winnerSegment: {
          playerName: winningSegment.playerName,
          startAngleDegrees: winningSegment.startAngleDegrees,
          endAngleDegrees: winningSegment.endAngleDegrees,
          winnerCenterDegrees,
        },
        rotationNeeded,
        rotationNeededNormalized: rotationNeeded,
      });

      setTimeout(() => {
        const excitingSpins = WHEEL_ANIMATION.EXCITING_SPINS * 360;
        const finalRotationDegrees = excitingSpins + rotationNeeded;
        const finalRotationRadians = finalRotationDegrees * (Math.PI / 180);

        console.log('🚀 Setting target rotation:', {
          excitingSpins,
          rotationNeeded,
          finalRotationDegrees,
          finalRotationRadians,
          finalRotationRadiansNormalized: finalRotationRadians % (2 * Math.PI),
        });

        setTargetRotation(finalRotationRadians);
        setStatus(LobbyStatus.Completed); // Устанавливаем Completed когда начинается анимация крутки
        // Используем секунды для отображения, конвертируем из миллисекунд
        setSpinTimeLeft(Math.ceil(WHEEL_ANIMATION.TOTAL_ANIMATION_TIME / 1000));
      }, 1200);
    } else {
      console.error('❌ Winner segment not found!', {
        payloadWinnerId: payload.payload.winnerId,
        payloadType: typeof payload.payload.winnerId,
        availableSegments: segments.map((s) => ({
          id: s.id,
          name: s.playerName,
        })),
      });
    }
  });

  useUserJoinedToLobbySocket(lobby.id, () => {
    onAfterJoinToLobby();
  });

  // Get display text based on game state
  const getDisplayText = () => {
    console.log('📊 getDisplayText status:', {
      status,
      countdownTime,
      predeterminedWinner: predeterminedWinner?.playerName,
    });

    // Показываем таймер во время обратного отсчета
    if (status === LobbyStatus.Countdown && countdownTime > 0) {
      return countdownTime < 10
        ? `00:0${countdownTime}`
        : `00:${countdownTime}`;
    }

    // Показываем "00:00" только когда таймер закончился но анимация еще не началась
    if (status === LobbyStatus.Countdown) {
      return '00:00';
    }

    // Для статуса Completed возвращаем пустую строку, позволяя Wheel самому управлять текстом
    if (status === LobbyStatus.Completed) {
      return '';
    }

    return 'Ожидание';
  };

  return (
    <Wheel
      radius={162}
      gamePhase={status}
      segments={segments.reverse()}
      winner={predeterminedWinner}
      targetRotation={targetRotation}
      isSpinning={status === LobbyStatus.Completed}
      onSpinComplete={handleSpinComplete}
      text={getDisplayText()}
    />
  );
};

const generateStableColor = (userId: string): number => {
  // Simple hash function to convert userId to number
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Use absolute value and modulo to get color index
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
};

const colors = [
  0xc49cff, // #C49CFF - фиолетовый
  0xff86c8, // #FF86C8 - розовый
  0x7ef29d, // #7EF29D - зеленый
  0x33e1e4, // #33E1E4 - голубой
  0xff8e8e, // #FF8E8E - красный
  0x78d9ff, // #78D9FF - синий
];

interface WheelSegment {
  id: number;
  image: string;
  label: string;
  stake: number;
  color: number;
  reward: string;
  playerName: string;
  startAngle: number;
  endAngle: number;
  startAngleDegrees: number;
  endAngleDegrees: number;
  angle: number;
  percentage: number;
}
