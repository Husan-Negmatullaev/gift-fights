import { useEffect, useState, type ReactNode } from 'react';

type LoadableLottieProps = {
  // url: string;
  slug: string;
  children: (
    animationData: unknown | null,
    loading: boolean,
    error: unknown | null,
  ) => ReactNode;
};

export const LoadableLottie = (props: LoadableLottieProps) => {
  const { slug, children } = props;
  const [animationData, setAnimationData] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  const giftUrl = `https://nft.fragment.com/gift/${slug}.lottie.json`;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(giftUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setAnimationData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [giftUrl]);

  return <>{children(animationData, loading, error)}</>;
};
