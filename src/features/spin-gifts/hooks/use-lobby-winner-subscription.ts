import { socket } from '@/shared/api/socket-io/config-socket-io';
import { useEffect } from 'react';

interface LobbyWinnerPayload {
  payload: {
    lobbyId: number;
    winnerId: string;
  };
  [key: string]: unknown;
}

export const useLobbyWinnerSubscription = (
  lobbyId: number,
  onWinner: (payload: LobbyWinnerPayload) => void,
) => {
  useEffect(() => {
    const handler = (payload: LobbyWinnerPayload) => {
      console.log('🔄 useLobbyWinnerSubscription payload', payload);
      if (payload.payload.lobbyId === lobbyId) {
        onWinner(payload);
      }
    };

    socket.on('lobby-winner-found', handler);

    return () => {
      socket.off('lobby-winner-found', handler);
    };
  }, [lobbyId, onWinner]);
};
