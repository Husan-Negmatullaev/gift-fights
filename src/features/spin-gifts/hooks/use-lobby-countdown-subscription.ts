import { socket } from '@/shared/api/socket-io/config-socket-io';
import { useEffect } from 'react';

interface LobbyCountdownPayload {
  eventType: string;
  payload: {
    lobbyId: number;
  };
}

export const useLobbyCountdownSubscription = (
  lobbyId: number,
  onCountdown: (payload: LobbyCountdownPayload) => void,
) => {
  useEffect(() => {
    const handler = (payload: LobbyCountdownPayload) => {
      if (payload.payload.lobbyId === lobbyId) {
        onCountdown(payload);
      }
    };

    socket.on('lobby-countdown-has-begun', handler);

    return () => {
      socket.off('lobby-countdown-has-begun', handler);
    };
  }, [lobbyId, onCountdown]);
};
