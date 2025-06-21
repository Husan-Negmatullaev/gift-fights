import { ListActiveBattles } from '@/features/list-active-battles';
import { ListHistoryBattles } from '@/features/list-history-battles';

export const ActiveBattles = () => {
  return (
    <div className="py-5 px-6">
      <div className="mb-5">
        <h1 className="font-bold text-xl text-white mb-3">Активные битвы</h1>

        <ListActiveBattles />
      </div>

      <div>
        <h1 className="font-bold text-xl text-white mb-7">История</h1>
        <ListHistoryBattles />
      </div>
    </div>
  );
};
