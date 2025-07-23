import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Application } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { LobbyStatus, type GetLobbyQuery } from '@/shared/api/graphql/graphql';
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
  phaseText?: string;
  isSpinning?: boolean;
  gamePhase: LobbyStatus;
  targetRotation?: number;
  segments: WheelSegment[];
  hasEnoughPlayers?: boolean;
  lobby: GetLobbyQuery['lobby'];
}

// Функция для форматирования времени в формат "00:XX"
const formatTimer = (text: string): string => {
  // Ищем число в тексте (например, "60 сек" -> "60")
  const match = text.match(/(\d+)/);
  if (match) {
    const seconds = parseInt(match[1], 10);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }

  // Если текст "Ищем победителя" или подобный, показываем "00:00"
  if (
    text.includes('победител') ||
    text.includes('Ищем') ||
    text === 'Выиграл'
  ) {
    return '00:00';
  }

  // Если это уже в формате времени, возвращаем как есть
  if (text.match(/^\d{2}:\d{2}$/)) {
    return text;
  }

  // Для всех остальных случаев возвращаем "00:00"
  return '00:00';
};

export const SpinWheel: React.FC<SpinWheelProps> = (props: SpinWheelProps) => {
  const {
    segments,
    gamePhase,
    isSpinning = false,
    targetRotation = 0,
    phaseText = '60 сек',
    hasEnoughPlayers = true,
  } = props;

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

    // Add center ring (кольцо с отверстием)
    const centerOuterRadius = 70;
    const centerInnerRadius = 35; // Половина от внешнего радиуса

    g.beginFill(0x10151a, 0);

    // Рисуем кольцо через построение пути
    const segments = 32;

    // Внешний контур
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * centerOuterRadius;
      const y = Math.sin(angle) * centerOuterRadius;

      if (i === 0) {
        g.moveTo(x, y);
      } else {
        g.lineTo(x, y);
      }
    }

    // Внутренний контур (в обратном направлении для создания отверстия)
    for (let i = segments; i >= 0; i--) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * centerInnerRadius;
      const y = Math.sin(angle) * centerInnerRadius;
      g.lineTo(x, y);
    }

    g.closePath();
    g.endFill();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative pointer-events-none">
        <Application
          antialias
          autoDensity
          width={sizes}
          height={sizes}
          backgroundAlpha={0}
          resolution={window.devicePixelRatio || 1}>
          <pixiContainer x={sizes / 2} y={sizes / 2}>
            <pixiContainer rotation={internalRotation}>
              {segmentsWithAngles.length === 0 || !hasEnoughPlayers ? (
                <pixiGraphics
                  draw={(g: PIXI.Graphics) => {
                    g.clear();

                    const outerRadius = radius;
                    const innerRadius = radius / 2;

                    // Рисуем кольцо через построение пути
                    g.beginFill(0xffffff, 0.1);

                    // Строим путь для кольца
                    const segments = 32;

                    // Внешний контур
                    for (let i = 0; i <= segments; i++) {
                      const angle = (i / segments) * Math.PI * 2;
                      const x = Math.cos(angle) * outerRadius;
                      const y = Math.sin(angle) * outerRadius;

                      if (i === 0) {
                        g.moveTo(x, y);
                      } else {
                        g.lineTo(x, y);
                      }
                    }

                    // Внутренний контур (в обратном направлении для создания отверстия)
                    for (let i = segments; i >= 0; i--) {
                      const angle = (i / segments) * Math.PI * 2;
                      const x = Math.cos(angle) * innerRadius;
                      const y = Math.sin(angle) * innerRadius;
                      g.lineTo(x, y);
                    }

                    g.closePath();
                    g.endFill();
                  }}
                />
              ) : (
                segmentsWithAngles.map((segment, index) => {
                  const startAngleDeg = (segment.startAngle * 180) / Math.PI;
                  const endAngleDeg = (segment.endAngle * 180) / Math.PI;

                  // Массив цветов для сегментов

                  const segmentColor =
                    segmentColors[index % segmentColors.length];

                  return (
                    <pixiContainer key={segment.id}>
                      {/* Тень сегмента */}
                      <WedgeIcon
                        x={2}
                        y={2}
                        innerRadius={70}
                        color={segmentColor}
                        outerRadius={radius}
                        endAngle={endAngleDeg}
                        startAngle={startAngleDeg}
                        alpha={0.3}
                      />
                      {/* Основной сегмент */}
                      <WedgeIcon
                        x={0}
                        y={0}
                        innerRadius={70}
                        color={segmentColor}
                        outerRadius={radius}
                        endAngle={endAngleDeg}
                        startAngle={startAngleDeg}
                      />
                    </pixiContainer>
                  );
                })
              )}

              {/* Аватары теперь рендерятся как HTML элементы поверх canvas */}
            </pixiContainer>

            <pixiContainer>
              <pixiGraphics draw={drawWheel} />
              {/* <pixiText
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
              /> */}
              <pixiText
                x={0}
                y={0}
                anchor={0.5}
                text={formatTimer(phaseText)}
                style={
                  new PIXI.TextStyle({
                    fontSize: [
                      LobbyStatus.InProcess,
                      LobbyStatus.WaitingForPlayers,
                    ].includes(gamePhase)
                      ? 16
                      : 32,
                    fill: [
                      LobbyStatus.InProcess,
                      LobbyStatus.WaitingForPlayers,
                    ].includes(gamePhase)
                      ? 0x808080
                      : 0xffffff,
                    fontWeight: [
                      LobbyStatus.InProcess,
                      LobbyStatus.WaitingForPlayers,
                    ].includes(gamePhase)
                      ? '400'
                      : '700',
                  })
                }
              />
            </pixiContainer>
          </pixiContainer>
        </Application>

        {/* HTML аватары поверх canvas */}
        {segmentsWithAngles.map((segment) => {
          const midAngle = (segment.startAngle + segment.endAngle) / 2;
          // Размещаем аватары в области сегментов между внутренним кругом (70) и внешним краем (162)
          const labelRadius = (70 + radius) / 2; // 116px - посередине между 70 и 162

          // Координаты аватаров
          const x = Math.cos(midAngle) * labelRadius;
          const y = Math.sin(midAngle) * labelRadius;

          return (
            <HtmlAvatar
              x={x}
              y={y}
              containerSize={sizes}
              rotation={internalRotation}
              src={segment.userImage || ''}
              key={`html-avatar-${segment.id}`}
              playerName={segment.playerName}
            />
          );
        })}

        <Icons
          name="spin-arrow-bottom"
          className="absolute -top-4 left-1/2 -translate-x-1/2"
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
  alpha?: number;
}

