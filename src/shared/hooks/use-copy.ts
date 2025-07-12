import { useCallback, useState } from 'react';
import { useToast } from './use-toast';

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
  const { showSuccess, showError } = useToast();

  const onCopy = useCallback(
    async (text: string) => {
      try {
        // Копируем в буфер обмена
        await navigator.clipboard.writeText(text);
        setCopied(true);

        // Показываем toast уведомление
        showSuccess('Ссылка скопирована!');

        // Вибрация через Telegram WebApp
        if (isTelegramWebApp() && window.Telegram.WebApp.HapticFeedback) {
          window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        } else if (canVibrate()) {
          // Fallback: обычная вибрация для браузера
          window.navigator.vibrate(100);
        }
      } catch (error) {
        setCopied(false);
        showError('Ошибка при копировании');
        console.error('Ошибка копирования:', error);
      } finally {
        setTimeout(() => setCopied(false), 1200);
      }
    },
    [showSuccess, showError],
  );

  return { onCopy, copied };
};
