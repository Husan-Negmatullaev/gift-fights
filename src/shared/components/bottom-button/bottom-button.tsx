import clsx from 'clsx';

type BottomButtonProps = {
  content: string;
  className?: string;
};

export const BottomButton = (props: BottomButtonProps) => {
  const { content, className } = props;

  return (
    <button
      type="button"
      className={clsx(
        className,
        'min-h-13.5 rounded-2xl shadow-[0px_0px_19.6px_0px_--alpha(var(--color-blue-200)_/_50%)] bg-linear-360 from-blue-50 from-0% to-blue-100 to-100% cursor-pointer',
      )}>
      {/* <div className="bg-linear-0 from-gray-50 to-gray-50"> */}
      <span className="font-medium text-lg/5 text-white">{content}</span>
      {/* </div> */}
    </button>
  );
};
