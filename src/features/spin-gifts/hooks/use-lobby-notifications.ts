import { socket } from '@/shared/api/socket-io/config-socket-io';
import { useEffect } from 'react';
import { NotificationType } from '@/shared/constants/notification-types';

interface LobbyNotificationPayload {
  lobbyId: number;
  [key: string]: unknown;
}

interface LobbyWinnerPayload extends LobbyNotificationPayload {
  winnerId: string | number;
}

interface LobbyNotificationsCallbacks {
  onUserJoined?: (payload: LobbyNotificationPayload) => void;
  onCountdown?: (payload: LobbyNotificationPayload) => void;
  onProcess?: (payload: LobbyNotificationPayload) => void;
  onWinner?: (payload: LobbyWinnerPayload) => void;
}

export const useLobbyNotifications = (
  lobbyId: number,
  callbacks: LobbyNotificationsCallbacks,
) => {
  useEffect(() => {
    const handlers: Array<{
      event: string;
      handler: (payload: unknown) => void;
    }> = [];

    // Подписка на присоединение пользователя
    if (callbacks.onUserJoined) {
      const handler = (payload: unknown) => {
        const typedPayload = payload as LobbyNotificationPayload;
        if (typedPayload.lobbyId === lobbyId) {
          callbacks.onUserJoined!(typedPayload);
        }
      };
      socket.on(NotificationType.UserJoinedToLobby, handler);
      handlers.push({ event: NotificationType.UserJoinedToLobby, handler });
    }

    // Подписка на начало обратного отсчета
    if (callbacks.onCountdown) {
      const handler = (payload: unknown) => {
        const typedPayload = payload as LobbyNotificationPayload;
        if (typedPayload.lobbyId === lobbyId) {
          callbacks.onCountdown!(typedPayload);
        }
      };
      socket.on(NotificationType.LobbyCountdownHasBegun, handler);
      handlers.push({
        event: NotificationType.LobbyCountdownHasBegun,
        handler,
      });
    }

    // Подписка на начало процесса поиска победителя
    if (callbacks.onProcess) {
      const handler = (payload: unknown) => {
        const typedPayload = payload as LobbyNotificationPayload;
        if (typedPayload.lobbyId === lobbyId) {
          callbacks.onProcess!(typedPayload);
        }
      };
      socket.on(NotificationType.LobbyProcessOfFindingWinnerHasBegun, handler);
      handlers.push({
        event: NotificationType.LobbyProcessOfFindingWinnerHasBegun,
        handler,
      });
    }

    // Подписка на нахождение победителя
    if (callbacks.onWinner) {
      const handler = (payload: unknown) => {
        const typedPayload = payload as LobbyWinnerPayload;
        if (typedPayload.lobbyId === lobbyId) {
          callbacks.onWinner!(typedPayload);
        }
      };
      socket.on(NotificationType.LobbyWinnerFound, handler);
      handlers.push({ event: NotificationType.LobbyWinnerFound, handler });
    }

    // Очистка всех подписок
    return () => {
      handlers.forEach(({ event, handler }) => {
        socket.off(event, handler);
      });
    };
  }, [lobbyId, callbacks]);
};
