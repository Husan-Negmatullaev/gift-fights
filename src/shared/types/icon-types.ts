import type { ComponentPropsWithRef, FunctionComponent } from 'react';

export type IconNamesType =
  | 'ton'
  | 'box'
  | 'cross'
  | 'home'
  | 'plus'
  | 'user'
  | 'rocket'
  | 'check'
  | 'trophy'
  | 'loader'
  | 'question'
  | 'user-group'
  | 'spin-arrow-bottom';

export type IconComponentType = FunctionComponent<IconProps>;

export type IconProps = ComponentPropsWithRef<'svg'> & {
  desc?: string;
  title?: string;
  titleId?: string;
  descId?: string;
  hidden?: boolean;
};
