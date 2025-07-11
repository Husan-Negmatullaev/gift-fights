import { Outlet, ScrollRestoration } from 'react-router';
import { NavBar } from './nav-bar';
import { Header } from './header';
import { TelegramBackHandler } from '@/entities/telegram';
import { LoadUserProfile } from '@/widgets/loader-user-profile';

export const Layout = () => {
  return (
    <LoadUserProfile>
      <main className="pt-safe-app-top pb-safe-app-bottom grid grid-rows-1 container-safe">
        <Outlet />
      </main>
      <ScrollRestoration />
      <Header />
      <NavBar />

      <TelegramBackHandler />
    </LoadUserProfile>
  );
};
