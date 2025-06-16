import { CreateLobby } from '@/pages/create-lobby';
import { Leaders } from '@/pages/leaders';
import { Play } from '@/pages/play';
import { Profile } from '@/pages/profile';
import { Layout } from '@/widgets/layout/ui/layout';
import { createBrowserRouter } from 'react-router';

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
        path: 'profile',
        Component: Profile,
      },
      {
        path: 'create-lobby',
        Component: CreateLobby,
      },
    ],
  },
]);
