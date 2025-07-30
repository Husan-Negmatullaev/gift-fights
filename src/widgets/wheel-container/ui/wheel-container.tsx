import { useCallback, useEffect, useState } from 'react';
import { useUserAddedGiftsToLobbySubscription, Wheel } from '@/features/wheel';
import {
  useUserJoinedToLobbySocket,
  useLobbyWinnerSubscription,
} from '@/features/wheel';
import { LobbyStatus, type GetLobbyQuery } from '@/shared/api/graphql/graphql';
import { WHEEL_ANIMATION } from '@/shared/constants/wheel-animation-constants';
// import { useAddGiftsToLobby } from '@/entities/lobby';

type WheelContainerProps = {
  onAfterJoinToLobby(): void;
  lobby: GetLobbyQuery['lobby'];
  onWinner(winnerId: string): void;
};

export const WheelContainer = (props: WheelContainerProps) => {
  const { onWinner, onAfterJoinToLobby, lobby } = props;

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
    const visualOffset = -90;
    let currentAngleDegrees = 0;

    return participants.map((participant) => {
      const segmentPercentage = (participant.amount / totalAmount) * 100;
      const angleDegrees = (segmentPercentage / 100) * 360;

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
        reward: `$${(participant.amount * 2).toFixed(2)}`,
        startAngle: (startAngleDegrees * Math.PI) / 180,
        endAngle: (endAngleDegrees * Math.PI) / 180,
        startAngleDegrees,
        endAngleDegrees,
        angle: angleDegrees,
        percentage: segmentPercentage,
      };
    });
  }, [participants]);

  const segments = convertParticipantsToSegments();

  useEffect(() => {
    if (
      lobby.status === LobbyStatus.WaitingForPlayers &&
      segments.length >= 2
    ) {
      setStatus(LobbyStatus.Countdown);
    } else if (
      lobby.status === LobbyStatus.WaitingForPlayers &&
      segments.length < 2
    ) {
      setStatus(LobbyStatus.WaitingForPlayers);
    } else {
      setStatus(lobby.status);
    }
  }, [lobby.status, segments.length]);

  useEffect(() => {
    if (!lobby?.countdownExpiresAt) {
      setCountdownTime(0);
      return;
    }

    const updateCountdown = () => {
      const expiresAt = new Date(lobby.countdownExpiresAt!).getTime() + 10000;
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((expiresAt - now) / 1000));
      setCountdownTime(remaining);
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [lobby?.countdownExpiresAt]);

  const startSpin = useCallback(() => {
    setStatus(LobbyStatus.Completed);
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

  const handleSpinComplete = useCallback(() => {
    if (predeterminedWinner) {
      onWinner(predeterminedWinner.id.toString());
    }
  }, [predeterminedWinner, onWinner]);

  useLobbyWinnerSubscription(lobby.id, (payload) => {
    const winningSegment = segments.find(
      (segment) => Number(segment.id) === Number(payload.payload.winnerId),
    );

    if (winningSegment) {
      setPredeterminedWinner(winningSegment);

      const winnerCenterDegrees =
        (winningSegment.startAngleDegrees + winningSegment.endAngleDegrees) / 2;

      const rotationNeeded = (360 - winnerCenterDegrees) % 360;

      setTimeout(() => {
        const excitingSpins = WHEEL_ANIMATION.EXCITING_SPINS * 360;
        const finalRotationDegrees = excitingSpins + rotationNeeded;
        const finalRotationRadians = finalRotationDegrees * (Math.PI / 180);

        setTargetRotation(finalRotationRadians);
        setStatus(LobbyStatus.Completed);
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

  useUserAddedGiftsToLobbySubscription(lobby.id, () => {
    onAfterJoinToLobby();
  });

  const getDisplayText = () => {
    if (status === LobbyStatus.Countdown && countdownTime > 0) {
      return countdownTime < 10
        ? `00:0${countdownTime}`
        : `00:${countdownTime}`;
    }

    if (status === LobbyStatus.Countdown) {
      return '00:00';
    }

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
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

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
