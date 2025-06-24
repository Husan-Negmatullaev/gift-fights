import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

type BottomButtonProps = {
  content: string;
  className?: string;
  withShadow?: boolean;
} & ComponentPropsWithRef<"button">;

export const BottomButton = (props: BottomButtonProps) => {
  const { content, className, withShadow, ...restProps } = props;

  return (
    <button
      type="button"
      className={clsx(
        className,
        withShadow &&
          "shadow-[0px_0px_19.6px_0px_--alpha(var(--color-blue-200)_/_50%)]",
        "min-h-13.5 rounded-2xl bg-linear-360 from-blue-50 from-0% to-blue-100 to-100% cursor-pointer text-white",
        "disabled:bg-dark-blue-700 disabled:text-white/50 disabled:shadow-none disabled:bg-linear-[none] disabled:cursor-not-allowed",
      )}
      {...restProps}
    >
      <span className="font-medium text-lg/5">{content}</span>
    </button>
  );
};
