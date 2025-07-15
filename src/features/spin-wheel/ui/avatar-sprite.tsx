// import { useApplication } from '@pixi/react';
import { Assets, Texture, Graphics as PixiGraphics } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

interface AvatarSpriteProps {
  x: number;
  y: number;
  url: string;
  size: number;
  rotation: number;
  backgroundColor: number;
}

export const AvatarSprite = (props: AvatarSpriteProps) => {
  const { x, y, url, size, rotation, backgroundColor } = props;
  const [texture, setTexture] = useState<Texture | null>(null);
  // const [maskId] = useState(() => Math.random().toString(36).substring(7));
  // const { app } = useApplication();
  const maskRef = useRef<PixiGraphics | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const t = await Assets.load(url);
        // const t = await Assets.load('https://avatar.iran.liara.run/public/26');
        if (!cancelled) setTexture(t as Texture);
      } catch (e) {
        console.error('Avatar load error:', e);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (!texture) return null;

  const radius = size / 2;

  const drawMask = (g: PixiGraphics) => {
    g.clear();
    g.beginFill(backgroundColor);
    g.drawCircle(0, 0, radius);
    g.endFill();
  };

  // const drawBorder = (g: PixiGraphics) => {
  //   g.clear();
  //   g.lineStyle(1, 0x000000);
  //   g.drawCircle(0, 0, radius - 1 / 2);
  //   g.endFill();
  // };

  const shadowFilter = new DropShadowFilter({
    color: 0x000000,
    alpha: 0.4,
    blur: 6,
    distance: 0,
  });

  return (
    <pixiContainer
      x={x}
      y={y}
      rotation={rotation}
      filters={[shadowFilter as any]}>
      <pixiContainer rotation={-rotation}>
        {/* <pixiGraphics draw={drawBorder} /> */}

        <pixiGraphics ref={maskRef} draw={drawMask} />

        <pixiSprite
          width={size}
          height={size}
          anchor={0.5}
          texture={texture}
          mask={maskRef.current}
        />
      </pixiContainer>
    </pixiContainer>
  );
};
