import { TOGGLE_VARIANTS_CONSTANTS } from '@/shared/constants/toggle-constants';
import type { ToggleVariantsType } from '@/shared/types/toggle-types';
import clsx from 'clsx';
import { useId } from 'react';

type ToggleProps = {
  className?: string;
  variant: ToggleVariantsType;
};

export const Toggle = (props: ToggleProps) => {
  const { className, variant } = props;
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={clsx(
        className,
        TOGGLE_VARIANTS_CONSTANTS[variant],
        'block w-9 h-5 relative has-checked:bg-blue-150 rounded-full transition-colors',
      )}>
      <input id={id} type="checkbox" className="peer opacity-0 invisible" />
      <div className="bg-gray peer-checked:translate-x-full peer-checked:bg-white transition-[translate,background-color] size-4 absolute left-0 top-1/2 -translate-y-1/2 rounded-full mx-0.5" />
    </label>
  );
};
