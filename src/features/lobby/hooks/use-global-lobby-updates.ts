import { socket } from '@/shared/api/socket-io/config-socket-io';
import { useEffect } from 'react';

interface LobbyUpdatePayload {
  payload: {
    lobbyId: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export const useGlobalLobbyUpdates = (
  onUpdate: (event: string, payload: LobbyUpdatePayload) => void,
) => {
  useEffect(() => {
    // События, которые требуют обновления кеша лобби
    const lobbyEvents = [
      'lobby-winner-found',
      'lobby-countdown-has-begun',
      'lobby-process-of-finding-winner-has-begun',
      'user-joined-to-lobby',
    ];

    const handlers: Array<{
      event: string;
      handler: (payload: LobbyUpdatePayload) => void;
    }> = [];

    lobbyEvents.forEach((event) => {
      const handler = (payload: LobbyUpdatePayload) => {
        onUpdate(event, payload);
      };

      socket.on(event, handler);
      handlers.push({ event, handler });
    });

    return () => {
      handlers.forEach(({ event, handler }) => {
        socket.off(event, handler);
      });
    };
  }, [onUpdate]);
};
