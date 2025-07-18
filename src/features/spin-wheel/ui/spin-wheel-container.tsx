import React from 'react';
import { SpinWheel } from './spin-wheel';
import { useSpinWheel } from '../hooks/use-spin-wheel';
import { LobbyStatus, type GetLobbyQuery } from '@/shared/api/graphql/graphql';
import { useLobbyCountdownSubscription } from '../../spin-gifts/hooks/use-lobby-countdown-subscription';
import { useUserJoinedToLobbySocket } from '../../spin-gifts/hooks/use-user-joined-to-lobby-subscription';
import { useLobbyProcessSubscription } from '../../spin-gifts/hooks/use-lobby-process-subscription';
import { useLobbyWinnerSubscription } from '../../spin-gifts/hooks/use-lobby-winner-subscription';
import { useLobbyCacheUpdater } from '../hooks/use-lobby-cache-updater';

interface SpinWheelContainerProps {
  lobby: GetLobbyQuery['lobby'];
  onSelected: (winnerId: string) => void;
  onRefetchLobby: () => void;
  onRefreshAfterJoining: () => void;
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
    getPhaseLabel,
    handleAutoSpin,
    startGame,
    updateGamePhase,
    updateCountdown,
    setGameStarted,
  } = useSpinWheel({ lobby, onSelected });

  const { updateLobbyCache } = useLobbyCacheUpdater();

  // Socket.io подписки (аналогично spin-carousel.tsx)
  useUserJoinedToLobbySocket(lobby.id, (payload) => {
    console.log('Кто-то присоединился к лобби!', payload);
    onRefreshAfterJoining();
  });

  useLobbyCountdownSubscription(lobby.id, (payload) => {
    console.log(
      '🔌 SpinWheelContainer: useLobbyCountdownSubscription вызван:',
      {
        payload,
        gameStarted,
        lobbyTimeToStart: lobby.timeToStart,
      },
    );

    if (gameStarted) {
      return;
    }

    updateGamePhase(LobbyStatus.Countdown);
    onRefetchLobby();
    setGameStarted(true);
    updateCountdown(lobby.timeToStart);
  });

  useLobbyProcessSubscription(lobby.id, () => {
    console.log('Игра началась!');
    startGame();
  });

  useLobbyWinnerSubscription(lobby.id, (payload) => {
    console.log('Игра закончилась!');

    handleAutoSpin(payload.payload.winnerId);

    // Обновляем кеш лобби в главной странице
    updateLobbyCache();
  });

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* <div className="flex flex-col items-center"> */}
      <SpinWheel
        segments={segments}
        isSpinning={isSpinning || isSlowingDown}
        targetRotation={targetRotation || rotation}
        lobby={lobby}
        phaseText={getPhaseText()}
        phaseLabel={getPhaseLabel()}
        hasEnoughPlayers={hasEnoughPlayers}
      />
      {/* </div> */}
    </div>
  );
};
