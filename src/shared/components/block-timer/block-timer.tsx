import clsx from 'clsx';

type BlockTimerProps = {
  content: string;
  className?: string;
};

export const BlockTimer = (props: BlockTimerProps) => {
  const { className, content } = props;

  return (
    <div
      className={clsx(
        className,
        'grid place-content-center bg-dark-blue-150 rounded-xl min-h-10 text-base px-7.5',
      )}>
      <div>{content}</div>
    </div>
  );
};
