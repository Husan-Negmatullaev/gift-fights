import Plus from "@/shared/assets/icons/plus.svg?react";
import Rocket from "@/shared/assets/icons/rocket.svg?react";
import Ton from "@/shared/assets/icons/ton.svg?react";
import Trophy from "@/shared/assets/icons/trophy.svg?react";
import UserGroup from "@/shared/assets/icons/user-group.svg?react";
import User from "@/shared/assets/icons/user.svg?react";
import Check from "@/shared/assets/icons/check.svg?react";
import Home from "@/shared/assets/icons/home.svg?react";
import Question from "@/shared/assets/icons/question.svg?react";
import Box from "@/shared/assets/icons/box.svg?react";
import Cross from "@/shared/assets/icons/cross.svg?react";
import SpinArrowBottom from "@/shared/assets/icons/spin-arrow-bottom.svg?react";

import type { IconComponentType, IconNamesType } from "../types/icon-types";

export const ICON_COMPONENTS: Record<IconNamesType, IconComponentType> = {
  box: Box,
  ton: Ton,
  user: User,
  plus: Plus,
  home: Home,
  check: Check,
  cross: Cross,
  rocket: Rocket,
  trophy: Trophy,
  question: Question,
  "user-group": UserGroup,
  "spin-arrow-bottom": SpinArrowBottom,
};
