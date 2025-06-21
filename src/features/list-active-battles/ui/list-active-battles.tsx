import { LobbyBattle } from '@/entities/battle';

export const ListActiveBattles = () => {
  return (
    <ul>
      <li>
        <LobbyBattle min={10} max={10} />
      </li>
    </ul>
  );
};
