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
        'grid place-content-center size-6.5 border border-gray-100 rounded-md bg-dark-blue-1250 has-checked:border-blue-100 has-checked:bg-blue-100 transition-colors',
      )}>
      <input
        id={id}
        type="checkbox"
        className={clsx(className, 'peer sr-only')}
        {...restProps}
      />
      <Icons
        name="check"
        className="size-4 text-transparent peer-checked:text-white transition-colors"
      />
    </label>
  );
};
