import { AnimationConfig } from '../src/types/types';

export const useAnimationConfig = () => {
  const defaultConfig: AnimationConfig = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    transition: {
      duration: 0.5,
      delay: 0,
      ease: 'easeOut',
    },
  };

  return { defaultConfig };
}; 