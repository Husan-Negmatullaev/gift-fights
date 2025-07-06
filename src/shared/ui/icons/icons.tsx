import { ICON_COMPONENTS } from "@/shared/constants/icon-constants-components";
import type { IconNamesType, IconProps } from "@/shared/types/icon-types";

type IconsProps = {
  name: IconNamesType;
} & IconProps;

export const Icons = (props: IconsProps) => {
  const { name, ...otherProps } = props;

  const Icon = ICON_COMPONENTS[name];

  return <Icon {...otherProps} />;
};
