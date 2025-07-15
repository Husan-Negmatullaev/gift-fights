import { Icons } from '@/shared/ui/icons/icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import type { GiftSizesType } from '../model/types/gift-types';
import { GIFT_SIZES } from '../constants/gift-border-sizes-constants';
import { TouchableLottie } from '@/shared/components/lottie/touchable-lottie';

type GiftBorderCardProps = {
  active?: boolean;
  size: GiftSizesType;
  onClick(): void;

  slug: string;
  title: string;
  price: number;

  className?: string;
};

export const GiftBorderCardVariantThree = (props: GiftBorderCardProps) => {
  const { slug, title, price, size, active, onClick, className } = props;

  const giftUrl = `https://nft.fragment.com/gift/${slug}.lottie.json`;

  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    fetch(giftUrl)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, [giftUrl]);

  return (
    <button
      onClick={onClick}
      className={clsx(
        className,
        GIFT_SIZES[size].card,
        active &&
          'border border-white shadow-[0px_0px_7.8px_0px_--alpha(var(--color-blue-100)_/_72%)] bg-dark-blue-850',
        !active && 'bg-dark-blue-50',
        'text-white rounded-md relative',
      )}>
      <div
        className={clsx(
          GIFT_SIZES[size].image,
          'relative pb-[99%] rounded-four overflow-hidden',
        )}>
        <TouchableLottie
          // animation={Gift}
          // animation={giftUrl}
          animation={animationData}
          className="absolute inset-0 size-full object-cover"
        />
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
          'cursor-pointer font-medium flex items-center justify-center bg-blue  w-full',
        )}>
        <Icons name="ton" className="size-5" />
        <span>{price}</span>
      </div>
    </button>
  );
};
