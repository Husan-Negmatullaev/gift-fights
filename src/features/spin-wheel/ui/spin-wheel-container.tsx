import React from 'react';
import { SpinWheel } from './spin-wheel';
import { useSpinWheel } from '../hooks/use-spin-wheel';
import { LobbyStatus, type GetLobbyQuery } from '@/shared/api/graphql/graphql';
import { useLobbyCountdownSubscription } from '../../spin-gifts/hooks/use-lobby-countdown-subscription';
import { useUserJoinedToLobbySocket } from '../../spin-gifts/hooks/use-user-joined-to-lobby-subscription';
// import { useLobbyProcessSubscription } from '../../spin-gifts/hooks/use-lobby-process-subscription';
import { useLobbyWinnerSubscription } from '../../spin-gifts/hooks/use-lobby-winner-subscription';
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
    updateGamePhase,
    updateCountdown,
    setGameStarted,
    gamePhase,
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

  // Закомментировано - запускаем фальшивый спинер сразу после countdown
  // useLobbyProcessSubscription(lobby.id, () => {
  //   console.log('Игра началась!');
  //   startGameImmediately();
  // });

  useLobbyWinnerSubscription(lobby.id, (payload) => {
    console.log('Игра закончилась!');

    handleAutoSpin(payload.payload.winnerId);

    // Обновляем кеш лобби в главной странице
    updateLobbyCache();
  });

  // console.log(
  //   lobby,
  //   segments,
  //   gamePhase,
  //   getPhaseText,
  //   hasEnoughPlayers,
  //   isSpinning,
  //   isSlowingDown,
  //   targetRotation,
  //   rotation,
  // );

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <SpinWheel
        lobby={lobby}
        segments={segments}
        gamePhase={gamePhase}
        phaseText={getPhaseText()}
        hasEnoughPlayers={hasEnoughPlayers}
        isSpinning={isSpinning || isSlowingDown}
        targetRotation={targetRotation || rotation}
      />
    </div>
  );
};
