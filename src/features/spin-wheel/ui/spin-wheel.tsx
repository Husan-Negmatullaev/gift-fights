import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Application } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { AvatarSprite } from './avatar-sprite';
import { type GetLobbyQuery } from '@/shared/api/graphql/graphql';
import { Assets } from 'pixi.js';

interface WheelSegment {
  id: number;
  label: string;
  stake: number;
  color: number;
  reward: string;
  playerName: string;
  startAngle: number;
  endAngle: number;
  angle: number;
  percentage: number;
  userId: number;
  userImage?: string;
}

interface SpinWheelProps {
  radius?: number;
  isSpinning?: boolean;
  phaseText?: string;
  phaseLabel?: string;
  targetRotation?: number;
  segments: WheelSegment[];
  hasEnoughPlayers?: boolean;
  lobby: GetLobbyQuery['lobby'];
  onSpinComplete: (winnerId: string) => void;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({
  segments,
  radius = 324,
  onSpinComplete,
  isSpinning = false,
  targetRotation = 0,
  phaseText = '30 сек',
  phaseLabel = 'Начало через :',
  hasEnoughPlayers = true,
}) => {
  const sizes = 324;

  const animationRef = useRef<number | null>(null);
  const [changeSize, setChangeSize] = useState(sizes + 1);
  const [internalRotation, setInternalRotation] = useState(0);

  // Calculate segment angles based on stake formula: (stake / totalStakes) * 100
  const calculateSegmentAngles = useCallback(() => {
    if (segments.length === 0) return [];

    const totalStakes = segments.reduce(
      (sum, segment) => sum + segment.stake,
      0,
    );
    let currentAngle = 0;

    return segments.map((segment) => {
      const segmentPercentage = (segment.stake / totalStakes) * 100;
      const angle = (segmentPercentage / 100) * 2 * Math.PI;
      const startAngle = currentAngle;
      currentAngle += angle;

      return {
        ...segment,
        startAngle,
        endAngle: currentAngle,
        angle,
        percentage: segmentPercentage,
      };
    });
  }, [segments]);

  const [arrow, setArrow] = useState<PIXI.Texture | null>(null);

  useEffect(() => {
    const loadArrow = async () => {
      const arrow = await Assets.load('/assets/images/light-triangle.png');
      setArrow(arrow);
    };
    loadArrow();
  }, []);

  const segmentsWithAngles = calculateSegmentAngles();

  // Синхронизируем targetRotation с internalRotation
  useEffect(() => {
    if (!isSpinning && targetRotation !== undefined) {
      setInternalRotation(targetRotation);
    }
  }, [targetRotation, isSpinning]);

  // Animate to target rotation when spinning
  useEffect(() => {
    if (
      isSpinning &&
      targetRotation !== undefined &&
      targetRotation !== internalRotation
    ) {
      const duration = 12000; // Увеличили до 12 секунд для более плавной анимации
      const startTime = Date.now();
      const startRotation = internalRotation;
      const totalRotation = targetRotation - startRotation;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Более сложная easing функция для реалистичного замедления
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const easeOutBack =
          progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const combinedEasing = (easeOutQuart + easeOutBack) / 2;

        const currentRotation = startRotation + totalRotation * combinedEasing;

        setInternalRotation(currentRotation);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Animation completed
          // if (onSpinComplete) {
          //   setTimeout(() => {
          //     onSpinComplete();
          //   }, 1000); // Увеличили задержку до 1 секунды
          // }
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpinning, targetRotation, internalRotation, onSpinComplete]);

  const drawWheel = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Add center circle
    g.beginFill(0x273c56);
    g.lineStyle(15, 0x1d232a);
    g.drawCircle(0, 0, 75);
    g.endFill();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div style={{ position: 'relative', width: sizes, height: sizes + 20 }}>
        <Application
          antialias
          autoDensity
          width={sizes}
          height={sizes + 40}
          backgroundAlpha={0}
          resolution={window.devicePixelRatio || 1}>
          {/* Wheel */}
          <pixiContainer
            width={changeSize}
            height={changeSize}
            x={changeSize / 2}
            y={changeSize / 2 + 35}
            ref={() => setChangeSize(() => 324)}>
            <pixiContainer rotation={internalRotation}>
              {/* Draw segments using WedgeIcon */}
              {segmentsWithAngles.length === 0 || !hasEnoughPlayers
                ? // Empty wheel or not enough players
                  (() => {
                    return (
                      <pixiGraphics
                        draw={(g: PIXI.Graphics) => {
                          g.clear();
                          g.fill(0x374151);
                          g.setStrokeStyle({
                            width: 3,
                            color: 0x6b7280,
                          });
                          g.circle(0, 0, radius);
                          g.fill();
                        }}
                      />
                    );
                  })()
                : (() => {
                    return segmentsWithAngles.map((segment) => {
                      const startAngleDeg =
                        (segment.startAngle * 180) / Math.PI;
                      const endAngleDeg = (segment.endAngle * 180) / Math.PI;

                      return (
                        <WedgeIcon
                          x={0}
                          y={0}
                          key={segment.id}
                          innerRadius={25}
                          color={0x2d353f}
                          outerRadius={radius}
                          endAngle={endAngleDeg}
                          startAngle={startAngleDeg}
                        />
                      );
                    });
                  })()}
            </pixiContainer>

            {/* Center circle */}
            <pixiContainer>
              <pixiGraphics draw={drawWheel} />
              <pixiText
                x={0}
                y={-20}
                anchor={0.5}
                text={phaseLabel}
                style={
                  new PIXI.TextStyle({
                    fontSize: 12,
                    fill: 0xffffff,
                    fontWeight: '500',
                  })
                }
              />
              <pixiText
                x={0}
                y={15}
                anchor={0.5}
                text={phaseText}
                style={
                  new PIXI.TextStyle({
                    fontSize: 24,
                    fill: 0xffffff,
                    fontWeight: '500',
                  })
                }
              />
            </pixiContainer>
          </pixiContainer>
          {/* Arrow */}
          <pixiContainer x={radius / 2 + 35} y={0}>
            {/* <pixiGraphics draw={drawArrow} /> */}
            {arrow && <pixiSprite texture={arrow} />}
          </pixiContainer>
        </Application>

        {/* HTML Avatars overlay */}
        {segmentsWithAngles.map((segment) => {
          const midAngle = (segment.startAngle + segment.endAngle) / 2;
          const labelRadius = radius * 0.65;

          // Применяем вращение колеса к координатам аватаров
          const rotatedAngle = midAngle + (internalRotation * Math.PI) / 180;
          const x = Math.cos(rotatedAngle) * labelRadius;
          const y = Math.sin(rotatedAngle) * labelRadius;

          return (
            <AvatarSprite
              key={segment.id}
              x={x}
              y={y}
              size={40}
              stageWidth={sizes}
              rotation={rotatedAngle}
              stageHeight={sizes + 20}
              backgroundColor={0x2d353f}
              url={segment.userImage || ''}
              playerName={segment.playerName}
            />
          );
        })}
      </div>
    </div>
  );
};

interface AnnularSectorProps {
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  color?: number;
  x?: number;
  y?: number;
}

const WedgeIcon = ({
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  color = 0xff9900,
  x = 0,
  y = 0,
}: AnnularSectorProps) => {
  const toRadians = (deg: number) => (deg * Math.PI) / 180;

  const draw = (g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(color);

    const sa = toRadians(startAngle);
    const ea = toRadians(endAngle);
    const cx = x;
    const cy = y;

    g.moveTo(cx + Math.cos(sa) * outerRadius, cy + Math.sin(sa) * outerRadius);
    g.arc(cx, cy, outerRadius, sa, ea);
    g.lineTo(cx + Math.cos(ea) * innerRadius, cy + Math.sin(ea) * innerRadius);
    g.arc(cx, cy, innerRadius, ea, sa, true);
    g.closePath();

    g.endFill();
  };

  return <pixiGraphics draw={draw} />;
};
