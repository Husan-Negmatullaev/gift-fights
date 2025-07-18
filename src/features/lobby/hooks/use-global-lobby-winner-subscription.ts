import { socket } from '@/shared/api/socket-io/config-socket-io';
import { useEffect } from 'react';

interface LobbyWinnerPayload {
  payload: {
    lobbyId: number;
    winnerId: string;
  };
  [key: string]: unknown;
}

export const useGlobalLobbyWinnerSubscription = (
  onWinner: (payload: LobbyWinnerPayload) => void,
) => {
  useEffect(() => {
    const handler = (payload: LobbyWinnerPayload) => {
      onWinner(payload);
    };

    socket.on('lobby-winner-found', handler);

    return () => {
      socket.off('lobby-winner-found', handler);
    };
  }, [onWinner]);
};
