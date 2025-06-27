import {
  backButton,
  closingBehavior,
  enableClosingConfirmation,
  expandViewport,
  init,
  miniApp,
  swipeBehavior,
} from '@telegram-apps/sdk-react';

export const initTelegram = () => {
  // if (!import.meta.env.PROD) return;

  init();
  expandViewport();
  backButton.mount();
  closingBehavior.mount();

  enableClosingConfirmation();

  if (swipeBehavior.isSupported()) {
    swipeBehavior.mount();
    swipeBehavior.disableVertical();
  }

  miniApp.ready();
};
