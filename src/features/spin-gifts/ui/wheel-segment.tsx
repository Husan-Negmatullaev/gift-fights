import { Avatar } from "@/shared/ui/avatar/avatar";
import type { ReactNode } from "react";

interface WheelSegmentProps {
  rotation: number;
  className?: string;
  isActive?: boolean;
  segmentNumber: number;
  prize: {
    id: number;
    name: string;
    value: number;
    color: string;
    icon: ReactNode;
    rarity: string;
  };
}

export const WheelSegment = (props: WheelSegmentProps) => {
  const {
    // prize,
    rotation,
    // segmentNumber,
    className = "",
    isActive = false,
  } = props;

  return (
    <div
      className={`${className} transition-all duration-500 ${
        isActive ? "scale-110" : ""
      }`}
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center",
      }}
    >
      {/* SVG Background Shape */}
      <div className="relative">
        <svg
          width="107"
          height="116"
          viewBox="0 0 107 116"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_ii_264_805)">
            <path
              d="M89.875 0.551298C92.7365 -0.535327 95.9208 0.691518 97.0743 3.52664C100.563 12.1017 107 31.5107 107 58C107 84.4893 100.563 103.898 97.0743 112.473C95.9207 115.308 92.7365 116.535 89.875 115.449L4.95945 83.2023C1.79355 82 0.160183 78.4063 0.927502 75.1079C1.86387 71.0828 2.83098 65.1861 2.83098 58C2.83098 50.8139 1.86387 44.9172 0.927504 40.8921C0.160185 37.5937 1.79355 33.9999 4.95945 32.7977L89.875 0.551298Z"
              fill="#2D353F"
            />
          </g>
          <defs>
            <filter
              id="filter0_ii_264_805"
              x="0.740234"
              y="0.158875"
              width="106.26"
              height="115.682"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="5" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.101961 0 0 0 0 0.788235 0 0 0 0 1 0 0 0 0.5 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_264_805"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="2" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_innerShadow_264_805"
                result="effect2_innerShadow_264_805"
              />
            </filter>
          </defs>
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {Shape}
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-2"
          style={{
            transform: `rotate(${-rotation}deg)`,
          }}
        >
          <Avatar className="size-7" url="/assets/images/leaders/avatar.webp" />
        </div>
      </div>
    </div>
  );
};

const Shape = (
  <svg
    width="115"
    height="115"
    viewBox="0 0 115 115"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_f_271_1192)">
      <path
        d="M40.4361 33.216C41.577 30.9788 43.8475 29.5633 46.2847 30.1685C50.946 31.3261 59.3528 34.8063 69.7728 45.2264C80.1929 55.6465 83.6732 64.0533 84.8307 68.7145C85.436 71.1518 84.0205 73.4222 81.7833 74.5632L63.728 83.771C60.4484 85.4436 56.4179 84.2985 54.2824 81.2996C51.9649 78.0451 48.6921 73.8248 44.9333 70.066C41.1744 66.3071 36.9542 63.0344 33.6997 60.7169C30.7008 58.5814 29.5557 54.5509 31.2283 51.2712L40.4361 33.216Z"
        fill="#1AC9FF"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_271_1192"
        x="0.456055"
        y="0.0281982"
        width="114.515"
        height="114.515"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="15"
          result="effect1_foregroundBlur_271_1192"
        />
      </filter>
    </defs>
  </svg>
);
