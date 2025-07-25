import { useTelegram } from "@/entities/telegram";
import { useNavigationContext } from "@/shared/contexts/navigation-context";
import type { IconNamesType } from "@/shared/types/icon-types";
import { Icons } from "@/shared/ui/icons/icons";
import clsx from "clsx";
import { NavLink, type NavLinkRenderProps } from "react-router";

const navList: Array<{ icon: IconNamesType; text: string; path: string }> = [
  {
    path: "/",
    icon: "home",
    text: "Играть",
  },
  {
    path: "/fights",
    icon: "fight",
    text: "Мои битвы",
  },
  {
    icon: "trophy",
    text: "Лидеры",
    path: "/leaders",
  },
  // {
  //   path: "/spin",
  //   icon: "rocket",
  //   text: "Играть",
  // },

  {
    icon: "box",
    path: "/inventory",
    text: "Инвентарь",
  },
  {
    icon: "user",
    path: "/profile",
    text: "Профиль",
  },
];

export const NavBar = () => {
  const telegram = useTelegram();
  const { isNavBarVisible } = useNavigationContext();

  const setNavLinkClassName = (props: NavLinkRenderProps) => {
    return clsx(
      telegram.platform !== "tdesktop" ? "min-h-13" : "min-h-17",
      "rounded-2.5 grid place-items-center transition-colors",
      !props.isActive && "text-[#A8A8A8]",
      props.isActive && "text-[#1AC9FF]",
    );
  };

  if (!isNavBarVisible) {
    return null;
  }

  return (
    <div className="fixed left-0 bottom-0 w-full py-2 bg-dark/70 backdrop-blur-2xl">
      <nav className="pb-navbar relative">
        <ul className="grid gap-2 grid-flow-col items-center justify-center auto-cols-[68px] container-safe px-2">
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
    </div>
  );
};
