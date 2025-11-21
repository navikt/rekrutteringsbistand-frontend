'use client';

import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface SideScrollProps {
  children: React.ReactNode;
  trimHøyde?: number;
  className?: string;
  enableHorizontalScroll?: boolean;
  autoHeight?: boolean;
  lagreScrollNøkkel?: string; // f.eks. `stilling-${stillingsId}`
}

// koden ser omfattende ut, men hver del dekker et konkret hull (layout-reflow, BFCache, dynamisk innhold)
export default function SideScroll({
  children,
  trimHøyde,
  className = '',
  enableHorizontalScroll = false,
  autoHeight,
  lagreScrollNøkkel,
}: SideScrollProps) {
  const [calculatedHeight, setCalculatedHeight] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const harRestaurertScroll = useRef(false);
  const lagringsNøkkel = lagreScrollNøkkel
    ? `SideScroll:${lagreScrollNøkkel}`
    : undefined;

  const innholdsSignatur = useMemo(
    () => `${Children.count(children)}:${calculatedHeight}`,
    [children, calculatedHeight],
  );

  const hentLagretScroll = useCallback(() => {
    if (typeof window === 'undefined') return undefined;
    if (!lagringsNøkkel) return undefined;
    const lagret = sessionStorage.getItem(lagringsNøkkel);
    return lagret ? Number(lagret) : undefined;
  }, [lagringsNøkkel]);

  const lagreScroll = useCallback(
    (posisjon: number) => {
      if (typeof window === 'undefined') return;
      if (!lagringsNøkkel) return;
      sessionStorage.setItem(lagringsNøkkel, String(posisjon));
    },
    [lagringsNøkkel],
  );

  const restoreScroll = useCallback(() => {
    if (!containerRef.current) return false;
    const lagret = hentLagretScroll();
    if (lagret === undefined) return false;

    containerRef.current.scrollTop = lagret;
    const gjenopprettet = Math.abs(containerRef.current.scrollTop - lagret) < 1;
    if (gjenopprettet) {
      harRestaurertScroll.current = true;
    }
    return gjenopprettet;
  }, [hentLagretScroll]);

  const scheduleRestore = useCallback(() => {
    if (harRestaurertScroll.current) return () => {};

    const forsøk = () => {
      if (!harRestaurertScroll.current) {
        restoreScroll();
      }
    };

    const raf1 = requestAnimationFrame(forsøk);
    const raf2 = requestAnimationFrame(() => requestAnimationFrame(forsøk));
    const timeout = window.setTimeout(forsøk, 300);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timeout);
    };
  }, [restoreScroll]);

  useEffect(() => {
    if (!lagringsNøkkel) return;
    harRestaurertScroll.current = false;
    const cancelScheduled = scheduleRestore();

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        harRestaurertScroll.current = false;
        scheduleRestore();
      }
    };
    const handlePageHide = () => {
      if (containerRef.current) {
        lagreScroll(containerRef.current.scrollTop);
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('pagehide', handlePageHide);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('pagehide', handlePageHide);
      cancelScheduled();
    };
  }, [lagringsNøkkel, lagreScroll, scheduleRestore]);

  useEffect(() => {
    if (!lagringsNøkkel) return;
    if (harRestaurertScroll.current) return;
    return scheduleRestore();
  }, [lagringsNøkkel, innholdsSignatur, scheduleRestore]);

  // Determine if we should use auto height
  const shouldUseAutoHeight = autoHeight ?? !trimHøyde;

  // Auto height calculation using viewport
  useLayoutEffect(() => {
    if (!shouldUseAutoHeight || !containerRef.current) return;

    const container = containerRef.current;

    const calculateAvailableHeight = () => {
      const containerRect = container.getBoundingClientRect();

      // Use viewport height and subtract container's distance from top
      const availableHeight = window.innerHeight - containerRect.top;

      // Subtract some padding for breathing room
      const finalHeight = Math.max(200, availableHeight - 40);

      setCalculatedHeight(`${finalHeight}px`);
    };

    // Initial calculation
    calculateAvailableHeight();

    // Watch for window resize and scroll events
    const handleWindowChange = () => calculateAvailableHeight();

    window.addEventListener('resize', handleWindowChange);
    window.addEventListener('scroll', handleWindowChange);

    // Use ResizeObserver to watch for layout changes
    const resizeObserver = new ResizeObserver(() => {
      calculateAvailableHeight();
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowChange);
      window.removeEventListener('scroll', handleWindowChange);
    };
  }, [shouldUseAutoHeight]);

  const getFinalHeight = () => {
    if (shouldUseAutoHeight && calculatedHeight) {
      return calculatedHeight;
    }

    return `calc(100vh - ${trimHøyde || 150}px)`;
  };

  const handleScroll = () => {
    setIsScrolling(true);
    if (containerRef.current) {
      lagreScroll(containerRef.current.scrollTop);
    }

    if (scrollTimeout) clearTimeout(scrollTimeout);
    const timeout = setTimeout(() => setIsScrolling(false), 1000);
    setScrollTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  const overflowClasses = enableHorizontalScroll
    ? 'overflow-auto'
    : 'overflow-y-auto overflow-x-hidden';

  return (
    <>
      <style jsx>{`
        .scroll-container {
          scrollbar-gutter: stable;
          box-sizing: border-box;
        }
        .scroll-container::-webkit-scrollbar {
          width: 16px;
          height: 16px;
        }
        .scroll-container::-webkit-scrollbar-track {
          background: transparent;
          margin: 2px;
        }
        .scroll-container::-webkit-scrollbar-thumb {
          background: ${isScrolling
            ? 'rgba(203, 213, 225, 0.8)'
            : 'transparent'};
          border-radius: 8px;
          border: 4px solid transparent;
          background-clip: content-box;
          transition: background 0.3s ease;
        }
        .scroll-container:hover::-webkit-scrollbar-thumb {
          background: rgba(203, 213, 225, 0.8);
          background-clip: content-box;
        }
        .scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.9) !important;
          background-clip: content-box;
        }
        .scroll-container::-webkit-scrollbar-corner {
          background: transparent;
        }

        .scroll-container {
          scrollbar-width: thin;
          scrollbar-color: ${isScrolling
              ? 'rgba(203, 213, 225, 0.8)'
              : 'transparent'}
            transparent;
          transition: scrollbar-color 0.3s ease;
        }
        .scroll-container:hover {
          scrollbar-color: rgba(203, 213, 225, 0.8) transparent;
        }

        /* Dark theme */
        :global(.dark) .scroll-container::-webkit-scrollbar-thumb {
          background: ${isScrolling ? 'rgba(75, 85, 99, 0.8)' : 'transparent'};
          background-clip: content-box;
        }
        :global(.dark) .scroll-container:hover::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          background-clip: content-box;
        }
        :global(.dark) .scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9) !important;
          background-clip: content-box;
        }
        :global(.dark) .scroll-container {
          scrollbar-color: ${isScrolling
              ? 'rgba(75, 85, 99, 0.8)'
              : 'transparent'}
            transparent;
        }
        :global(.dark) .scroll-container:hover {
          scrollbar-color: rgba(75, 85, 99, 0.8) transparent;
        }
      `}</style>
      <div
        ref={containerRef}
        className={`scroll-container w-full ${overflowClasses} ${className}`}
        style={{
          height: getFinalHeight(),
          paddingBottom: enableHorizontalScroll ? '8px' : '40px',
        }}
        onScroll={handleScroll}
      >
        {children}
      </div>
    </>
  );
}
