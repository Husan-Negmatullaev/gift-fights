import { Icons } from '@/shared/ui/icons/icons';
import { LeaderUsers } from './leader-users';

export const Leaders = () => {
  return (
    <div className="grid gap-3">
      <LeaderUsers />

      <div className="px-6">
        <h6 className="text-eight font-medium px-2 mb-1">Глобальный рейтинг</h6>
        <ul className="grid gap-2">
          {Array.from({ length: 100 }).map((_, index) => (
            <li className="group" key={index}>
              <div className="group-first:bg-blue bg-dark-blue-50 min-h-10.5 flex items-center gap-2 justify-between rounded-lg px-3">
                <div className="flex items-center gap-2 text-sm ">
                  <span>#1</span>
                  <span>{`<username>`}</span>
                </div>

                <div className="flex items-center font-medium text-sm">
                  <span>2 000</span>
                  <Icons name="ton" width={22} height={22} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
