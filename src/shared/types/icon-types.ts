import type { ComponentPropsWithRef, FunctionComponent } from 'react';

export type IconNamesType =
  | 'ton'
  | 'box'
  | 'cross'
  | 'plus'
  | 'user'
  | 'rocket'
  | 'check'
  | 'trophy'
  | 'question'
  | 'user-group';

export type IconComponentType = FunctionComponent<IconProps>;

export type IconProps = ComponentPropsWithRef<'svg'> & {
  desc?: string;
  title?: string;
  titleId?: string;
  descId?: string;
  hidden?: boolean;
};
