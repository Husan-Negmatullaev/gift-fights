import { Outlet, ScrollRestoration } from 'react-router';
import { NavBar } from './nav-bar';
import { Header } from './header';
import { TelegramBackHandler } from '@/entities/telegram';
import { LoadUserProfile } from '@/widgets/loader-user-profile';

export const Layout = () => {
  return (
    <LoadUserProfile>
      <div className="fixed mt-6 pt-safe-app-top pb-safe-app-bottom container-safe">
        <div className="size-68.5 bg-dark-blue-1200 blur-[12.5rem] rounded-full mx-auto" />
      </div>
      <main className="relative pt-safe-app-top pb-safe-app-bottom grid grid-rows-1 container-safe">
        <Outlet />
      </main>
      <Header />
      <NavBar />
      <ScrollRestoration />

      <TelegramBackHandler />
    </LoadUserProfile>
  );
};
