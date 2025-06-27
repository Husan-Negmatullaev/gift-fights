import { useNavigate, useLocation } from 'react-router';
import { backButton } from '@telegram-apps/sdk-react';
import { useCallback, useEffect } from 'react';

export const TelegramBackHandler = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleBackButtonClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    // Проверяем, доступна ли кнопка "Назад" в Telegram Web App
    if (!backButton.isMounted()) {
      return;
    }

    // Определяем, находимся ли мы на главной странице
    // Учитываем как корневой путь, так и явный путь к главной странице
    const isRoot = pathname === '/' || pathname === '/main';

    if (isRoot) {
      backButton.hide();
      return;
    }

    // Показываем кнопку "Назад" для всех остальных страниц
    backButton.show();
    Telegram.WebApp.BackButton.show();

    Telegram.WebApp.onEvent('backButtonClicked', handleBackButtonClick);

    // Регистрируем обработчик клика
    // onBackButtonClick(handleBackButtonClick);

    // Очищаем обработчик при размонтировании
    return () => {
      Telegram.WebApp.offEvent('backButtonClicked', handleBackButtonClick);
      // offBackButtonClick(handleBackButtonClick);
    };
  }, [handleBackButtonClick, pathname]);

  return null;
};
