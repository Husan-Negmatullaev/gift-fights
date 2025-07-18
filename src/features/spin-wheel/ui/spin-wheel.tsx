import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Application } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { type GetLobbyQuery } from '@/shared/api/graphql/graphql';
import { Icons } from '@/shared/ui/icons/icons';
import { HtmlAvatar } from './components/html-avatar';

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
  isSpinning?: boolean;
  phaseText?: string;
  phaseLabel?: string;
  targetRotation?: number;
  segments: WheelSegment[];
  hasEnoughPlayers?: boolean;
  lobby: GetLobbyQuery['lobby'];
}

export const SpinWheel: React.FC<SpinWheelProps> = ({
  segments,
  isSpinning = false,
  targetRotation = 0,
  phaseText = '60 сек',
  phaseLabel = 'Начало через :',
  hasEnoughPlayers = true,
}) => {
  const radius = 162;
  const sizes = 324;

  const animationRef = useRef<number | null>(null);
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

  // Удаляем логику загрузки текстур - теперь используем HTML img элементы

  const segmentsWithAngles = calculateSegmentAngles();

  // Синхронизируем targetRotation с internalRotation
  useEffect(() => {
    if (!isSpinning && targetRotation !== undefined) {
      setInternalRotation(targetRotation);
    }
  }, [targetRotation, isSpinning]);

  // Animate to target rotation when spinning (только для финальной анимации)
  useEffect(() => {
    if (
      isSpinning &&
      targetRotation !== undefined &&
      targetRotation !== internalRotation
    ) {
      const duration = 1000; // 1 секунда для финальной анимации
      const startTime = Date.now();
      const startRotation = internalRotation;
      const totalRotation = targetRotation - startRotation;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Очень мягкая easing функция для финальной остановки
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentRotation = startRotation + totalRotation * easeOutQuart;

        setInternalRotation(currentRotation);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
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
  }, [isSpinning, targetRotation, internalRotation]);

  const drawWheel = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Add center circle
    g.beginFill(0x273c56);
    g.lineStyle(15, 0x1d232a);
    g.drawCircle(0, 0, 70);
    g.endFill();
  }, []);

  // Удаляем drawAvatar - теперь используем HTML аватары

  return (
    <div className="flex flex-col items-center">
      <div className="relative pointer-events-none">
        <Application
          antialias
          autoDensity
          width={sizes}
          height={sizes}
          backgroundAlpha={0}
          resolution={window.devicePixelRatio || 1}
          className={`${!hasEnoughPlayers ? 'opacity-60' : ''}`}>
          {/* Wheel */}
          <pixiContainer x={sizes / 2} y={sizes / 2}>
            <pixiContainer rotation={internalRotation}>
              {segmentsWithAngles.length === 0 || !hasEnoughPlayers ? (
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
              ) : (
                segmentsWithAngles.map((segment) => {
                  const startAngleDeg = (segment.startAngle * 180) / Math.PI;
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
                })
              )}

              {/* Аватары теперь рендерятся как HTML элементы поверх canvas */}
            </pixiContainer>

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
                    fontSize: 20,
                    fill: 0xffffff,
                    fontWeight: '500',
                  })
                }
              />
            </pixiContainer>
          </pixiContainer>
        </Application>

        {/* HTML аватары поверх canvas */}
        {segmentsWithAngles.map((segment) => {
          const midAngle = (segment.startAngle + segment.endAngle) / 2;
          // Размещаем аватары в серой области между внутренним кругом (70) и внешним краем (162)
          const labelRadius = radius * 0.75; // 121px - посередине между 70 и 162

          // Координаты аватаров
          const x = Math.cos(midAngle) * labelRadius;
          const y = Math.sin(midAngle) * labelRadius;

          return (
            <HtmlAvatar
              x={x}
              y={y}
              key={`html-avatar-${segment.id}`}
              src={segment.userImage || ''}
              playerName={segment.playerName}
              rotation={internalRotation}
              containerSize={sizes}
            />
          );
        })}

        <Icons
          name="spin-arrow-bottom"
          className="absolute -top-8 left-1/2 -translate-x-1/2"
        />
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
  x = 0,
  y = 0,
  endAngle,
  startAngle,
  innerRadius,
  outerRadius,
  color = 0xff9900,
}: AnnularSectorProps) => {
  const toRadians = (deg: number) => (deg * Math.PI) / 180;

  const draw = (g: PIXI.Graphics) => {
    g.clear();

    const sa = toRadians(startAngle);
    const ea = toRadians(endAngle);
    const cx = x;
    const cy = y;

    // Рисуем заливку сегмента
    g.beginFill(color);
    g.moveTo(cx + Math.cos(sa) * outerRadius, cy + Math.sin(sa) * outerRadius);
    g.arc(cx, cy, outerRadius, sa, ea);
    g.lineTo(cx + Math.cos(ea) * innerRadius, cy + Math.sin(ea) * innerRadius);
    g.arc(cx, cy, innerRadius, ea, sa, true);
    g.closePath();
    g.endFill();

    // Рисуем границы сегмента
    g.lineStyle(2, 0x4a5568, 0.8); // Граница с прозрачностью

    // Внешняя дуга
    g.moveTo(cx + Math.cos(sa) * outerRadius, cy + Math.sin(sa) * outerRadius);
    g.arc(cx, cy, outerRadius, sa, ea);

    // Внутренняя дуга
    g.moveTo(cx + Math.cos(sa) * innerRadius, cy + Math.sin(sa) * innerRadius);
    g.arc(cx, cy, innerRadius, sa, ea);

    // Радиальные линии (границы сегментов)
    g.moveTo(cx + Math.cos(sa) * outerRadius, cy + Math.sin(sa) * outerRadius);
    g.lineTo(cx + Math.cos(sa) * innerRadius, cy + Math.sin(sa) * innerRadius);

    g.moveTo(cx + Math.cos(ea) * outerRadius, cy + Math.sin(ea) * outerRadius);
    g.lineTo(cx + Math.cos(ea) * innerRadius, cy + Math.sin(ea) * innerRadius);
  };

  return <pixiGraphics draw={draw} />;
};
