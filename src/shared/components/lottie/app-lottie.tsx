import Lottie from 'lottie-react';

type AppLottieProps = {
  animation: unknown;
  className?: string;
};

export const AppLottie = (props: AppLottieProps) => {
  const { animation, className } = props;

  return (
    <Lottie
      loop={true}
      autoplay={true}
      className={className}
      animationData={animation}
    />
  );
};
