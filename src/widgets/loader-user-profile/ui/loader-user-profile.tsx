import { useProfileContext } from "@/entities/profile";
import { Icons } from "@/shared/ui/icons/icons";
import { useState, useEffect } from "react";

type LoadUserProfileProps = {
  children: React.ReactNode;
};

export const LoadUserProfile = (props: LoadUserProfileProps) => {
  const { children } = props;
  const [progress, setProgress] = useState(0);
  const { isFirstLoadingTime } = useProfileContext();
  const isDataLoaded = isFirstLoadingTime;
  const [loadingText, setLoadingText] = useState("Инициализация...");
  const [_isComplete, setIsComplete] = useState(false);
  const [_currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [minProgress, setMinProgress] = useState(0);

  // Effect to handle the loading animation based on the boolean
  useEffect(() => {
    if (isDataLoaded) {
      // If data is loaded, complete the loading immediately
      setProgress(100);
      setLoadingText("Готово!");
      setIsComplete(true);

      // Hide loading screen after 200ms as requested
      setTimeout(() => {
        setIsShowLoading(true);
      }, 200);
      return;
    }

    // If data is not loaded, animate through the stages
    const animateLoading = async () => {
      const totalStages = loadingStages.length - 1; // Exclude the last "Готово!" stage

      for (let i = 0; i < totalStages && !isDataLoaded; i++) {
        setCurrentStageIndex(i);
        setLoadingText(loadingStages[i].text);

        // Calculate progress based on stage (ensuring it only goes forward)
        const baseProgress = (i / totalStages) * 85; // Go up to 85%
        const randomVariation = Math.random() * 5; // Add 0-5% variation
        const calculatedProgress = baseProgress + randomVariation;

        // Ensure progress never goes backwards
        const newProgress = Math.max(
          minProgress + 1,
          Math.min(90, calculatedProgress),
        );

        setProgress(newProgress);
        setMinProgress(newProgress); // Update minimum progress

        // Wait 200ms before next stage (if data still not loaded)
        await new Promise((res) => setTimeout(res, 200));

        // Check if data was loaded during the wait
        if (isDataLoaded) {
          break;
        }
      }

      // If we've gone through all stages but data still not loaded,
      // stay at the last stage with some progress animation
      if (!isDataLoaded) {
        setLoadingText("Ожидание данных...");
        // Keep progress between current progress and 95% while waiting
        const waitingAnimation = setInterval(() => {
          if (isDataLoaded) {
            clearInterval(waitingAnimation);
            return;
          }
          // Slowly increment progress while waiting, never going backwards
          setProgress((prev) => {
            const increment = Math.random() * 2; // Small random increment
            const newValue = Math.min(95, prev + increment);
            setMinProgress(newValue);
            return newValue;
          });
        }, 500);
      }
    };

    animateLoading();
  }, [isDataLoaded]);

  // If loading is complete and hidden, show the main app content
  // if (!showLoading) {
  //   return (
  //     <div className="relative w-[393px] h-[852px] bg-[#1d232a] mx-auto flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-white text-2xl font-bold mb-4">
  //           Welcome to Gift Fights!
  //         </h1>
  //         <p className="text-white/70 text-lg">
  //           Loading complete. Ready to play!
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  if (isShowLoading) return <>{children}</>;

  return (
    <main className="grid place-items-center place-content-center gap-12.5 bg-dark shadow-[inset_0px_0px_38.5px_0px_var(--color-dark-blue-1100)]">
      <div>
        <img
          className="w-61.5"
          alt="gift fight logo"
          src="/assets/images/preloader.webp"
        />
      </div>
      <div>
        <div className="relative mb-3">
          <div className="relative w-76 h-7 bg-dark-blue-1150 rounded-four border border-white shadow-[0px_0px_3.75px_#1ac9ff,inset_0px_0px_6.19px_#1ac9ff] overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r bg-white rounded-[3.57px] transition-all duration-200 ease-out relative"
            >
              {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>

              <div className="absolute inset-0 bg-[#1ac9ff] opacity-50 blur-sm rounded-[3.57px]"></div>

              <div className="absolute inset-0 bg-gradient-to-r from-[#0099cc] to-[#1ac9ff] opacity-80 rounded-[3.57px]"></div> */}
            </div>
            <div className="absolute inset-0 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3)] rounded-[3.57px] pointer-events-none"></div>
          </div>

          <Icons
            width={30}
            name="spin-arrow-bottom"
            className="absolute bottom-4 duration-200 ease-out transition-[left] drop-shadow-[0px_0px_3.75px_var(--color-blue-100)] [&>path]:shadow-[inset_0px_0px_6.19px_0px_var(--color-blue-100)]"
            style={{
              left: `${Math.max(0, Math.min(271, (progress / 100) * 271))}px`,
            }}
          />
        </div>
        <div className="font-bold text-white text-base text-center leading-normal">
          {loadingText}&nbsp;&nbsp; {Math.round(progress)}%
        </div>
      </div>
    </main>
  );
};

const loadingStages = [
  { text: "Инициализация..." },
  { text: "Подключение к серверу..." },
  { text: "Загрузка данных пользователя..." },
  { text: "Синхронизация профиля..." },
  { text: "Загрузка игровых данных..." },
  { text: "Проверка обновлений..." },
  { text: "Финализация..." },
  { text: "Готово!" },
];
