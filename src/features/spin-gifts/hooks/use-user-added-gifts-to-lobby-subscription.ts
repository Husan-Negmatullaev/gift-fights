import { socket } from '@/shared/api/socket-io/config-socket-io';
import { useEffect } from 'react';

export interface UserAddedGiftsToLobbyPayload {
  payload: {
    lobbyId: number;
    participantId: number;
  };
}

export const useUserAddedGiftsToLobbySubscription = (
  lobbyId: number,
  onUserAddedGifts: (payload: UserAddedGiftsToLobbyPayload) => void,
) => {
  useEffect(() => {
    const handler = (payload: UserAddedGiftsToLobbyPayload) => {
      if (payload.payload.lobbyId === lobbyId) {
        onUserAddedGifts(payload);
      }
    };

    socket.on('user-added-gifts-to-lobby', handler);

    return () => {
      socket.off('user-added-gifts-to-lobby', handler);
    };
  }, [lobbyId, onUserAddedGifts]);
};
