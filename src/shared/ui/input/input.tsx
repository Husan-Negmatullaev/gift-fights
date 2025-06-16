import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';

type InputProps = {
  label: string;
  right?: ReactNode;
} & ComponentPropsWithRef<'input'>;

export const Input = (props: InputProps) => {
  const { label, right, ...restProps } = props;
  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className="font-thin text-tiny mb-1 text-white/50 px-2 block">
        {label}
      </label>
      <label
        htmlFor={id}
        className="grid grid-cols-[1fr_auto] items-center bg-dark-blue-50 px-3 gap-1 rounded-md">
        <input
          id={id}
          {...restProps}
          className="min-h-9.5 placeholder:text-white/30 text-xs font-thin"
        />
        {right}
      </label>
    </div>
  );
};
