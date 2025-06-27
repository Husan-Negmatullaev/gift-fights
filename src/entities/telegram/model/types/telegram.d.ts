import type { WebApp } from "@telegram-apps/types";

declare global {
  interface Window {
    Telegram: {
      WebApp: WebApp;
    };
  }
}
