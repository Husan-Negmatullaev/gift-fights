import { useCallback, useState } from 'react';

// Проверка на наличие Telegram WebApp API
function isTelegramWebApp() {
  return typeof window !== 'undefined' && !!window.Telegram?.WebApp;
}

// Проверка на поддержку вибрации
function canVibrate() {
  return (
    typeof window !== 'undefined' &&
    'vibrate' in window.navigator &&
    typeof window.navigator.vibrate === 'function'
  );
}

export const useCopy = () => {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async (text: string) => {
    try {
      // Копируем в буфер обмена
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Вибрация через Telegram WebApp
      if (isTelegramWebApp() && window.Telegram.WebApp.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
      } else if (canVibrate()) {
        // Fallback: обычная вибрация для браузера
        window.navigator.vibrate(100);
      }
    } catch (e) {
      setCopied(false);
    } finally {
      setTimeout(() => setCopied(false), 1200);
    }
  }, []);

  return { onCopy, copied };
};
