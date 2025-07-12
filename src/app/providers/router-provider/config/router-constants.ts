// import { CreateLobby } from "@/pages/create-lobby";
import { Inventory } from '@/pages/inventory';
// import { ActiveBattles } from "@/pages/active-battles";
import { Leaders } from '@/pages/leaders';
import { PlaySpin } from '@/pages/play';
import { Profile } from '@/pages/profile';
import { Layout } from '@/widgets/layout';
import { createBrowserRouter } from 'react-router';
// import { JoinLobby } from "@/pages/join-lobby";
import { LobbyPlayers } from '@/pages/lobby-players';
import { Result } from '@/pages/spin';
// import { Fight } from "@/pages/fight";
import { Main } from '@/pages/main';
// import { LoadUserProfile } from "@/widgets/loader-user-profile";

export const BROWSER_ROUTERS = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Main,
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
      // {
      //   path: 'create-lobby',
      //   Component: CreateLobby,
      // },
      // {
      //   path: 'active-lobby',
      //   Component: ActiveBattles,
      // },
      // {
      //   path: 'join-lobby',
      //   Component: JoinLobby,
      // },
      {
        path: 'lobby-players/:id',
        Component: LobbyPlayers,
      },
      {
        path: 'spin/:id',
        children: [
          {
            index: true,
            Component: PlaySpin,
          },
          {
            path: 'result/:winnerId',
            Component: Result,
          },
        ],
      },

      // {
      //   path: "fight",
      //   Component: Fight,
      // },
    ],
  },
  // {
  //   path: "/loading",
  //   Component: LoadUserProfile,
  // },
]);
