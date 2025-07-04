import clsx from 'clsx';
import { Children, type ReactNode, useImperativeHandle, useState } from 'react';

export type TabsImperativeRef = {
  onForceTab: (tab: number) => void;
};

type TabsProps = {
  tabs: string[];
  className?: string;
  listClassName?: string;
  wrapperClassName?: string;
  tabsRef?: React.RefObject<TabsImperativeRef | null>;

  //! Children ОБЯЗАТЕЛЬНО ДОЛЖЕН БЫТЬ ОБЕРНУТ ВО FRAGMENT!
  children: ReactNode;
};

export const Tabs = (props: TabsProps) => {
  const {
    tabs,
    tabsRef,
    children,
    className,
    listClassName,
    wrapperClassName,
  } = props;
  const [selectedTab, setSelectedTab] = useState(0);

  const tabList = Children.toArray(children);

  const handleSelectTab = (tab: number) => () => setSelectedTab(tab);

  useImperativeHandle(
    tabsRef,
    () => ({
      onForceTab: (tab: number) => setSelectedTab(tab),
    }),
    [],
  );

  return (
    <div className={wrapperClassName}>
      <div
        className={clsx(
          listClassName,
          'grid grid-flow-col auto-cols-fr rounded-full bg-dark-blue-150',
        )}>
        {tabs.map((title, index) => (
          <button
            key={index}
            type="button"
            tabIndex={-1}
            onClick={handleSelectTab(index)}
            aria-selected={index === selectedTab}
            className="cursor-pointer text-white aria-selected:bg-blue-50 rounded-full text-sm min-h-8.5 flex items-center justify-center">
            {title}
          </button>
        ))}
      </div>

      <div className={className}>{tabList[selectedTab]}</div>
    </div>
  );
};
