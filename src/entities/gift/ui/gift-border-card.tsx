import { Icons } from '@/shared/ui/icons/icons';
import clsx from 'clsx';
import type { GiftSizesType } from '../model/types/gift-types';
import { GIFT_SIZES } from '../constants/gift-border-sizes-constants';
import { TouchableLottie } from '@/shared/components/lottie/touchable-lottie';
import { LoadableLottie } from '@/shared/components/lottie/loadable-lottie';

type GiftBorderCardProps = {
  className?: string;
  size: GiftSizesType;

  slug: string;
  title: string;
  price: number;
};

export const GiftBorderCard = (props: GiftBorderCardProps) => {
  const { size, className, slug, title, price } = props;

  return (
    <article
      className={clsx(
        className,
        GIFT_SIZES[size].card,
        'bg-dark-blue-50 text-white rounded-four',
      )}>
      <div
        className={clsx(
          GIFT_SIZES[size].image,
          'pb-[95%] relative overflow-hidden rounded-four',
        )}>
        <LoadableLottie slug={slug}>
          {(animationData) => (
            <TouchableLottie
              animation={animationData}
              className="absolute size-full inset-0 object-cover overflow-hidden rounded-four"
            />
          )}
        </LoadableLottie>
      </div>
      <header
        className={clsx(
          GIFT_SIZES[size].title,
          GIFT_SIZES[size].header,
          'flex items-center justify-between font-medium',
        )}>
        <h5>{title}</h5>
        {/* <p>#{slug}</p> */}
      </header>
      <div
        className={clsx(
          GIFT_SIZES[size].button,
          'font-medium flex items-center justify-center bg-blue w-full',
        )}>
        <Icons name="ton" className="size-2.5" />
        <span>{price}</span>
      </div>
    </article>
  );
};
