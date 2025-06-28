import type { TelegramWebApps } from 'telegram-webapps';

export const useTelegram = () => {
  const telegram = window.Telegram.WebApp as TelegramWebApps.WebApp;

  return telegram;
};
