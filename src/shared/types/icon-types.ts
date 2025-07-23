import type { ComponentPropsWithRef, FunctionComponent } from 'react';

export type IconNamesType =
  | 'ton'
  | 'box'
  | 'cross'
  | 'home'
  | 'plus'
  | 'info'
  | 'user'
  | 'share'
  | 'check'
  | 'swords'
  | 'rocket'
  | 'trophy'
  | 'loader'
  | 'question'
  | 'user-group'
  | 'chevron-left'
  | 'spin-arrow-bottom';

export type IconComponentType = FunctionComponent<IconProps>;

export type IconProps = ComponentPropsWithRef<'svg'> & {
  desc?: string;
  title?: string;
  titleId?: string;
  descId?: string;
  hidden?: boolean;
};
