import { useLobbyNotifications } from './use-lobby-notifications';

// Пример использования хука для прослушивания всех событий лобби
export const useLobbyNotificationsExample = (lobbyId: number) => {
  useLobbyNotifications(lobbyId, {
    onUserJoined: (payload) => {
      console.log('Пользователь присоединился к лобби:', payload);
      // Здесь можно обновить UI, показать уведомление и т.д.
    },

    onCountdown: (payload) => {
      console.log('Начался обратный отсчет:', payload);
      // Здесь можно запустить таймер, обновить UI и т.д.
    },

    onProcess: (payload) => {
      console.log('Начался процесс поиска победителя:', payload);
      // Здесь можно показать анимацию, заблокировать UI и т.д.
    },

    onWinner: (payload) => {
      console.log('Победитель найден:', payload.winnerId);
      // Здесь можно показать результат, обновить UI и т.д.
    },
  });
};
