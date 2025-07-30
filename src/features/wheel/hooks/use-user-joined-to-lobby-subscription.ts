import { socket } from '@/shared/api/socket-io/config-socket-io';
import { useEffect } from 'react';

interface UserJoinedPayload {
  eventType: string;
  payload: {
    lobbyId: number;
  };
}

export const useUserJoinedToLobbySocket = (
  lobbyId: number,
  onJoin: (payload: UserJoinedPayload) => void,
) => {
  useEffect(() => {
    const handler = (payload: UserJoinedPayload) => {
      if (payload.payload.lobbyId === lobbyId) {
        onJoin(payload);
      }
    };

    socket.on('user-joined-to-lobby', handler);

    return () => {
      socket.off('user-joined-to-lobby', handler);
    };
  }, [lobbyId, onJoin]);
};
