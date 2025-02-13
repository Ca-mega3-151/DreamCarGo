import { useMediaQuery } from '~/shared/ReactJS';

export const useIsMobile = () => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  return isMobile;
};
