import { Outlet } from 'react-router';
import { NavBar } from './nav-bar';
import { Header } from './header';

export const Layout = () => {
  return (
    <>
      <main className="pt-15 pb-21">
        <Outlet />
      </main>
      <Header />
      <NavBar />
    </>
  );
};
