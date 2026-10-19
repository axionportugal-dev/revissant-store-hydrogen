import {useEffect, useState} from 'react';

export function useScrollThreshold(thresholdPx = 50) {
  const [isBelowThreshold, setIsBelowThreshold] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setIsBelowThreshold(window.scrollY < thresholdPx);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [thresholdPx]);

  return {isBelowThreshold};
}
