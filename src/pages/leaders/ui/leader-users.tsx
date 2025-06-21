import { Avatar } from '@/shared/ui/avatar/avatar';
import { Icons } from '@/shared/ui/icons/icons';

export const LeaderUsers = () => {
  const battleLeaders = [
    {
      left: 0,
      username: '<username>',
      image: '/assets/images/play/cap.webp',
      position: { top: '45px' },
    },
    {
      left: 40,
      username: '<username>',
      image: '/assets/images/play/cap.webp',
      position: { top: '0px' },
    },
    {
      left: 75,
      username: '<username>',
      image: '/assets/images/play/froggy.webp',
      position: { top: '40px' },
    },
  ];

  return (
    <div className="bg-linear-360 from-blue-50 from-0% to-blue-100 to-100% py-4 px-6 rounded-b-3xl">
      <h1 className="mb-4.5 text-center text-white font-semibold text-2xl">
        Лидеры битв
      </h1>
      <div className="min-h-50 max-w-89 mx-auto relative mb-4">
        {battleLeaders.map((leader, index) => {
          // console.log('Math.pow(50, index)', Math.pow(50, index));

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${leader.left}%`,
                top: leader.position.top,
              }}>
              <div className="pb-[69%] relative">
                <img
                  alt="Leader"
                  src={leader.image}
                  className="absolute inset-0 size-full object-cover"
                />
              </div>

              <div className="grid place-items-center -mt-1 relative">
                <Avatar
                  className="size-10.5 -mb-1.5 relative"
                  url="/assets/images/leaders/avatar.webp"
                />

                <div className=" text-tiny font-thin flex items-center bg-gray-50/30 border border-white/30 shadow-[0px_4px_4px_0px_--alpha(var(--color-black)_/_7%)] min-h-5.5 px-3 text-center rounded-full">
                  {`<username>`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h6 className="text-eight font-medium px-2 mb-1">Твой ранг</h6>
        <div className="flex items-center justify-between bg-dark-blue-150 rounded-lg px-3 min-h-13">
          <div className="flex items-center gap-2">
            <span>#1324</span>
            <span>{`<Вы>`}</span>
          </div>

          <div className="text-sm font-medium flex items-center">
            <span>2 000</span>
            <Icons name="ton" width={22} height={22} />
          </div>
        </div>
      </div>
    </div>
  );
};
