import { useEffect, useState } from 'react';

interface AvatarSpriteProps {
  x: number;
  y: number;
  url: string;
  size: number;
  rotation: number;
  backgroundColor: number;
  playerName?: string;
  stageWidth?: number;
  stageHeight?: number;
}

export const AvatarSprite = (props: AvatarSpriteProps) => {
  const {
    x,
    y,
    url,
    size,
    rotation,
    backgroundColor,
    playerName,
    stageWidth = 324,
    stageHeight = 324,
  } = props;
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // console.log('🔌 AvatarSprite: загружаем изображение:', url);

    // Сбрасываем состояние при изменении URL
    setImageError(false);

    if (!url || url.trim() === '') {
      setImageError(true);
      return;
    }
  }, [url]);

  const handleImageLoad = () => {
    // console.log('🔌 AvatarSprite: изображение загружено успешно:', url);
    setImageError(false);
  };

  const handleImageError = () => {
    console.error('🔌 AvatarSprite: ошибка загрузки изображения:', url);
    setImageError(true);
  };

  // Если изображение не загрузилось, показываем fallback с инициалами
  if (imageError || !url || url.trim() === '') {
    const initials = playerName
      ? playerName.substring(0, 2).toUpperCase()
      : '?';
    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2;

    // Преобразуем координаты PIXI в HTML координаты
    const htmlX = centerX + x - size / 2;
    const htmlY = centerY + y - size / 2;

    return (
      <div
        style={{
          position: 'absolute',
          top: htmlY,
          left: htmlX,
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: `#${backgroundColor.toString(16).padStart(6, '0')}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: size * 0.4,
          fontWeight: 'bold',
          pointerEvents: 'none',
          transform: `rotate(${rotation}rad)`,
          // zIndex: 10,
        }}>
        {initials}
      </div>
    );
  }

  // Если изображение загружено, показываем его
  const centerX = stageWidth / 2;
  const centerY = stageHeight / 2;
  const htmlX = centerX + x - size / 2;
  const htmlY = centerY + y - size / 2;

  return (
    <img
      src={url}
      style={{
        position: 'absolute',
        top: htmlY,
        left: htmlX,
        width: size,
        height: size,
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: `rotate(${rotation}rad)`,
        zIndex: 10,
        objectFit: 'cover',
      }}
      onLoad={handleImageLoad}
      onError={handleImageError}
      alt={playerName || 'Avatar'}
    />
  );
};
