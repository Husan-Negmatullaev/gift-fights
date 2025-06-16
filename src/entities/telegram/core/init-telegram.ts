export const initTelegram = () => {
  if (!import.meta.env.PROD) return;

  window.Telegram.WebApp.ready();
};
