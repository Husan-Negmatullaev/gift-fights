import { GiftBorderCard, GiftBorderCardVariantThree } from "@/entities/gift";
import { SpinCarousel } from "@/features/spin-gifts";
import { Avatar } from "@/shared/ui/avatar/avatar";
import { Tabs } from "@/shared/ui/tabs/tabs";
import { useState, type ReactNode } from "react";

export const PlaySpin = () => {
  const [resultSpin, setResultSpin] = useState<{
    prize: {
      id: number;
      name: string;
      value: number;
      color: string;
      icon: ReactNode;
      rarity: string;
    };
    winningSegment: number;
    spinNumber: number;
    timestamp: number;
  } | null>(null);

  const handleResultSpin = (
    result: {
      prize: {
        id: number;
        name: string;
        value: number;
        color: string;
        icon: ReactNode;
        rarity: string;
      };
      winningSegment: number;
      spinNumber: number;
      timestamp: number;
    } | null,
  ) => {
    setResultSpin(result);
  };

  return (
    <div className="py-2.5 px-6">
      {resultSpin && (
        <>
          <div className="py-5 mb-2 grid place-items-center">
            <h1 className="font-medium text-2xl mb-10 text-center">
              Победитель
            </h1>
            <div
              className="overflow-hidden size-49 px-7.5 py-6.6 bg-dark-blue-1000 rounded-2.5xl pt-7 pb-4.5 text-center"
              style={{
                boxShadow:
                  "0px 0px 10px 0px #1AC9FF80 inset, 0px 0px 4px 0px #FFFFFF40 inset",
              }}
            >
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {Shape}
                </div>
                <Avatar
                  className="size-15.5 mb-3 mx-auto relative"
                  url="/assets/images/leaders/avatar.webp"
                />
              </div>

              <h1 className="mb-6 relative">{`<nickname>`}</h1>

              <div className="font-thin text-tiny mb-0.5 relative">Выйгрыш</div>

              <div className="text-sm text-blue-300 font-semibold relative">
                52 TON
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-base mb-3">Ваши Gift’s</h1>
            <ul className="peer grid gap-3 grid-cols-2">
              {Array.from({ length: 4 }).map((_item, index) => (
                <li key={index}>
                  <GiftBorderCard size="lg" />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {!resultSpin && (
        <>
          <header className="flex justify-between items-center mb-3">
            <div className="basis-31.5 rounded-lg text-tiny/3 min-h-8 flex items-center justify-center gap-2 bg-dark-blue-150 text-blue-100">
              На победу <span className="font-semibold"> 41%</span>
            </div>
            {/* <button
              type="button"
              className="basis-31.5 rounded-lg text-tiny/3 cursor-pointer min-h-8 flex items-center justify-center bg-dark-blue-150 text-blue-100 font-semibold"
            >
              Смена лобби
            </button> */}
          </header>
          <div className="mb-5">
            <SpinCarousel onResult={handleResultSpin} />
          </div>

          <Tabs tabs={["Ваши Gift's", "Текущие ставки"]} listClassName="mb-3">
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <GiftBorderCardVariantThree
                  active={index === 0}
                  key={index}
                  size={"lg"}
                />
              ))}
            </div>
            <div className="grid gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-dark-blue-900">
                  <div className="flex items-center px-4 p-2 gap-3 rounded-lg bg-dark-blue-50">
                    <Avatar
                      className="size-8"
                      url={"/assets/images/leaders/avatar.webp"}
                    />
                    <span className="text-xs flex-1">{`<nickname>`}</span>

                    <div className="flex items-center gap-1.5">
                      <div className="grid place-content-center items-end gap-1 grid-flow-col bg-dark-blue-150 text-blue-100 rounded-lg min-h-6 basis-14 text-tiny/2.5 font-semibold px-2.5">
                        1000{" "}
                        <span className="text-eight/2 font-normal">TON</span>
                      </div>

                      <div className="grid place-items-center bg-dark-blue-150 text-blue-100 rounded-lg min-h-6 basis-11.5 text-tiny font-semibold px-3">
                        75%
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-flow-row grid-cols-[repeat(auto-fill,minmax(60px,60px))] auto-rows-[60px] gap-1.5 p-1.5">
                    <img alt="gift" src="/assets/images/gifts/gift.webp" />
                    <img alt="gift" src="/assets/images/gifts/gift.webp" />
                    <img alt="gift" src="/assets/images/gifts/gift.webp" />
                    <img alt="gift" src="/assets/images/gifts/gift.webp" />
                  </div>
                </div>
              ))}
            </div>
          </Tabs>
        </>
      )}
    </div>
  );
};

const Shape = (
  <svg
    width="264"
    height="217"
    viewBox="0 0 264 217"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_f_273_1448)">
      <path
        d="M67.6857 94.3261C66.0203 89.0757 67.3259 83.3599 72.0097 80.4613C81.0154 74.888 99.5019 67 132 67C164.498 67 182.985 74.888 191.99 80.4613C196.674 83.3599 197.98 89.0757 196.314 94.3261L182.532 137.775C180.024 145.682 171.762 150.293 163.585 148.901C154.97 147.434 143.504 145.973 132 145.973C120.496 145.973 109.03 147.434 100.415 148.901C92.2379 150.293 83.9756 145.682 81.4676 137.775L67.6857 94.3261Z"
        fill="#1AC9FF"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_273_1448"
        x="-0.00585938"
        y="0"
        width="264.012"
        height="216.148"
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
          stdDeviation="33.5"
          result="effect1_foregroundBlur_273_1448"
        />
      </filter>
    </defs>
  </svg>
);
