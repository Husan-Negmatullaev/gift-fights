import { socket } from '@/shared/api/socket-io/config-socket-io';
import { useEffect } from 'react';

export const useUserJoinedToLobbySocket = (
  lobbyId: number,
  onJoin: (payload: any) => void,
) => {
  useEffect(() => {
    const handler = (payload: any) => {
      if (payload.lobbyId === lobbyId) {
        onJoin(payload);
      }
    };

    socket.on('user-joined-to-lobby', handler);

    return () => {
      socket.off('user-joined-to-lobby', handler);
    };
  }, [lobbyId, onJoin]);
};
