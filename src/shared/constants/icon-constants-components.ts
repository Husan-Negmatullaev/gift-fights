import Plus from '@/shared/assets/icons/plus.svg?react';
import Rocket from '@/shared/assets/icons/rocket.svg?react';
import Ton from '@/shared/assets/icons/ton.svg?react';
import Trophy from '@/shared/assets/icons/trophy.svg?react';
import UserGroup from '@/shared/assets/icons/user-group.svg?react';
import User from '@/shared/assets/icons/user.svg?react';
import Check from '@/shared/assets/icons/check.svg?react';

import type { IconComponentType, IconNamesType } from '../types/icon-types';

export const ICON_COMPONENTS: Record<IconNamesType, IconComponentType> = {
  user: User,
  ton: Ton,
  plus: Plus,
  trophy: Trophy,
  rocket: Rocket,
  check: Check,
  'user-group': UserGroup,
};
