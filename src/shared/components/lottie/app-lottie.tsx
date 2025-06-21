import Lottie, { type LottieComponentProps } from 'lottie-react';

type AppLottieProps = {
  animation: unknown;
  className?: string;
} & Omit<LottieComponentProps, 'animationData'>;

export const AppLottie = (props: AppLottieProps) => {
  const { animation, className, ...restProps } = props;

  return (
    <Lottie
      loop={true}
      autoplay={true}
      className={className}
      animationData={animation}
      {...restProps}
    />
  );
};
