import { DynamicWindowContext } from './DynamicWindowContext';
import { useAllUrlWindows } from '@/app/_experimental/_windows';
import { usePathname } from 'next/navigation';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Mosaic, MosaicNode } from 'react-mosaic-component';

// nødvendig for layout

export interface WindowWrapperProps {
  /** Innholdet i det låste (første) vinduet */
  children?: React.ReactNode;
  /** Lukk alle dynamiske vinduer når route (pathname) endres. Default: true */
  closeOnRouteChange?: boolean;
}

interface WindowItem {
  id: string;
  navigasjon?: React.ReactNode;
  onClose?: () => void;
  content: React.ReactElement;
  /** Egendefinert header (erstatter standard header med back + close). Hvis satt rendres ikke default header. */
  customHeader?: React.ReactNode;
  /** Enkel tittel som vises i standard header hvis verken customHeader eller navigasjon er satt */
  title?: React.ReactNode;
}

// ---------------- Window context ----------------
interface WindowContextValue {
  addWindow: (props: {
    id: string;
    onClose?: () => void;
    navigasjon?: React.ReactNode;
    content: React.ReactElement;
    /** Egendefinert header som skal brukes i stedet for standard header */
    customHeader?: React.ReactNode;
    /** Enkel tittel for standard header */
    title?: React.ReactNode;
    /** Position parameter ignoreres nå - kun én forhåndsvisning tillatt */
    position?: 'left' | 'right';
  }) => string; // return id
  updateWindow: (id: string, patch: Partial<Omit<WindowItem, 'id'>>) => void;
  removeWindow: (id: string) => void;
  listWindows: () => string[];
}

const WindowContext = React.createContext<WindowContextValue | undefined>(
  undefined,
);

export const useWindows = () => {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error('useWindows må brukes innenfor <WindowWrapper>');
  return ctx;
};

// ---------------- Komponent ----------------
const LOCKED_ID = '__locked__';
const MIN_WINDOW_PX = 480; // Minimum bredde per vindu

