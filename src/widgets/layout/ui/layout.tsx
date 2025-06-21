import { Outlet, ScrollRestoration } from 'react-router';
import { NavBar } from './nav-bar';
import { Header } from './header';

export const Layout = () => {
  return (
    <>
      <main className="pt-15 pb-21 grid grid-rows-1">
        <Outlet />
      </main>
      <ScrollRestoration />
      <Header />
      <NavBar />
    </>
  );
};
