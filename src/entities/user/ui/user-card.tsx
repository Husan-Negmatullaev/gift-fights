import { Avatar } from '@/shared/ui/avatar/avatar';
import clsx from 'clsx';

type UserCardProps = {
  imageWidth: number;
  className?: string;
};

export const UserCard = (props: UserCardProps) => {
  const { className, imageWidth } = props;

  return (
    <div
      className={clsx(
        className,
        'grid gap-1.5 rounded-xl bg-dark-blue-150/60 text-3xl text-white p-1.5',
      )}>
      {/* size-21.5 */}
      <div className="relative grid place-content-center bg-dark-blue-150/60 rounded-xl">
        <img alt="cap" width={imageWidth} src="/assets/images/play/cap.webp" />
      </div>
      <div className="grid place-content-center">
        <Avatar
          className="size-8 mx-auto relative -mb-1.5"
          url="/assets/images/leaders/avatar.webp"
        />
        <div className="px-3 text-tiny font-thin grid place-content-center bg-gray-50/30 border border-white/30 shadow-[0px_4px_4px_0px_--alpha(var(--color-black)_/_7%)] min-h-5.5 text-center rounded-full">
          {`<username>`}
        </div>
      </div>
    </div>
  );
};
