import { useCallback } from 'react';

export const useImageLoader = () => {
  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const imgElement = new Image();
      imgElement.crossOrigin = 'anonymous';

      imgElement.onload = () => resolve(imgElement);
      imgElement.onerror = (error) => {
        console.warn(`Failed to load image: ${src}`, error);
        reject(error);
      };

      imgElement.src = src;
    });
  }, []);

  const loadImages = useCallback(
    async (urls: string[]): Promise<Map<string, HTMLImageElement>> => {
      const imageMap = new Map<string, HTMLImageElement>();

      const loadPromises = urls.map(async (url) => {
        try {
          const image = await loadImage(url);
          imageMap.set(url, image);
        } catch (error) {
          console.warn(`Failed to load image: ${url}`, error);
        }
      });

      await Promise.all(loadPromises);
      return imageMap;
    },
    [loadImage],
  );

  return { loadImage, loadImages };
};