const WedgeIcon = ({
  x = 0,
  y = 0,
  endAngle,
  startAngle,
  innerRadius,
  outerRadius,
  color = 0xff9900,
  alpha = 1,
}: AnnularSectorProps) => {
  const toRadians = (deg: number) => (deg * Math.PI) / 180;

  const draw = (g: PIXI.Graphics) => {
    g.clear();

    const sa = toRadians(startAngle);
    const ea = toRadians(endAngle);
    const cx = x;
    const cy = y;

    // Рисуем заливку сегмента
    g.beginFill(color, alpha);
    g.moveTo(cx + Math.cos(sa) * outerRadius, cy + Math.sin(sa) * outerRadius);
    g.arc(cx, cy, outerRadius, sa, ea);
    g.lineTo(cx + Math.cos(ea) * innerRadius, cy + Math.sin(ea) * innerRadius);
    g.arc(cx, cy, innerRadius, ea, sa, true);
    g.closePath();
    g.endFill();
  };

  return <pixiGraphics draw={draw} />;
};

const segmentColors = [
  0xc49cff, // #C49CFF - фиолетовый
  0xff86c8, // #FF86C8 - розовый
  0x7ef29d, // #7EF29D - зеленый
  0x33e1e4, // #33E1E4 - голубой
  0xff8e8e, // #FF8E8E - красный
  0x78d9ff, // #78D9FF - синий
];
