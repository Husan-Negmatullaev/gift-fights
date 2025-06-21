import { useId, type ComponentPropsWithRef } from 'react';
import { Icons } from '../icons/icons';
import clsx from 'clsx';
import type { VariantCheckboxType } from '@/shared/types/checkbox-types';
import { CHECKBOX_VARIANTS_CONSTANTS } from '@/shared/constants/checkbox-constants';

type CheckboxProps = {
  wrapperClassName?: string;
  variant: VariantCheckboxType;
} & Omit<ComponentPropsWithRef<'input'>, 'type' | 'id'>;

export const Checkbox = (props: CheckboxProps) => {
  const { wrapperClassName, className, variant, ...restProps } = props;
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={clsx(
        wrapperClassName,
        CHECKBOX_VARIANTS_CONSTANTS[variant],
        'grid place-content-center size-7 rounded-md has-checked:bg-blue transition-colors ',
      )}>
      <input
        id={id}
        type="checkbox"
        className={clsx(className, 'peer sr-only')}
        {...restProps}
      />
      <Icons
        name="check"
        className="text-transparent peer-checked:text-white transition-colors"
      />
    </label>
  );
};
