import type { IconNamesType } from '@/shared/types/icon-types';
import { Icons } from '@/shared/ui/icons/icons';
import clsx from 'clsx';
import { NavLink, type NavLinkRenderProps } from 'react-router';

const navList: Array<{ icon: IconNamesType; text: string; path: string }> = [
  {
    icon: 'trophy',
    text: 'Лидеры',
    path: '/leaders',
  },
  {
    path: '/spin',
    icon: 'rocket',
    text: 'Играть',
  },
  {
    path: '/',
    icon: 'home',
    text: 'Главная',
  },
  {
    icon: 'box',
    path: '/inventory',
    text: 'Инвентарь',
  },
  {
    icon: 'user',
    path: '/profile',
    text: 'Профиль',
  },
];

export const NavBar = () => {
  const setNavLinkClassName = (props: NavLinkRenderProps) => {
    return clsx(
      'min-h-17 rounded-2.5 grid place-items-center transition-colors',
      !props.isActive && 'text-white',
      props.isActive && 'text-blue bg-dark-blue-150',
    );
  };

  return (
    <nav className="grid items-center justify-center fixed left-0 bottom-0 min-h-21 w-full bg-dark-blue-50 py-2">
      <ul className="grid grid-flow-col auto-cols-[68px] gap-6 pb-safe-area-bottom">
        {navList.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path} className={setNavLinkClassName}>
              <Icons name={item.icon} width={32} height={32} />
              <span className="text-xs/3">{item.text}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
