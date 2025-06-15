import { Icons } from '@/shared/ui/icons/icons';
import clsx from 'clsx';
import { NavLink, type NavLinkRenderProps } from 'react-router';

export const NavBar = () => {
  const setNavLinkClassName = (props: NavLinkRenderProps) => {
    return clsx(
      'min-h-17 rounded-2.5 grid place-items-center transition-colors',
      !props.isActive && 'text-white',
      props.isActive && 'text-blue bg-dark-blue-150',
    );
  };

  return (
    <nav className="grid items-center justify-center fixed left-0 bottom-0 min-h-21 w-full bg-dark-blue-50">
      <ul className="max-w-76.5 grid grid-flow-col auto-cols-[68px] gap-12.5">
        <li>
          <NavLink to="/leaders" className={setNavLinkClassName}>
            <Icons name="trophy" width={32} height={32} />
            <span className="text-xs/3">Лидеры</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={setNavLinkClassName}>
            <Icons name="rocket" width={32} height={32} />
            <span className="text-xs/3">Играть</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={setNavLinkClassName}>
            <Icons name="user" width={32} height={32} />
            <span className="text-xs/3">Профиль</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
