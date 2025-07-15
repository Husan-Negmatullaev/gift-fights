import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Application } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { AvatarSprite } from './avatar-sprite';

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
}

interface SpinWheelProps {
  segments: WheelSegment[];
  radius?: number;
  onSpinComplete?: () => void;
  isSpinning?: boolean;
  targetRotation?: number;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({
  segments,
  radius = 200,
  onSpinComplete,
  isSpinning = false,
  targetRotation = 0,
}) => {
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | null>(null);

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

  const segmentsWithAngles = calculateSegmentAngles();

  // Animate to target rotation when spinning
  useEffect(() => {
    if (
      isSpinning &&
      targetRotation !== undefined &&
      targetRotation !== rotation
    ) {
      const duration = 5000; // Exactly 5 seconds
      const startTime = Date.now();
      const startRotation = rotation;
      const totalRotation = targetRotation - startRotation;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for realistic spin (ease out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentRotation = startRotation + totalRotation * easeOut;

        setRotation(currentRotation);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Animation completed after exactly 5 seconds
          if (onSpinComplete) {
            setTimeout(() => {
              onSpinComplete();
            }, 800); // 800ms delay before showing modal
          }
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
  }, [isSpinning, targetRotation, rotation, onSpinComplete]);

  const drawWheel = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Add center circle
      g.beginFill(0x273c56);
      g.lineStyle(15, 0x1d232a);
      g.drawCircle(0, 0, 75);
      g.endFill();
    },
    [segmentsWithAngles, radius],
  );

  const drawArrow = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(0xffd700);
    g.lineStyle(2, 0x1f2937);

    // Draw arrow pointing down to the wheel
    g.moveTo(0, -15);
    g.lineTo(-20, -40);
    g.lineTo(20, -40);
    g.lineTo(0, -15);
    g.endFill();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Application
        antialias
        autoDensity
        backgroundAlpha={0}
        width={radius * 2 + 100}
        height={radius * 2 + 100}
        resolution={window.devicePixelRatio || 1}>
        {/* Arrow */}
        <pixiContainer x={radius + 50} y={50}>
          <pixiGraphics draw={drawArrow} />
        </pixiContainer>

        {/* Wheel */}
        <pixiContainer x={radius + 50} y={radius + 70} rotation={rotation}>
          {/* Draw segments using WedgeIcon */}
          {segmentsWithAngles.length === 0 ? (
            // Empty wheel
            <pixiGraphics
              draw={(g: PIXI.Graphics) => {
                g.clear();
                g.beginFill(0x374151);
                g.lineStyle(3, 0x6b7280);
                g.drawCircle(0, 0, radius);
                g.endFill();
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
                  outerRadius={radius}
                  color={0x2d353f}
                  endAngle={endAngleDeg}
                  startAngle={startAngleDeg}
                />
              );
            })
          )}

          {/* Center circle */}
          <pixiContainer>
            <pixiGraphics draw={drawWheel} />
            <pixiText
              x={0}
              y={-20}
              anchor={0.5}
              text={`Начало через :`}
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
              text={`30 сек`}
              style={
                new PIXI.TextStyle({
                  fontSize: 24,
                  fill: 0xffffff,
                  fontWeight: '500',
                })
              }
            />
          </pixiContainer>

          {/* Segment labels and stakes */}
          {segmentsWithAngles.map((segment) => {
            const midAngle = (segment.startAngle + segment.endAngle) / 2;
            const labelRadius = radius * 0.65;
            // const stakeRadius = radius * 0.45;
            const x = Math.cos(midAngle) * labelRadius;
            const y = Math.sin(midAngle) * labelRadius;
            // const stakeX = Math.cos(midAngle) * stakeRadius;
            // const stakeY = Math.sin(midAngle) * stakeRadius;

            return (
              <React.Fragment key={segment.id}>
                {/* <pixiContainer> */}
                <AvatarSprite
                  x={x}
                  y={y}
                  size={40}
                  rotation={midAngle}
                  backgroundColor={0x2d353f}
                  url={'/assets/images/leaders/avatar.webp'}
                />
                {/* </pixiContainer> */}
                {/* Player name */}
                {/* <pixiText
                  text={segment.playerName}
                  x={x}
                  y={y - 8}
                  anchor={0.5}
                  rotation={
                    midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2
                      ? midAngle + Math.PI
                      : midAngle
                  }
                  style={
                    new PIXI.TextStyle({
                      fontFamily: 'Arial, sans-serif',
                      fontSize: 12,
                      fontWeight: 'bold',
                      fill: 0xffffff,
                      stroke: 0x000000,
                      strokeThickness: 1,
                    })
                  }
                /> */}
                {/* Percentage */}
                {/* <pixiText
                  text={`${segment.percentage.toFixed(1)}%`}
                  x={x}
                  y={y + 8}
                  anchor={0.5}
                  rotation={
                    midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2
                      ? midAngle + Math.PI
                      : midAngle
                  }
                  style={
                    new PIXI.TextStyle({
                      fontFamily: 'Arial, sans-serif',
                      fontSize: 10,
                      fill: 0xffd700,
                      stroke: 0x000000,
                      strokeThickness: 1,
                    })
                  }
                /> */}
                {/* Stake amount */}
                {/* <pixiText
                  text={`$${segment.stake}`}
                  x={stakeX}
                  y={stakeY}
                  anchor={0.5}
                  style={
                    new PIXI.TextStyle({
                      fontFamily: 'Arial, sans-serif',
                      fontSize: 11,
                      fontWeight: 'bold',
                      fill: 0x10b981,
                      stroke: 0x000000,
                      strokeThickness: 1,
                    })
                  }
                /> */}
              </React.Fragment>
            );
          })}
        </pixiContainer>
      </Application>
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
