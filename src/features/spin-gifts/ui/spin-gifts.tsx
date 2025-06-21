import { useRef, useEffect, useState } from 'react';
import { Avatar } from '@/shared/ui/avatar/avatar';

const items = ['🎁', '🧢', '🕶', '🎮', '💰', '👟'];

export const SpinGifts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollSpeed = 0.3; // px per frame

  useEffect(() => {
    let animationFrameId: number;

    const scroll = () => {
      setScrollPosition((prev) => {
        const newPosition = prev + scrollSpeed;
        // Сбрасываем позицию когда прошли полную ширину элементов
        return newPosition >= items.length * 120 ? 0 : newPosition;
      });

      animationFrameId = requestAnimationFrame(scroll);
    };

    // Небольшая задержка чтобы DOM полностью отрендерился
    setTimeout(() => {
      scroll();
    }, 100);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const duplicatedItems = [...items, ...items, ...items, ...items, ...items]; // больше копий — дольше лента

  return (
    <div className="relative overflow-hidden">
      <div className="border-y border-white bg-linear-360 from-blue-50 from-0% to-blue-100 to-100% w-full max-w-2xl overflow-hidden rounded bg-gray-900">
        <div
          ref={containerRef}
          className="flex gap-3 w-max whitespace-nowrap py-6.5"
          style={{
            transition: 'none',
            transform: `translateX(-${scrollPosition}px)`,
          }}>
          {duplicatedItems.map((_item, index) => (
            <div
              key={index}
              className="grid gap-1.5 rounded-xl bg-dark-blue-150/60 w-25 h-40 shrink-0 text-3xl text-white p-1.5">
              <div className="relative bg-dark-blue-150/60 rounded-xl size-21.5 grid place-content-center">
                <img
                  alt="cap"
                  width={70}
                  src="/assets/images/play/cap.webp"
                  // className="absolute top-0 left-0 size-full object-cover"
                />
              </div>
              <div className="grid place-content-center">
                <Avatar
                  className="size-8 mx-auto relative -mb-1.5"
                  url="/assets/images/leaders/avatar.webp"
                />
                <div className="px-3 text-tiny font-thin grid place-content-center bg-gray-50/30 border border-white/30 shadow-[0px_4px_4px_0px_--alpha(var(--color-black)_/_7%)] min-h-5.5 text-center rounded-full">
                  {`<username>`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 text-white">
        {angle}
      </div>
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-dark-blue">
        {angle}
      </div>

      <div className="rotate-180 absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-white">
        {angle}
      </div>
      <div className="rotate-180 absolute -bottom-1 left-1/2 -translate-x-1/2 text-dark-blue">
        {angle}
      </div>
    </div>
  );
};

const angle = (
  <svg
    width="38"
    height="18"
    fill="none"
    viewBox="0 0 38 18"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H38L19 18L0 0Z" fill="currentColor" />
  </svg>
);
