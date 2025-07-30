import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Application } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { Icons } from '@/shared/ui/icons/icons';
import { HtmlAvatar } from './html-avatar';
import { LobbyStatus } from '@/shared/api/graphql/graphql';
import { WHEEL_ANIMATION } from '@/shared/constants/wheel-animation-constants';

interface WheelSegment {
  id: number;
  label: string;
  stake: number;
  color: number;
  image: string;
  reward: string;
  playerName: string;
  startAngle: number;
  endAngle: number;
  angle: number;
  percentage: number;
}

interface SpinWheelProps {
  text: string;
  radius?: number;
  isSpinning?: boolean;
  gamePhase: LobbyStatus;
  targetRotation?: number;
  segments: WheelSegment[];
  onSpinComplete?: () => void;
  winner: WheelSegment | null;
}

export const Wheel: React.FC<SpinWheelProps> = ({
  text,
  winner,
  segments,
  gamePhase,
  // radius = 200,
  onSpinComplete,
  isSpinning = false,
  targetRotation = 0,
}) => {
  const radius = 162;
  const sizes = 324 + 25;
  const animationRef = useRef<number | null>(null);
  const [internalRotation, setInternalRotation] = useState(0);
  const [showWinnerName, setShowWinnerName] = useState(false);

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

  const segmentsWithAngles = calculateSegmentAngles();

  // Сбрасываем показ имени победителя при новом спине
  useEffect(() => {
    if (isSpinning) {
      setShowWinnerName(false);
    }
  }, [isSpinning]);

  useEffect(() => {
    let winnerTimer: ReturnType<typeof setTimeout>;
    let completeTimer: ReturnType<typeof setTimeout>;

    if (
      isSpinning &&
      targetRotation !== undefined &&
      Math.abs(targetRotation - internalRotation) > 0.1 &&
      !animationRef.current
    ) {
      const startTime = Date.now();
      const startRotation = internalRotation;
      const totalRotation = targetRotation - startRotation;

      // Анимация вращения
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / WHEEL_ANIMATION.SPIN_DURATION, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentRotation = startRotation + totalRotation * easeOutQuart;

        setInternalRotation(currentRotation);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          animationRef.current = null;
        }
      };

      animationRef.current = requestAnimationFrame(animate);

      // Показываем имя победителя после завершения анимации вращения
      winnerTimer = setTimeout(() => {
        setShowWinnerName(true);
      }, WHEEL_ANIMATION.SPIN_DURATION);

      // Вызываем onSpinComplete после показа имени победителя
      completeTimer = setTimeout(() => {
        onSpinComplete?.();
      }, WHEEL_ANIMATION.TOTAL_ANIMATION_TIME);
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      clearTimeout(winnerTimer);
      clearTimeout(completeTimer);
    };
  }, [isSpinning, targetRotation, onSpinComplete]);

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

  // const reverseInternalRotation = -internalRotation - 200;
  // const reverseInternalRotation = -(internalRotation * internalRotation);
  const reverseInternalRotation = internalRotation;

  // Отладка значений вращения
  // console.log('🔄 Rotation debug:', {
  //   internalRotation,
  //   internalRotationDegrees: (internalRotation * 180) / Math.PI,
  //   reverseInternalRotation,
  //   reverseInternalRotationDegrees: (reverseInternalRotation * 180) / Math.PI,
  //   targetRotation,
  //   targetRotationDegrees: targetRotation
  //     ? (targetRotation * 180) / Math.PI
  //     : 'undefined',
  // });

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Application
          antialias
          autoDensity
          width={sizes}
          height={sizes}
          backgroundAlpha={0}
          resolution={window.devicePixelRatio || 1}>
          <pixiContainer x={sizes / 2} y={sizes / 2}>
            <pixiContainer rotation={reverseInternalRotation}>
              {segmentsWithAngles.length === 0 && (
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
              )}
              {segmentsWithAngles.map((segment, index) => {
                const startAngleDeg = (segment.startAngle * 180) / Math.PI;
                const endAngleDeg = (segment.endAngle * 180) / Math.PI;

                // Массив цветов для сегментов
                const segmentColor = colors[index % colors.length];

                // Создаем blur фильтр для тени
                const blurFilter = new PIXI.BlurFilter(6, 4); // blur-radius = 6

                return (
                  <pixiContainer key={segment.id}>
                    {/* Тень сегмента (под основным) с blur эффектом */}
                    <pixiGraphics
                      filters={[blurFilter]}
                      draw={(g: PIXI.Graphics) => {
                        g.clear();

                        const sa = (startAngleDeg * Math.PI) / 180;
                        const ea = (endAngleDeg * Math.PI) / 180;
                        const cx = 0; // убрали смещение тени
                        const cy = 0; // убрали смещение тени

                        // Рисуем контур тени вокруг сегмента (темная версия цвета сегмента)
                        const shadowColor = (() => {
                          const r = (segmentColor >> 16) & 0xff;
                          const g = (segmentColor >> 8) & 0xff;
                          const b = segmentColor & 0xff;

                          // Делаем каждый компонент темнее (умножаем на 0.3)
                          const darkR = Math.floor(r * 0.3);
                          const darkG = Math.floor(g * 0.3);
                          const darkB = Math.floor(b * 0.3);

                          return (darkR << 16) | (darkG << 8) | darkB;
                        })();

                        // Сильный spread эффект - увеличиваем размер тени на 12px
                        const spreadSize = 12;
                        const shadowOuterRadius = radius + spreadSize;
                        const shadowInnerRadius = Math.max(70 - spreadSize, 35); // не меньше 35px

                        // Рисуем заливку тени с увеличенными размерами
                        g.beginFill(shadowColor);

                        g.moveTo(
                          cx + Math.cos(sa) * shadowOuterRadius,
                          cy + Math.sin(sa) * shadowOuterRadius,
                        );
                        g.arc(cx, cy, shadowOuterRadius, sa, ea);
                        g.lineTo(
                          cx + Math.cos(ea) * shadowInnerRadius,
                          cy + Math.sin(ea) * shadowInnerRadius,
                        );
                        g.arc(cx, cy, shadowInnerRadius, ea, sa, true);
                        g.closePath();
                        g.endFill();
                      }}
                    />
                    {/* Основной сегмент */}
                    <pixiGraphics
                      draw={(g: PIXI.Graphics) => {
                        g.clear();

                        const sa = (startAngleDeg * Math.PI) / 180;
                        const ea = (endAngleDeg * Math.PI) / 180;
                        const cx = 0;
                        const cy = 0;

                        // Рисуем заливку сегмента
                        g.beginFill(segmentColor);
                        g.moveTo(
                          cx + Math.cos(sa) * radius,
                          cy + Math.sin(sa) * radius,
                        );
                        g.arc(cx, cy, radius, sa, ea);
                        g.lineTo(
                          cx + Math.cos(ea) * 70,
                          cy + Math.sin(ea) * 70,
                        );
                        g.arc(cx, cy, 70, ea, sa, true);
                        g.closePath();
                        g.endFill();
                      }}
                    />
                  </pixiContainer>
                );
              })}
            </pixiContainer>

            <pixiContainer>
              <pixiGraphics draw={drawWheel} />
              <pixiText
                x={0}
                y={0}
                text={(() => {
                  let displayText;

                  if (showWinnerName && winner) {
                    // Показываем имя победителя после завершения анимации
                    displayText = winner.playerName;
                  } else if (
                    text === '' &&
                    gamePhase === LobbyStatus.Completed
                  ) {
                    // Показываем "00:00" во время анимации когда статус Completed
                    displayText = '00:00';
                  } else {
                    // Используем переданный текст
                    displayText = text;
                  }

                  console.log('💬 Display text:', {
                    showWinnerName,
                    winner: winner?.playerName,
                    originalText: text,
                    finalText: displayText,
                    gamePhase,
                  });

                  return displayText;
                })()}
                anchor={0.5}
                style={
                  new PIXI.TextStyle({
                    fontSize: (() => {
                      if (showWinnerName && winner) return 24; // Winner name size
                      if (gamePhase === LobbyStatus.Countdown) return 32; // Countdown size
                      if (gamePhase === LobbyStatus.WaitingForPlayers)
                        return 16; // Waiting size
                      return 32; // Default size
                    })(),
                    fill: (() => {
                      if (showWinnerName && winner) return 0xffffff; // Winner name - white
                      if (gamePhase === LobbyStatus.Countdown) return 0xffffff; // Countdown - white
                      if (gamePhase === LobbyStatus.WaitingForPlayers)
                        return 0x808080; // Waiting - gray
                      return 0xffffff; // Default - white
                    })(),
                    fontWeight: (() => {
                      if (showWinnerName && winner) return '700'; // Winner name - bold
                      if (gamePhase === LobbyStatus.Countdown) return '700'; // Countdown - bold
                      if (gamePhase === LobbyStatus.WaitingForPlayers)
                        return '400'; // Waiting - normal
                      return '700'; // Default - bold
                    })(),
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
              src={segment.image}
              containerSize={sizes}
              rotation={reverseInternalRotation}
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

const colors = [
  0xc49cff, // #C49CFF - фиолетовый
  0xff86c8, // #FF86C8 - розовый
  0x7ef29d, // #7EF29D - зеленый
  0x33e1e4, // #33E1E4 - голубой
  0xff8e8e, // #FF8E8E - красный
  0x78d9ff, // #78D9FF - синий
];
