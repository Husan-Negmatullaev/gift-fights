import type { GiftSizesType } from '../model/types/gift-types';

export const GIFT_SIZES: Record<
  GiftSizesType,
  { image: string; header: string; title: string; button: string; card: string }
> = {
  lg: {
    card: 'p-1.5',
    image: 'mb-2',
    header: 'mb-2',
    title: 'text-sm',
    button: 'text-sm min-h-6.5 rounded-md',
  },
  md: {
    card: 'p-0.5',
    image: 'mb-0.5',
    header: 'mb-1',
    title: 'text-eight',
    button: 'text-eight min-h-3 rounded-two',
  },
};
