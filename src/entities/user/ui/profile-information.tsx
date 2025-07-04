import { Avatar } from '@/shared/ui/avatar/avatar';

export const ProfileInformation = () => {
  return (
    <article className="overflow-hidden relative bg-linear-180 from-blue-50 to-blue-100 text-white">
      <div className="grid gap-2 place-items-center relative p-4">
        <Avatar url="/assets/images/avatar.webp" className="size-24" />

        <h1 className="text-xl/6 font-medium">{'<nickname>'}</h1>
        <p>{'<username>'}</p>
      </div>
      <img
        alt="telegrams"
        src="/assets/images/play/telegrams.webp"
        className="absolute -top-[30%] pointer-events-none"
      />
    </article>
  );
};
