import { socket } from '@/shared/api/socket-io/config-socket-io';
import { useEffect } from 'react';

interface LobbyProcessPayload {
  lobbyId: number;
  [key: string]: unknown;
}

export const useLobbyProcessSubscription = (
  lobbyId: number,
  onProcess: (payload: LobbyProcessPayload) => void,
) => {
  useEffect(() => {
    const handler = (payload: LobbyProcessPayload) => {
      if (payload.lobbyId === lobbyId) {
        onProcess(payload);
      }
    };

    socket.on('lobby-process-of-finding-winner-has-begun', handler);

    return () => {
      socket.off('lobby-process-of-finding-winner-has-begun', handler);
    };
  }, [lobbyId, onProcess]);
};
