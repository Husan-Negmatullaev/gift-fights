import { CreateLobby } from '@/pages/create-lobby';
import { Inventory } from '@/pages/inventory';
import { ActiveBattles } from '@/pages/active-battles';
import { Leaders } from '@/pages/leaders';
import { Play } from '@/pages/play';
import { Profile } from '@/pages/profile';
import { Layout } from '@/widgets/layout';
import { createBrowserRouter } from 'react-router';
import { JoinLobby } from '@/pages/join-lobby';
import { LobbyPlayers } from '@/pages/lobby-players';
import { Spin, Result } from '@/pages/spin';
import { Fight } from '@/pages/fight';

export const BROWSER_ROUTERS = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Play,
      },
      {
        path: 'leaders',
        Component: Leaders,
      },
      {
        path: 'inventory',
        Component: Inventory,
      },
      {
        path: 'profile',
        Component: Profile,
      },
      {
        path: 'create-lobby',
        Component: CreateLobby,
      },
      {
        path: 'active-lobby',
        Component: ActiveBattles,
      },
      {
        path: 'join-lobby',
        Component: JoinLobby,
      },
      {
        path: 'lobby-players/:id',
        Component: LobbyPlayers,
      },
      {
        path: 'spin',
        children: [
          {
            index: true,
            Component: Spin,
          },
          {
            path: 'result',
            Component: Result,
          },
        ],
      },

      {
        path: 'fight',
        Component: Fight,
      },
    ],
  },
]);
