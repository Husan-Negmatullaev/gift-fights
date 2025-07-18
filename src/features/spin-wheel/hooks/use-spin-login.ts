import { useState, useCallback, useEffect } from 'react';

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
}

interface GameState {
  phase: 'waiting' | 'countdown' | 'spinning' | 'completed';
  timeLeft: number;
  segments: WheelSegment[];
  winner: WheelSegment | null;
  predeterminedWinner: WheelSegment | null;
  totalPot: number;
  nextId: number;
}

interface EntryData {
  playerName: string;
  stake: number;
}

const COUNTDOWN_DURATION = 60; // seconds
const SPIN_DURATION = 5; // seconds

// Color palette for segments
const colors = [
  0xef4444, // Red
  0x059669, // Green
  0x3b82f6, // Blue
  0xf97316, // Orange
  0x8b5cf6, // Purple
  0xef4444, // Light Red
  0x10b981, // Emerald
  0x6366f1, // Indigo
  0xf59e0b, // Amber
  0xec4899, // Pink
];

export const useSpinLogin = () => {
  const [gameState, setGameState] = useState<GameState>({
    nextId: 1,
    timeLeft: 0,
    segments: [],
    totalPot: 0,
    winner: null,
    phase: 'waiting',
    predeterminedWinner: null,
  });

  const calculateSegmentAngles = useCallback((segments: WheelSegment[]) => {
    if (segments.length === 0) return [];

    const totalStakes = segments.reduce(
      (sum, segment) => sum + segment.stake,
      0,
    );
    let currentAngle = 0;

    return segments.map((segment) => {
      const segmentPercentage = (segment.stake / totalStakes) * 100;
      const angle = (segmentPercentage / 100) * 2 * Math.PI;
      const startAngle = currentAngle;
      currentAngle += angle;

      return {
        ...segment,
        startAngle,
        endAngle: currentAngle,
        angle,
        percentage: segmentPercentage,
      };
    });
  }, []);

  const addEntry = useCallback(
    (entryData: EntryData) => {
      if (gameState.phase !== 'waiting' && gameState.phase !== 'countdown')
        return false;

      const newSegment: WheelSegment = {
        id: gameState.nextId,
        label: entryData.playerName,
        stake: entryData.stake,
        color: colors[(gameState.nextId - 1) % colors.length],
        reward: `$${(entryData.stake * 2).toFixed(2)}`, // 2x stake as reward
        playerName: entryData.playerName,
        startAngle: 0,
        endAngle: 0,
        angle: 0,
        percentage: 0,
      };

      setGameState((prev) => {
        const newSegments = [...prev.segments, newSegment];
        const segmentsWithAngles = calculateSegmentAngles(newSegments);

        return {
          ...prev,
          segments: segmentsWithAngles,
          totalPot: prev.totalPot + entryData.stake,
          nextId: prev.nextId + 1,
          // Start countdown if this is the second player and we're waiting
          phase:
            prev.phase === 'waiting' && prev.segments.length >= 1
              ? 'countdown'
              : prev.phase,
          timeLeft:
            prev.phase === 'waiting' && prev.segments.length >= 1
              ? COUNTDOWN_DURATION
              : prev.timeLeft,
        };
      });

      return true;
    },
    [
      gameState.phase,
      gameState.nextId,
      gameState.segments.length,
      calculateSegmentAngles,
    ],
  );

  const selectPredeterminedWinner = useCallback((segments: WheelSegment[]) => {
    if (segments.length === 0) return null;

    // Select winner based on weighted probability (higher stakes = higher chance)
    const totalStakes = segments.reduce(
      (sum, segment) => sum + segment.stake,
      0,
    );
    const random = Math.random() * totalStakes;
    let currentSum = 0;

    let selectedWinner = segments[0]; // fallback
    for (const segment of segments) {
      currentSum += segment.stake;
      if (random <= currentSum) {
        selectedWinner = segment;
        break;
      }
    }

    return selectedWinner;
  }, []);

  const calculateWinnerRotation = useCallback(
    (winnerSegment: WheelSegment, segments: WheelSegment[]) => {
      if (segments.length === 0) return 0;

      // Find the index of the winner segment
      const winnerIndex = segments.findIndex(
        (segment) => segment.id === winnerSegment.id,
      );
      if (winnerIndex === -1) return 0;

      // Calculate angle to the middle of the winner segment
      const winnerMiddleAngle =
        (winnerSegment.startAngle + winnerSegment.endAngle) / 2;

      // Calculate rotation to bring winner under the arrow (top position)
      const fullRotations = 5 * 2 * Math.PI; // 5 full rotations in radians
      const arrowOffset = -Math.PI / 2; // arrow is at top (-90° in radians)
      const targetRotation = fullRotations + (arrowOffset - winnerMiddleAngle);

      return targetRotation;
    },
    [],
  );

  const startCountdown = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      phase: 'countdown',
      timeLeft: COUNTDOWN_DURATION,
    }));
  }, []);

  const startSpin = useCallback(() => {
    if (gameState.segments.length === 0) return;

    const predeterminedWinner = selectPredeterminedWinner(gameState.segments);
    if (!predeterminedWinner) return;

    const targetRotation = calculateWinnerRotation(
      predeterminedWinner,
      gameState.segments,
    );

    setGameState((prev) => ({
      ...prev,
      phase: 'spinning',
      timeLeft: SPIN_DURATION,
      predeterminedWinner,
    }));

    return { predeterminedWinner, targetRotation };
  }, [gameState.segments, selectPredeterminedWinner, calculateWinnerRotation]);

  const completeGame = useCallback((winner: WheelSegment) => {
    setGameState((prev) => ({
      ...prev,
      phase: 'completed',
      timeLeft: 0,
      winner,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      phase: 'waiting',
      timeLeft: 0,
      segments: [],
      winner: null,
      predeterminedWinner: null,
      totalPot: 0,
      nextId: 1,
    });
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState.phase !== 'countdown' && gameState.phase !== 'spinning')
      return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        const newTimeLeft = prev.timeLeft - 1;

        if (newTimeLeft <= 0) {
          if (prev.phase === 'countdown') {
            // Timer will be handled by the component that calls startSpin
            return { ...prev, timeLeft: 0 };
          }
        }

        return {
          ...prev,
          timeLeft: Math.max(0, newTimeLeft),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.phase]);

  return {
    gameState,
    addEntry,
    startCountdown,
    startSpin,
    completeGame,
    resetGame,
  };
};
