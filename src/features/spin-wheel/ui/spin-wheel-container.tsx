import React from 'react';
import { SpinWheel } from './spin-wheel';
import { useSpinWheel } from '../hooks/use-spin-wheel';
import { LobbyStatus, type GetLobbyQuery } from '@/shared/api/graphql/graphql';
import {
  useLobbyCountdownSubscription,
  useUserJoinedToLobbySocket,
  useLobbyWinnerSubscription,
  useUserAddedGiftsToLobbySubscription,
} from '@/features/wheel';
import { useLobbyCacheUpdater } from '../hooks/use-lobby-cache-updater';

interface SpinWheelContainerProps {
  onRefetchLobby: () => void;
  lobby: GetLobbyQuery['lobby'];
  onRefreshAfterJoining: () => void;
  onSelected: (winnerId: string) => void;
}

export const SpinWheelContainer: React.FC<SpinWheelContainerProps> = ({
  lobby,
  onSelected,
  onRefetchLobby,
  onRefreshAfterJoining,
}) => {
  const {
    isSpinning,
    isSlowingDown,
    rotation,
    targetRotation,
    gameStarted,
    segments,
    hasEnoughPlayers,
    getPhaseText,
    // getPhaseLabel,
    handleAutoSpin,
    // startGame,
    updateGamePhase,
    updateCountdown,
    setGameStarted,
    gamePhase,
  } = useSpinWheel({ lobby, onSelected });

  const { updateLobbyCache } = useLobbyCacheUpdater();

  // Socket.io подписки (аналогично spin-carousel.tsx)
  useUserJoinedToLobbySocket(lobby.id, () => {
    onRefreshAfterJoining();
  });

  useLobbyCountdownSubscription(lobby.id, () => {
    console.log('🔌 SpinWheelContainer: useLobbyCountdownSubscription вызван:');

    if (gameStarted) {
      return;
    }

    updateGamePhase(LobbyStatus.Countdown);
    onRefetchLobby();
    setGameStarted(true);
    updateCountdown(lobby.timeToStart);
  });

  // useLobbyProcessSubscription(lobby.id, () => {
  //   console.log('Игра началась!');
  //   startGame();
  // });

  useLobbyWinnerSubscription(lobby.id, (payload) => {
    console.log('Игра закончилась!');

    handleAutoSpin(payload.payload.winnerId);

    updateLobbyCache();
  });

  useUserAddedGiftsToLobbySubscription(lobby.id, (payload) => {
    console.log('🎁 Пользователь добавил подарки в лобби:', payload);
    // Обновляем данные лобби после добавления подарков
    onRefetchLobby();
  });

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <SpinWheel
        lobby={lobby}
        segments={segments}
        gamePhase={gamePhase}
        phaseText={getPhaseText()}
        hasEnoughPlayers={hasEnoughPlayers}
        isSpinning={isSpinning || isSlowingDown}
        targetRotation={
          targetRotation !== undefined ? targetRotation : rotation
        }
      />
    </div>
  );
};
