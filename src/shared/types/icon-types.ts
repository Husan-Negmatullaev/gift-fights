import type { ComponentPropsWithRef, FunctionComponent } from 'react';

export type IconNamesType =
  | 'ton'
  | 'plus'
  | 'user'
  | 'rocket'
  | 'trophy'
  | 'user-group';

export type IconComponentType = FunctionComponent<IconProps>;

export type IconProps = ComponentPropsWithRef<'svg'> & {
  desc?: string;
  title?: string;
  titleId?: string;
  descId?: string;
  hidden?: boolean;
};
