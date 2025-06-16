import clsx from 'clsx';
import { useId } from 'react';

type ToggleProps = {
  className?: string;
};

export const Toggle = (props: ToggleProps) => {
  const { className } = props;
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={clsx(
        className,
        'block w-9 h-5 relative has-checked:bg-blue-150 bg-dark-blue-200 rounded-full transition-colors',
      )}>
      <input id={id} type="checkbox" className="peer opacity-0 invisible" />
      <div className="bg-gray peer-checked:translate-x-full peer-checked:bg-white transition-[translate,background-color] size-4 absolute left-0 top-1/2 -translate-y-1/2 rounded-full mx-0.5" />
    </label>
  );
};
