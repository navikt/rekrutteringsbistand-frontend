'use client';

import { useThemeProvider } from '@/providers/ThemeProvider';
import { useQueryState } from 'nuqs';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Mosaic, MosaicNode } from 'react-mosaic-component';

/**
 * Generisk todelt mosaic-layout styrt av en nuqs spørringsparameter.
 * Viser kun `children` i fullskjerm når parameteren er tom.
 * Når parameteren har verdi splittes skjermen og dynamisk vindu vises.
 */
export interface WindowViewProps<TParam extends string = string> {
  /** Navn på query-parameteren som styrer om dynamisk vindu skal vises */
  param: string;
  /** Valgfri standardverdi (typisk tom streng) */
  defaultValue?: string;
  /** Hovedinnhold som alltid vises (liste / primærvisning) */
  children: ReactNode;
  /** Funksjon som får parameterverdien og returnerer innholdet for dynamisk vindu */
  window: (paramValue: TParam, close: () => void) => ReactNode;
  /** Initielt split-prosent mellom hovedinnhold og vindu */
  initialSplitPct?: number;
  /** Minimum bredde (px) for hver rute */
  minWindowPx?: number;
  /** Deaktiver klamping ved resizing (låser initial split) */
  disableResizeClamp?: boolean;
  /** Kalles når vindu åpnes */
  onOpen?: (paramValue: TParam) => void;
  /** Kalles når vindu lukkes */
  onClose?: () => void;
  /** Valgfri egendefinerte id-er for mosaic tiles (unngå kollisjon ved flere instanser) */
  tileIds?: { main?: string; detail?: string };
}

export const WindowView: React.FC<WindowViewProps> = ({
  param,
  defaultValue = '',
  children,
  window,
  initialSplitPct = 50,
  minWindowPx = 420,
  disableResizeClamp = false,
  onOpen,
  onClose,
  tileIds,
}) => {
  const [paramValue, setParamValue] = useQueryState(param, {
    defaultValue,
    clearOnDefault: true,
  });

  const { windowMode } = useThemeProvider();

  // Spor container-bredde for å kunne klampe split
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const update = () => setContainerWidth(el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const [splitPercentage, setSplitPercentage] = useState(initialSplitPct); // gjeldende split-prosent

  const clampSplit = useCallback(
    (pct: number | undefined): number | undefined => {
      if (disableResizeClamp) return pct;
      if (typeof pct !== 'number') return pct;
      if (containerWidth <= 0) return pct;
      const minPct = (minWindowPx / containerWidth) * 100;
      if (minPct * 2 >= 100) return 100; // fallback: ikke nok plass til to vinduer
      return Math.min(Math.max(pct, minPct), 100 - minPct);
    },
    [containerWidth, minWindowPx, disableResizeClamp],
  );

  // Fyr open/close callbacks ved endring av parameterverdi
  useEffect(() => {
    if (paramValue) onOpen?.(paramValue as any);
    else onClose?.();
  }, [paramValue, onOpen, onClose]);

  const mosaicValue: MosaicNode<string> = useMemo(() => {
    if (!paramValue) return tileIds?.main || 'main';
    return {
      direction: 'row',
      first: tileIds?.main || 'main',
      second: tileIds?.detail || 'detail',
      splitPercentage,
    };
  }, [paramValue, splitPercentage, tileIds]);

  const close = () => setParamValue('');

  if (!windowMode) {
    return children;
  }

  return (
    <div ref={containerRef} className='flex flex-col h-full w-full min-h-0'>
      <Mosaic<string>
        value={mosaicValue}
        onChange={(next) => {
          if (!next || typeof next === 'string') return;
          if (
            next.direction === 'row' &&
            typeof next.splitPercentage === 'number'
          ) {
            setSplitPercentage(
              clampSplit(next.splitPercentage) ?? next.splitPercentage,
            );
          }
        }}
        renderTile={(id) => {
          if (id === (tileIds?.main || 'main'))
            return <WindowTile tile='main'>{children}</WindowTile>;
          if (id === (tileIds?.detail || 'detail'))
            return (
              <div className='pl-[6px]'>
                <WindowTile
                  tile='detail'
                  close={close}
                  paramName={param}
                  paramValue={paramValue as string}
                >
                  {window(paramValue, close) as any}
                </WindowTile>
              </div>
            );
          return (
            <div className='p-2 text-xs text-red-600'>Ukjent tile id: {id}</div>
          );
        }}
        className='h-full'
      />
    </div>
  );
};

// Context for å indikere hvilken tile (main/detail) innholdet rendres i
// Context info for et vindu
export interface WindowTileInfo {
  tile: 'main' | 'detail';
  /** Lukker dette nivåets vindu (kun definert for detail). For nested detail-vinduer arves nærmeste detail med lukke-funksjon hvis ikke overskrevet */
  close?: () => void;
  /** Parameternavn / verdi som styrer dette vinduet (kun detail) */
  paramName?: string;
  paramValue?: string;
}

export const WindowTileContext = createContext<WindowTileInfo | undefined>(
  undefined,
);

export function useWindowTile(): WindowTileInfo | undefined {
  return useContext(WindowTileContext);
}

const WindowTile: React.FC<{
  tile: 'main' | 'detail';
  children: React.ReactNode;
  close?: () => void;
  paramName?: string;
  paramValue?: string;
}> = ({ tile, children, close, paramName, paramValue }) => {
  const parent = useWindowTile();
  // Hvis parent allerede er detail, behold detail-status slik at nested vinduer fortsatt oppfattes som "inne i et vindu".
  const effectiveTile: 'main' | 'detail' =
    parent?.tile === 'detail' ? 'detail' : tile;
  // Velg riktig close: eksplisitt for denne instansen ellers arvet fra parent hvis parent er detail
  const effectiveClose =
    close || (effectiveTile === 'detail' ? parent?.close : undefined);
  const effectiveParamName = close ? paramName : parent?.paramName;
  const effectiveParamValue = close ? paramValue : parent?.paramValue;
  return (
    <WindowTileContext.Provider
      value={{
        tile: effectiveTile,
        close: effectiveClose,
        paramName: effectiveParamName,
        paramValue: effectiveParamValue,
      }}
    >
      {children}
    </WindowTileContext.Provider>
  );
};

export default WindowView;
