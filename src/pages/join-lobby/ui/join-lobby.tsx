import { LobbyBattle } from '@/entities/battle';

export const JoinLobby = () => {
  return (
    <div className="py-5 px-6">
      <h1 className="font-bold text-xl text-white mb-3">
        Подключиться к лобби
      </h1>

      <ul className="grid gap-3">
        <li>
          <LobbyBattle min={10} max={10} />
        </li>
        <li>
          <LobbyBattle min={10} max={null} />
        </li>
        <li>
          <LobbyBattle min={null} max={null} disabled />
        </li>
      </ul>
    </div>
  );
};
