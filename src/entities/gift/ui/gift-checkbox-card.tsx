import { Checkbox } from '@/shared/ui/checkbox/checkbox';
import clsx from 'clsx';
import { GIFT_SIZES } from '../constants/gift-border-sizes-constants';
import type { GiftSizesType } from '../model/types/gift-types';
import { Icons } from '@/shared/ui/icons/icons';
import { useEffect, useState, type ComponentPropsWithRef } from 'react';
import { TouchableLottie } from '@/shared/components/lottie/touchable-lottie';

type GiftCheckboxCardProps = {
  className?: string;
  size: GiftSizesType;
  checkbox: ComponentPropsWithRef<'input'>;

  slug: string;
  title: string;
  price: number;
};

export const GiftCheckboxCard = (props: GiftCheckboxCardProps) => {
  const { className, size, checkbox, slug, title, price } = props;

  const giftUrl = `https://nft.fragment.com/gift/${slug}.lottie.json`;

  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    fetch(giftUrl)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, [giftUrl]);

  return (
    <div className="relative group">
      <article
        className={clsx(
          className,
          GIFT_SIZES[size].card,
          'bg-dark-blue-50 text-white rounded-four has-checked:bg-dark-blue-650 transition-colors',
          // blocked && 'opacity-50 grayscale cursor-not-allowed',
        )}>
        <div className={clsx(GIFT_SIZES[size].image, 'relative')}>
          <TouchableLottie animation={animationData} className="size-38.5" />
          <Checkbox
            variant="bordered"
            wrapperClassName="absolute -top-1.5 -right-1.5"
            // disabled={blocked}
            {...checkbox}
          />
          {/* {blocked && (
            <div className="absolute inset-0 bg-red-500/20 rounded-four flex items-center justify-center">
              <Icons name="cross" className="size-6 text-red-500" />
            </div>
          )} */}
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
        <button
          type="button"
          // disabled={blocked}
          className={clsx(
            GIFT_SIZES[size].button,
            'cursor-pointer font-medium flex items-center justify-center bg-blue w-full',
            // blocked && 'opacity-50 cursor-not-allowed bg-gray-500',
          )}>
          <Icons name="ton" className="size-5" />
          <span>{price}</span>
        </button>
      </article>
    </div>
  );
};
