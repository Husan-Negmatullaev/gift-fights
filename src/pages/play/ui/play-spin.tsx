import { GiftBorderCardVariantThree } from '@/entities/gift';
import { SpinCarousel } from '@/features/spin-gifts';
import { TouchableLottie } from '@/shared/components/lottie/touchable-lottie';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { Tabs } from '@/shared/ui/tabs/tabs';
import { useNavigate } from 'react-router';
import Gift from '@/shared/assets/lottie/berrybox.json';

export const PlaySpin = () => {
  const navigate = useNavigate();
  // const [resultSpin, setResultSpin] = useState<{
  //   prize: {
  //     id: number;
  //     name: string;
  //     value: number;
  //     color: string;
  //     icon: ReactNode;
  //     rarity: string;
  //   };
  //   winningSegment: number;
  //   spinNumber: number;
  //   timestamp: number;
  // } | null>(null);

  // const handleResultSpin = (
  //   result: {
  //     prize: {
  //       id: number;
  //       name: string;
  //       value: number;
  //       color: string;
  //       icon: ReactNode;
  //       rarity: string;
  //     };
  //     winningSegment: number;
  //     spinNumber: number;
  //     timestamp: number;
  //   } | null,
  // ) => {
  //   setResultSpin(result);
  // };

  // const [isSpinning, setIsSpinning] = useState(false);
  // const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  // const [countdown, setCountdown] = useState(30);

  // const segments = [
  //   { id: 1, label: 'Prize 1', color: 0x3b82f6, icon: '🎁' },
  //   { id: 2, label: 'Prize 2', color: 0x8b5cf6, icon: '💎' },
  //   { id: 3, label: 'Prize 3', color: 0x10b981, icon: '🏆' },
  //   { id: 4, label: 'Prize 4', color: 0xf59e0b, icon: '⭐' },
  //   { id: 5, label: 'Prize 5', color: 0xf43f5e, icon: '🎯' },
  //   { id: 6, label: 'Prize 6', color: 0x06b6d4, icon: '💰' },
  //   { id: 7, label: 'Prize 7', color: 0x84cc16, icon: '🎊' },
  //   { id: 8, label: 'Prize 8', color: 0xec4899, icon: '🌟' },
  // ];

  // const handleSpin = useCallback(() => {
  //   if (!isSpinning) {
  //     setIsSpinning(true);
  //     setSelectedSegment(null);
  //   }
  // }, [isSpinning]);

  // const handleSpinComplete = useCallback((segmentIndex: number) => {
  //   setIsSpinning(false);
  //   setSelectedSegment(segmentIndex);
  // }, []);

  // const handleCountdownUpdate = useCallback((time: number) => {
  //   setCountdown(time);
  // }, []);

  const handleSelectSpinResult = () => {
    navigate('result', { replace: true });
  };

  return (
    <div className="py-2.5 px-6">
      <header className="flex justify-between items-center mb-3">
        <div className="basis-31.5 rounded-lg text-tiny/3 min-h-8 flex items-center justify-center gap-2 bg-dark-blue-150 text-blue-100">
          На победу <span className="font-semibold"> 41%</span>
        </div>
      </header>
      <div className="mb-5">
        <SpinCarousel
          onSelected={handleSelectSpinResult}
          // segments={segments}
          // isSpinning={isSpinning}
          // onSpinComplete={handleSpinComplete}
          // onCountdownUpdate={handleCountdownUpdate}
        />
      </div>

      <Tabs tabs={["Ваши Gift's", 'Текущие ставки']} listClassName="mb-3">
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <GiftBorderCardVariantThree
              active={index === 0}
              key={index}
              size={'lg'}
            />
          ))}
        </div>
        <div className="grid gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-dark-blue-900">
              <div className="flex items-center px-4 p-2 gap-3 rounded-lg bg-dark-blue-50">
                <Avatar
                  className="size-8"
                  url={'/assets/images/leaders/avatar.webp'}
                />
                <span className="text-xs flex-1">{`<nickname>`}</span>

                <div className="flex items-center gap-1.5">
                  <div className="grid place-content-center items-end gap-1 grid-flow-col bg-dark-blue-150 text-blue-100 rounded-lg min-h-6 basis-14 text-tiny/2.5 font-semibold px-2.5">
                    1000 <span className="text-eight/2 font-normal">TON</span>
                  </div>

                  <div className="grid place-items-center bg-dark-blue-150 text-blue-100 rounded-lg min-h-6 basis-11.5 text-tiny font-semibold px-3">
                    75%
                  </div>
                </div>
              </div>
              <div className="grid grid-flow-row grid-cols-[repeat(auto-fill,minmax(60px,60px))] auto-rows-[60px] gap-1.5 p-1.5">
                <TouchableLottie animation={Gift} />
                <TouchableLottie animation={Gift} />
                <TouchableLottie animation={Gift} />
                <TouchableLottie animation={Gift} />
              </div>
            </div>
          ))}
        </div>
      </Tabs>
    </div>
  );
};
