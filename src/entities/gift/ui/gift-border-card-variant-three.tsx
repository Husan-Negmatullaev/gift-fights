import { Icons } from '@/shared/ui/icons/icons';
import clsx from 'clsx';
import type { GiftSizesType } from '../model/types/gift-types';
import { GIFT_SIZES } from '../constants/gift-border-sizes-constants';
import { TouchableLottie } from '@/shared/components/lottie/touchable-lottie';
import Gift from '@/shared/assets/lottie/berrybox.json';

type GiftBorderCardProps = {
  className?: string;
  size: GiftSizesType;

  active?: boolean;
};

export const GiftBorderCardVariantThree = (props: GiftBorderCardProps) => {
  const { size, className, active } = props;

  return (
    <article
      className={clsx(
        className,
        GIFT_SIZES[size].card,
        active &&
          'border border-white shadow-[0px_0px_7.8px_0px_--alpha(var(--color-blue-100)_/_72%)] bg-dark-blue-850',
        !active && 'bg-dark-blue-50',
        'text-white rounded-md',
      )}>
      <div
        className={clsx(
          GIFT_SIZES[size].image,
          'relative pb-[99%] rounded-four overflow-hidden',
        )}>
        <TouchableLottie
          animation={Gift}
          className="absolute inset-0 size-full object-cover"
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
