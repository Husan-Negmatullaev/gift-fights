import { Icons } from "@/shared/ui/icons/icons";
import { useState, useEffect } from "react";
import clsx from "clsx";
import type { GiftSizesType } from "../model/types/gift-types";
import { GIFT_SIZES } from "../constants/gift-border-sizes-constants";
import { TouchableLottie } from "@/shared/components/lottie/touchable-lottie";

type GiftBorderCardProps = {
  className?: string;
  size: GiftSizesType;

  slug: string;
  title: string;
  price: number;
};

export const GiftBorderCard = (props: GiftBorderCardProps) => {
  const { size, className, slug, title, price } = props;

  const giftUrl = `https://nft.fragment.com/gift/${slug}.lottie.json`;

  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    fetch(giftUrl)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, [giftUrl]);

  return (
    <article
      className={clsx(
        className,
        GIFT_SIZES[size].card,
        "bg-dark-blue-50 text-white rounded-four",
      )}
    >
      <div
        className={clsx(
          GIFT_SIZES[size].image,
          "pb-[95%] relative overflow-hidden rounded-four",
        )}
      >
        {/* <img
          alt="mario gift"
          src="/assets/images/gifts/gift.webp"
          className="absolute size-full inset-0 object-cover rounded-four"
        /> */}
        <TouchableLottie
          animation={animationData}
          className="absolute size-full inset-0 object-cover overflow-hidden rounded-four"
        />
      </div>
      <header
        className={clsx(
          GIFT_SIZES[size].title,
          GIFT_SIZES[size].header,
          "flex items-center justify-between font-medium",
        )}
      >
        <h5>{title}</h5>
        {/* <p>#{slug}</p> */}
      </header>
      <div
        className={clsx(
          GIFT_SIZES[size].button,
          "font-medium flex items-center justify-center bg-blue w-full",
        )}
      >
        <Icons name="ton" className="size-2.5" />
        <span>{price}</span>
      </div>
    </article>
  );
};
