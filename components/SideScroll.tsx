import { useEffect, useState } from 'react';

export interface SideScrollProps {
  children: React.ReactNode;
  excludeRef?:
    | React.RefObject<HTMLElement | null>
    | React.RefObject<HTMLElement | null>[]
    | null;
  trimHøyde?: number;
  className?: string;
  enableHorizontalScroll?: boolean;
}

export default function SideScroll({
  children,
  excludeRef,
  trimHøyde = 150,
  className = '',
  enableHorizontalScroll = false,
}: SideScrollProps) {
  const [calculatedHeight, setCalculatedHeight] = useState<string>('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    if (excludeRef) {
      const refs = Array.isArray(excludeRef) ? excludeRef : [excludeRef];

      let totalHeight = 0;
      refs.forEach((ref) => {
        if (ref.current) {
          totalHeight += ref.current.offsetHeight;
        }
      });

      if (totalHeight > 0) {
        const finalHeight = totalHeight + (trimHøyde || 0);
        setCalculatedHeight(`calc(100vh - ${finalHeight + 20}px)`);
      }
    }
  }, [excludeRef, trimHøyde]);

  const finalHeight =
    excludeRef && calculatedHeight
      ? calculatedHeight
      : `calc(100vh - ${trimHøyde || 100}px)`;

  const handleScroll = () => {
    setIsScrolling(true);

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    const timeout = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);

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
        .scroll-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .scroll-container::-webkit-scrollbar-thumb {
          background: ${isScrolling
            ? 'rgba(203, 213, 225, 0.8)'
            : 'transparent'};
          border-radius: 4px;
          transition: background 0.3s ease;
        }
        .scroll-container:hover::-webkit-scrollbar-thumb {
          background: rgba(203, 213, 225, 0.8);
        }
        .scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.9) !important;
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
        }
        :global(.dark) .scroll-container:hover::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
        }
        :global(.dark) .scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9) !important;
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
        className={`scroll-container w-full ${overflowClasses} pb-10 scrollbar-gutter-stable ${className}`}
        style={{ height: finalHeight }}
        onScroll={handleScroll}
      >
        {children}
      </div>
    </>
  );
}
