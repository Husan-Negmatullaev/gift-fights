import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';

type BottomButtonVariantTypes = 'primary' | 'secondary';

type BottomButtonProps = {
  content: ReactNode;
  className?: string;
  withShadow?: boolean;
  variant: BottomButtonVariantTypes;
} & Omit<ComponentPropsWithRef<'button'>, 'content'>;

const variants = {
  primary: {
    base: 'bg-linear-360 from-blue-50 from-0% to-blue-100 to-100%',
    shadow: 'shadow-[0px_0px_19.6px_0px_--alpha(var(--color-blue-200)_/_50%)]',
    disabled:
      'disabled:bg-dark-blue-700 disabled:text-white/50 disabled:bg-linear-[none]',
  },
  secondary: {
    shadow: '',
    disabled: '',
    base: 'bg-gray-300',
  },
};

export const BottomButton = (props: BottomButtonProps) => {
  const { content, className, withShadow, variant, ...restProps } = props;

  return (
    <button
      type="button"
      className={clsx(
        className,
        variants[variant].base,
        variants[variant].disabled,
        withShadow && variants[variant].shadow,
        'min-h-13.5 rounded-2xl cursor-pointer text-white disabled:cursor-not-allowed disabled:shadow-none',
      )}
      {...restProps}>
      <span className="font-bold text-lg/5">{content}</span>
    </button>
  );
};
