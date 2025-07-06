import clsx from 'clsx';
import Lottie, {
  type LottieComponentProps,
  type LottieRefCurrentProps,
} from 'lottie-react';
import { useRef, useState } from 'react';

type TouchableLottieProps = {
  animation: unknown;
  className?: string;
} & Omit<LottieComponentProps, 'animationData'>;

export const TouchableLottie = (props: TouchableLottieProps) => {
  const { animation, className, ...restProps } = props;
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      lottieRef.current?.play(); // запуск
    } else {
      lottieRef.current?.stop(); // если хочешь сброс
      setIsPlaying(false);
    }
  };

  return (
    <Lottie
      loop={false}
      autoplay={false}
      lottieRef={lottieRef}
      onClick={handleClick}
      animationData={animation}
      className={clsx('lottie-wrapper', className)}
      {...restProps}
    />
  );
};