const WindowWrapper: React.FC<WindowWrapperProps> = ({
  children,
  closeOnRouteChange = true,
}) => {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  // Lukk forhåndsvisning ved navigasjon
  useEffect(() => {
    if (!closeOnRouteChange) return;
    if (lastPathRef.current === null) {
      lastPathRef.current = pathname;
      return;
    }
    if (lastPathRef.current !== pathname) {
      setPreviewWindow(null);
    }
    lastPathRef.current = pathname;
  }, [pathname, closeOnRouteChange]);

  const [elements, setElements] = useState<Record<string, WindowItem>>({
    [LOCKED_ID]: {
      id: LOCKED_ID,
      content: (
        <div className='h-full w-full flex flex-col min-h-0 min-w-[480px]'>
          {children}
        </div>
      ),
    },
  });

  // Holder kun ett forhåndsvisningsvindu om gangen
  const [previewWindow, setPreviewWindow] = useState<string | null>(null);
  const [splitPercentage, setSplitPercentage] = useState<number>(40);

  // Oppdater locked vindu når children endres
  useEffect(() => {
    setElements((prev) => ({
      ...prev,
      [LOCKED_ID]: {
        id: LOCKED_ID,
        content: (
          <div className='h-full w-full flex flex-col min-h-0 min-w-[480px]'>
            {children}
          </div>
        ),
      },
    }));
  }, [children]);

  // Spor bredde på container for å kunne klampe split ved resizing
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const update = () => setContainerWidth(el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const clampSplit = useCallback(
    (pct: number | undefined): number | undefined => {
      if (typeof pct !== 'number') return pct;
      if (containerWidth <= 0) return pct;
      const minPct = (MIN_WINDOW_PX / containerWidth) * 100;
      if (minPct * 2 >= 100) {
        return Math.min(pct, 100 - minPct);
      }
      return Math.min(Math.max(pct, minPct), 100 - minPct);
    },
    [containerWidth],
  );

  const addWindow = useCallback<WindowContextValue['addWindow']>(
    ({
      id,
      onClose,
      navigasjon,
      content,
      customHeader,
      title,
      // position ignoreres - kun én forhåndsvisning tillatt
    }) => {
      // Hvis det allerede finnes et forhåndsvisningsvindu, kall onClose for det
      if (previewWindow && previewWindow !== id) {
        const existingWindow = elements[previewWindow];
        if (existingWindow?.onClose) {
          try {
            existingWindow.onClose();
          } catch (e) {
            if (process.env.NODE_ENV === 'development') {
              // eslint-disable-next-line no-console
              console.warn(
                '[WindowWrapper] onClose feilet ved vindubytte',
                previewWindow,
                e,
              );
            }
          }
        }
      }

      setElements((prev) => ({
        ...prev,
        [id]: {
          id,
          navigasjon,
          onClose,
          content,
          customHeader,
          title,
        },
      }));
      setPreviewWindow(id);

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[WindowWrapper] addWindow (forhåndsvisning)', id);
      }
      return id;
    },
    [previewWindow, elements],
  );

  const removeWindow = useCallback<WindowContextValue['removeWindow']>((id) => {
    if (id === LOCKED_ID) return;

    setElements((prev) => {
      const target = prev[id];
      if (!target) return prev;

      const next = { ...prev };
      delete next[id];

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[WindowWrapper] removeWindow', id);
      }
      return next;
    });

    setPreviewWindow((prev) => (prev === id ? null : prev));
  }, []);

  const updateWindow = useCallback<WindowContextValue['updateWindow']>(
    (id, patch) => {
      setElements((prev) => {
        const item = prev[id];
        if (!item) return prev;
        return { ...prev, [id]: { ...item, ...patch } };
      });
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[WindowWrapper] updateWindow', id);
      }
    },
    [],
  );

  const listWindows = useCallback(
    () => Object.keys(elements).filter((k) => k !== LOCKED_ID),
    [elements],
  );

  // Håndter alle URL-vinduer
  useAllUrlWindows(addWindow, removeWindow);

  const ctxValue = useMemo<WindowContextValue>(
    () => ({ addWindow, updateWindow, removeWindow, listWindows }),
    [addWindow, updateWindow, removeWindow, listWindows],
  );

  // Bygg mosaic-verdi: enten bare locked, eller locked + preview
  const mosaicValue: MosaicNode<string> = useMemo(() => {
    if (!previewWindow) return LOCKED_ID;

    return {
      direction: 'row',
      first: LOCKED_ID,
      second: previewWindow,
      splitPercentage,
    };
  }, [previewWindow, splitPercentage]);

  return (
    <WindowContext.Provider value={ctxValue}>
      <div
        id='windows'
        ref={containerRef}
        className='w-full flex-1 flex flex-col min-h-0 overflow-hidden '
      >
        <Mosaic<string>
          value={mosaicValue}
          onChange={(next) => {
            if (!next) return;
            if (typeof next === 'string') return;

            // Kun tillat endring av split-prosent
            if (
              next.direction === 'row' &&
              typeof next.splitPercentage === 'number'
            ) {
              const clamped = clampSplit(next.splitPercentage);
              setSplitPercentage(clamped ?? next.splitPercentage);
            }
          }}
          renderTile={(id) => {
            const isDynamic = id !== LOCKED_ID;
            const item = elements[id];
            const content = item?.content;
            const customHeader = item?.customHeader;
            const isPreview = id === previewWindow;

            return (
              <DynamicWindowContext.Provider
                value={{
                  isDynamic,
                  onRequestClose: isDynamic
                    ? () => {
                        try {
                          item?.onClose?.();
                        } finally {
                          removeWindow(id);
                        }
                      }
                    : undefined,
                }}
              >
                <div
                  className={
                    'h-full w-full flex flex-col min-h-0 min-w-[480px]' +
                    (isPreview ? ' pl-0' : '')
                  }
                >
                  <div
                    id={id === LOCKED_ID ? 'window-locked' : `window-${id}`}
                    className='h-full w-full flex flex-col min-h-0'
                    data-window-type={id === LOCKED_ID ? 'locked' : 'dynamic'}
                  >
                    {customHeader && customHeader}
                    {content}
                    {!content && (
                      <div className='text-xs text-red-600'>
                        Ingen innhold for id: {id}
                      </div>
                    )}
                  </div>
                </div>
              </DynamicWindowContext.Provider>
            );
          }}
          className='h-full'
        />
      </div>
    </WindowContext.Provider>
  );
};

export default WindowWrapper;
