import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    mql.addEventListener('change', onChange);

    const timer = setTimeout(() => {
      setIsMobile(mql.matches);
    }, 0);

    return () => {
      clearTimeout(timer);
      mql.removeEventListener('change', onChange);
    };
  }, []);

  return !!isMobile;
}
