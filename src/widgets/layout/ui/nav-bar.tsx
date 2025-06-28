import { useTelegram } from '@/entities/telegram';
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
  // {
  //   path: "/spin",
  //   icon: "rocket",
  //   text: "Играть",
  // },
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
  const telegram = useTelegram();

  const setNavLinkClassName = (props: NavLinkRenderProps) => {
    return clsx(
      telegram.platform !== 'tdesktop' ? 'min-h-13' : 'min-h-17',
      'rounded-2.5 grid place-items-center transition-colors',
      !props.isActive && 'text-white',
      props.isActive && 'text-blue bg-dark-blue-150',
    );
  };

  const adaptiveIconSize = telegram.platform !== 'tdesktop' ? 28 : 32;

  return (
    <div className="fixed left-0 bottom-0 w-full bg-dark-blue-50 py-2">
      <nav className="">
        <ul className="grid grid-flow-col items-center auto-cols-[68px] justify-between container-safe px-2.5">
          {navList.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} className={setNavLinkClassName}>
                <Icons
                  name={item.icon}
                  width={adaptiveIconSize}
                  height={adaptiveIconSize}
                />
                <span className="text-xs/3">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
