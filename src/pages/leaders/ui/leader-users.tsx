import { AppLottie } from "@/shared/components/lottie/app-lottie";
import { Avatar } from "@/shared/ui/avatar/avatar";
import { Icons } from "@/shared/ui/icons/icons";
import Cap from "@/shared/assets/lottie/cap.json";
import Froggy from "@/shared/assets/lottie/kissed-froggy.json";

export const LeaderUsers = () => {
  const battleLeaders = [
    {
      left: 0,
      animation: Cap,
      username: "<username>",
      position: { top: "45px" },
    },
    {
      left: 40,
      animation: Cap,
      username: "<username>",
      position: { top: "0px" },
    },
    {
      left: 75,
      image: Cap,
      animation: "<username>",
      position: { top: "40px" },
    },
  ];

  return (
    <div className="bg-linear-360 from-blue-50 from-0% to-blue-100 to-100% py-4 px-6 rounded-b-3xl">
      <h1 className="mb-4.5 text-center text-white font-semibold text-2xl">
        Лидеры битв
      </h1>
      <div className="min-h-50 max-w-89 mx-auto relative mb-4">
        {battleLeaders.map((leader, index) => {
          const animation = index < 2 ? Cap : Froggy;

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${leader.left}%`,
                top: leader.position.top,
              }}
            >
              <div style={{ width: 93, height: 80 }}>
                <AppLottie
                  animation={animation}
                  style={{
                    width: 93 * 1.8,
                    height: 80 * 1.8,
                    left: -35,
                    top: -20,
                  }}
                  className="absolute inset-0 object-cover"
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
