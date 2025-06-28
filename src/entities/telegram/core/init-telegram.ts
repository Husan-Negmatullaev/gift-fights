import {
  backButton,
  closingBehavior,
  disableVerticalSwipes,
  enableClosingConfirmation,
  expandViewport,
  init,
  miniApp,
  swipeBehavior,
  requestFullscreen,
  isFullscreen,
  viewport,
} from '@telegram-apps/sdk-react';
import type { TelegramWebApps } from 'telegram-webapps';

// import { requestFullscreen, isFullscreen } from '@telegram-apps/sdk';

export const initTelegram = async () => {
  // if (!import.meta.env.PROD) return;

  const telegram = window.Telegram.WebApp as TelegramWebApps.WebApp;

  // init();
  // viewport.mount();
  // expandViewport();
  // backButton.mount();
  // closingBehavior.mount();

  // // if(telegram.platform === 'ios' || telegram.platform === 'android') {
  // // }

  // enableClosingConfirmation();

  // if (swipeBehavior.isSupported()) {
  //   swipeBehavior.mount();
  //   disableVerticalSwipes();
  //   swipeBehavior.disableVertical();
  // }

  // miniApp.ready();

  // if (requestFullscreen.isAvailable()) {
  //   await requestFullscreen();
  //   isFullscreen(); // true
  // }
  // viewport.requestFullscreen();
  // requestFullscreen();

  telegram.ready();
  telegram.disableVerticalSwipes();
  telegram.enableClosingConfirmation();
  if (telegram.platform === 'ios' || telegram.platform === 'android') {
    telegram.requestFullscreen();
  }
};
