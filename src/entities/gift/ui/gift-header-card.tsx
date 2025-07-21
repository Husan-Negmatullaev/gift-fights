// import { TouchableLottie } from '@/shared/components/lottie/touchable-lottie';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { Icons } from '@/shared/ui/icons/icons';
// import Gift from '@/shared/assets/lottie/berrybox.json';

type GiftHeaderCardProps = {
  url?: string;
  avatar?: string;
  name?: string;
};

export const GiftHeaderCard = (props: GiftHeaderCardProps) => {
  const { url, name } = props;

  const hideHeader = Boolean(name);

  return (
    <article className="bg-dark-blue-500 grid grid-rows-[auto_1fr_auto] rounded-lg overflow-hidden">
      {hideHeader && (
        <header className="flex gap-1 items-center px-1 mb-1 pt-1">
          <Avatar url="/assets/images/leaders/avatar.webp" className="size-3" />

          <h5 className="text-six">{name}</h5>
        </header>
      )}

      {url ? (
        <div className="relative pb-[100%] mb-1">
          {/* <TouchableLottie
            animation={Gift}
            className="absolute size-full inset-0 object-cover overflow-hidden rounded-four"
          /> */}
          {/* <img
            src={url}
            alt="gift"
            className="absolute size-full inset-0 object-cover"
          /> */}
        </div>
      ) : (
        <div className="bg-dark-blue-400 grid place-content-center mb-1">
          <Icons
            width={40}
            height={60}
            name="question"
            className="text-white/36"
          />
        </div>
      )}

      <div className="px-1 pb-1">
        <h1 className="text-tiny mb-1">{`<gift name>`}</h1>
        {url && (
          <button
            type="button"
            className="min-h-5 w-full cursor-pointer text-nine bg-blue px-1 rounded-lg flex items-center gap-1 justify-between">
            <div className="flex items-center gap-0.5">
              <Icons name="ton" width={16} height={16} />
              <span>5 000</span>
            </div>

            <span className="font-bold">26%</span>
          </button>
        )}
      </div>
    </article>
  );
};
