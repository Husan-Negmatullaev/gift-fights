import { Icons } from '@/shared/ui/icons/icons';
import clsx from 'clsx';
import type { GiftSizesType } from '../model/types/gift-types';
import { GIFT_SIZES } from '../constants/gift-border-sizes-constants';

type GiftBorderCardProps = {
  className?: string;
  size: GiftSizesType;
};

export const GiftBorderCard = (props: GiftBorderCardProps) => {
  const { size, className } = props;

  return (
    <article
      className={clsx(
        className,
        GIFT_SIZES[size].card,
        'bg-dark-blue-50 text-white rounded-four',
      )}>
      <div className={clsx(GIFT_SIZES[size].image, 'pb-[95%] relative')}>
        <img
          alt="mario gift"
          src="/assets/images/gifts/gift.webp"
          className="absolute size-full inset-0 object-cover rounded-four"
        />
      </div>
      <header
        className={clsx(
          GIFT_SIZES[size].title,
          GIFT_SIZES[size].header,
          'flex items-center justify-between font-medium',
        )}>
        <h5>Plush Pepe</h5>
        <p>#1</p>
      </header>
      <button
        type="button"
        className={clsx(
          GIFT_SIZES[size].button,
          'cursor-pointer font-medium flex items-center justify-center bg-blue  w-full',
        )}>
        <Icons name="ton" className="size-5" />
        <span>10</span>
      </button>
    </article>
  );
};
