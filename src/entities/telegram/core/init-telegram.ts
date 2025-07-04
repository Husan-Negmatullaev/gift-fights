import type { TelegramWebApps } from 'telegram-webapps';

export const initTelegram = async () => {
  const telegram = window.Telegram.WebApp as TelegramWebApps.WebApp;

  telegram.ready();
  telegram.disableVerticalSwipes();
  telegram.enableClosingConfirmation();
  if (telegram.platform === 'ios' || telegram.platform === 'android') {
    telegram.requestFullscreen();
  }
};
