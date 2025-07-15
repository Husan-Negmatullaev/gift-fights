// // import { useApplication } from '@pixi/react';
// import { Assets, Texture, Graphics as PixiGraphics } from 'pixi.js';
// import { useEffect, useRef, useState } from 'react';

import { useEffect, useState } from 'react';

// interface AvatarSpriteProps {
//   x: number;
//   y: number;
//   url: string;
//   size: number;
//   rotation: number;
//   backgroundColor: number;
// }

// // const blur = new BlurFilter(4);
// // const shadow = new PIXI.Graphics();
// // shadow.beginFill(0x000000, 0.5);
// // shadow.drawRect(0, 0, width, height);
// // shadow.endFill();
// // shadow.filters = [blur];
// // shadow.position.set(5, 5);

// export const AvatarSprite = (props: AvatarSpriteProps) => {
//   const { x, y, url, size, rotation, backgroundColor } = props;
//   // const [texture, setTexture] = useState<Texture | null>(null);
//   // const [maskId] = useState(() => Math.random().toString(36).substring(7));
//   // const { app } = useApplication();
//   const maskRef = useRef<PixiGraphics | null>(null);

//   // useEffect(() => {
//   //   let cancelled = false;
//   //   const load = async () => {
//   //     console.log('🔌 AvatarSprite: загружаем изображение:', url);
//   //     try {
//   //       const t = await Assets.load(url);
//   //       console.log('🔌 AvatarSprite: изображение загружено успешно:', url);
//   //       if (!cancelled) setTexture(t as Texture);
//   //     } catch (e) {
//   //       console.error('🔌 AvatarSprite: ошибка загрузки изображения:', url, e);
//   //     }
//   //   };
//   //   load();
//   //   return () => {
//   //     cancelled = true;
//   //   };
//   // }, [url]);

//   // if (!texture) {
//   //   console.log(
//   //     '🔌 AvatarSprite: текстура не загружена, пропускаем рендер:',
//   //     url,
//   //   );
//   //   return null;
//   // }

//   console.log('🔌 AvatarSprite: рендерим аватар:', { url, x, y, size });

//   const radius = size / 2;

//   const drawMask = (g: PixiGraphics) => {
//     g.clear();
//     g.beginFill(backgroundColor);
//     g.drawCircle(0, 0, radius);
//     g.endFill();
//   };

//   // const drawBorder = (g: PixiGraphics) => {
//   //   g.clear();
//   //   g.lineStyle(1, 0x000000);
//   //   g.drawCircle(0, 0, radius - 1 / 2);
//   //   g.endFill();
//   // };

//   // const shadowFilter = new DropShadowFilter({
//   //   distance: 4,
//   //   blur: 6,
//   //   alpha: 0.5,
//   //   color: 0x000000,
//   //   rotation: 45,
//   // });

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//       <pixiContainer x={x} y={y} rotation={rotation}>
//         <pixiContainer rotation={-rotation}>
//           {/* <pixiGraphics draw={drawBorder} /> */}

//           <pixiGraphics ref={maskRef} draw={drawMask} />

//           <pixiSprite
//             width={size}
//             height={size}
//             anchor={0.5}
//             // texture={texture}
//             mask={maskRef.current}
//           />
//           <img
//             src={url}
//             style={{
//               // position: 'absolute',
//               // top: htmlY,
//               // left: htmlX,
//               width: size,
//               height: size,
//               borderRadius: '50%',
//               pointerEvents: 'none',
//               transform: `rotate(${rotation}rad)`,
//               zIndex: 10,
//               objectFit: 'cover',
//             }}
//             // onLoad={handleImageLoad}
//             // onError={handleImageError}
//             // alt={playerName || 'Avatar'}
//           />
//         </pixiContainer>
//       </pixiContainer>

//       <img
//         src={url}
//         style={{
//           position: 'absolute',
//           top: y,
//           left: x,
//           width: size,
//           height: size,
//           borderRadius: '50%',
//           pointerEvents: 'none',
//         }}
//       />
//     </div>
//   );

//   // return (
//   //   <pixiContainer x={x} y={y} rotation={rotation}>
//   //     <pixiContainer rotation={-rotation}>
//   //       {/* <pixiGraphics draw={drawBorder} /> */}

//   //       <pixiGraphics ref={maskRef} draw={drawMask} />

//   //       <pixiSprite
//   //         width={size}
//   //         height={size}
//   //         anchor={0.5}
//   //         // texture={texture}
//   //         mask={maskRef.current}
//   //       />
//   //       <img
//   //         src={url}
//   //         style={{
//   //           // position: 'absolute',
//   //           // top: htmlY,
//   //           // left: htmlX,
//   //           width: size,
//   //           height: size,
//   //           borderRadius: '50%',
//   //           pointerEvents: 'none',
//   //           transform: `rotate(${rotation}rad)`,
//   //           zIndex: 10,
//   //           objectFit: 'cover',
//   //         }}
//   //         // onLoad={handleImageLoad}
//   //         // onError={handleImageError}
//   //         // alt={playerName || 'Avatar'}
//   //       />
//   //     </pixiContainer>
//   //   </pixiContainer>
//   // );
// };

// import React, { useState, useEffect } from 'react';

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
    stageHeight = 344,
  } = props;
  const [_imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // console.log('🔌 AvatarSprite: загружаем изображение:', url);

    // Сбрасываем состояние при изменении URL
    setImageLoaded(false);
    setImageError(false);

    if (!url || url.trim() === '') {
      setImageError(true);
      return;
    }
  }, [url]);

  const handleImageLoad = () => {
    // console.log('🔌 AvatarSprite: изображение загружено успешно:', url);
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    console.error('🔌 AvatarSprite: ошибка загрузки изображения:', url);
    setImageError(true);
    setImageLoaded(false);
  };

  // Если изображение не загрузилось, показываем fallback с инициалами
  if (imageError || !url || url.trim() === '') {
    const initials = playerName
      ? playerName.substring(0, 2).toUpperCase()
      : '?';
    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2;

    // Преобразуем координаты PIXI в HTML координаты (учитываем смещение Application)
    const htmlX = centerX + x - size / 2;
    const htmlY = centerY + y - size / 2 + 20; // +20 для учета смещения Application

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

  // Если изображение загружается, показываем placeholder
  // if (!imageLoaded) {
  //   const centerX = stageWidth / 2;
  //   const centerY = stageHeight / 2;
  //   const htmlX = centerX + x - size / 2;
  //   const htmlY = centerY + y - size / 2 + 20; // +20 для учета смещения Application

  //   return (
  //     <div
  //       style={{
  //         position: 'absolute',
  //         top: htmlY,
  //         left: htmlX,
  //         width: size,
  //         height: size,
  //         borderRadius: '50%',
  //         backgroundColor: `#${backgroundColor.toString(16).padStart(6, '0')}`,
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         color: '#ffffff',
  //         fontSize: size * 0.3,
  //         fontWeight: 'bold',
  //         pointerEvents: 'none',
  //         transform: `rotate(${rotation}rad)`,
  //         zIndex: 10,
  //       }}>
  //       ...
  //     </div>
  //   );
  // }

  // Если изображение загружено, показываем его
  const centerX = stageWidth / 2;
  const centerY = stageHeight / 2;
  const htmlX = centerX + x - size / 2;
  const htmlY = centerY + y - size / 2 + 20; // +20 для учета смещения Application

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
