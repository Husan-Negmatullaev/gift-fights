import React, { useState } from 'react';

interface HtmlAvatarProps {
  src: string;
  playerName: string;
  x: number;
  y: number;
  rotation: number;
  containerSize: number;
}

export const HtmlAvatar: React.FC<HtmlAvatarProps> = ({
  src,
  playerName,
  x,
  y,
  rotation,
  containerSize,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Вычисляем позицию с учетом вращения
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;

  // Применяем вращение к координатам
  const rotatedX = Math.cos(rotation) * x - Math.sin(rotation) * y;
  const rotatedY = Math.sin(rotation) * x + Math.cos(rotation) * y;

  const finalX = centerX + rotatedX;
  const finalY = centerY + rotatedY;

  const initials = playerName ? playerName.substring(0, 2).toUpperCase() : '?';
  const hasValidSrc = src && src.trim() !== '';

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: finalX, // Исправлено позиционирование
        top: finalY, // Исправлено позиционирование
        transform: 'translate(-50%, -50%)',
      }}>
      <div className="relative w-10 h-10">
        {/* Placeholder с инициалами - показывается всегда, пока не загрузится изображение */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-slate-600 rounded-full text-white text-xs font-bold transition-opacity duration-200 ${
            hasValidSrc && imageLoaded && !imageError
              ? 'opacity-0'
              : 'opacity-100'
          }`}>
          {initials}
        </div>

        {/* Изображение аватара */}
        {hasValidSrc && (
          <img
            src={src}
            alt={playerName}
            className={`w-10 h-10 rounded-full object-cover transition-opacity duration-200 ${
              imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => {
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={() => {
              setImageLoaded(false);
              setImageError(true);
            }}
          />
        )}
      </div>
    </div>
  );
};
