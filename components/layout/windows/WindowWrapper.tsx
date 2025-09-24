import { DynamicWindowContext } from './DynamicWindowContext';
import { useAllUrlWindows } from '@/app/_windows';
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
  /** Sekvensnummer i den reelle åpne-rekkefølgen (brukes for kaskadelukking) */
  openedAt: number;
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
    /** Plassering blant dynamiske vinduer. Default: right */
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

// ---------------- Hjelpefunksjoner for mosaic-tree ----------------
type Id = string; // enklere alias

// function insertBelow(current: MosaicNode<Id> | null, id: Id): MosaicNode<Id> {
//   if (!current) return id; // første dynamiske vindu
//   return {
//     direction: 'column',
//     first: current,
//     second: id,
//     splitPercentage: 50,
//   };
// }

// function insertAbove(current: MosaicNode<Id> | null, id: Id): MosaicNode<Id> {
//   if (!current) return id;
//   return {
//     direction: 'column',
//     first: id,
//     second: current,
//     splitPercentage: 50,
//   };
// }

// "after" = legg til som ny kolonne til høyre, bevarer eksisterende stack i venstre del av høyre side
function insertAfter(current: MosaicNode<Id> | null, id: Id): MosaicNode<Id> {
  if (!current) return id;
  return { direction: 'row', first: current, second: id, splitPercentage: 60 };
}

// Sett inn som ny kolonne helt til venstre (før eksisterende layout)
function insertBefore(current: MosaicNode<Id> | null, id: Id): MosaicNode<Id> {
  if (!current) return id;
  return { direction: 'row', first: id, second: current, splitPercentage: 60 };
}

function removeFromTree(
  node: MosaicNode<Id> | null,
  target: Id,
): MosaicNode<Id> | null {
  if (!node) return null;
  if (typeof node === 'string') return node === target ? null : node;
  const first = removeFromTree(node.first, target);
  const second = removeFromTree(node.second, target);
  if (first && second) return { ...node, first, second };
  return (first || second) ?? null; // komprimer treet
}

// Flater ut id'er (venstre -> høyre)
function flattenRow(node: MosaicNode<Id> | null): Id[] {
  if (!node) return [];
  if (typeof node === 'string') return [node];
  if (node.direction === 'row') {
    return [...flattenRow(node.first), ...flattenRow(node.second)];
  }
  // column: behold relative rekkefølge (først, så second)
  return [...flattenRow(node.first), ...flattenRow(node.second)];
}

// ---------------- Komponent ----------------
const LOCKED_ID = '__locked__';
const MIN_WINDOW_PX = 480; // Minimum bredde per vindu

const WindowWrapper: React.FC<WindowWrapperProps> = ({
  children,
  closeOnRouteChange = true,
}) => {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!closeOnRouteChange) return;
    if (lastPathRef.current === null) {
      lastPathRef.current = pathname;
      return;
    }
    if (lastPathRef.current !== pathname) {
      // Lukk alle dynamiske vinduer ved navigasjon.
      setElements((prev) => {
        const dyn = Object.values(prev).filter((w) => w.id !== LOCKED_ID);
        // Kall onClose for hvert vindu (wrap i try/catch så en feil ikke stopper resten)
        for (const w of dyn) {
          try {
            w.onClose?.();
          } catch (e) {
            if (process.env.NODE_ENV === 'development') {
              // eslint-disable-next-line no-console
              console.warn(
                '[WindowWrapper] onClose feilet ved route change',
                w.id,
                e,
              );
            }
          }
        }
        idsRef.current = new Set([LOCKED_ID]);
        return {
          [LOCKED_ID]: prev[LOCKED_ID],
        } as typeof prev;
      });
      setDynamicLayout(null);
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
      openedAt: 0,
    },
  });

  // Holder en synkron liste over IDer som finnes (inkluderer nylig la til vinduer før React-state er commitet)
  const idsRef = useRef<Set<string>>(new Set([LOCKED_ID]));

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
        openedAt: 0,
      },
    }));
  }, [children]);

  // Lagrer bare den dynamiske delen av layouten (til høyre eller alene når tilstede)
  const [dynamicLayout, setDynamicLayout] = useState<MosaicNode<Id> | null>(
    null,
  );
  const [rootSplit, setRootSplit] = useState<number>(35);
  // Split mellom de to synlige dynamiske vinduene når locked er skjult (>=2 dynamiske totalt)
  const [dynamicPairSplit, setDynamicPairSplit] = useState<number>(60);

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
      if (containerWidth <= 0) return pct; // ukjent bredde ennå
      const minPct = (MIN_WINDOW_PX / containerWidth) * 100;
      if (minPct * 2 >= 100) {
        // For smal skjerm til å oppfylle begge min-bredder; prioriter locked vindu og la dynamisk krympe
        return Math.min(pct, 100 - minPct); // sørg for at locked ikke blir for smal
      }
      return Math.min(Math.max(pct, minPct), 100 - minPct);
    },
    [containerWidth],
  );

  // Beregn synlige dynamiske vinduer, maks 2 dersom flere åpne
  const dynamicIds = useMemo(() => flattenRow(dynamicLayout), [dynamicLayout]);
  const moreThanTwo = dynamicIds.length > 1; // når vi får vindu #2 (dvs 2 dynamiske) skal locked skjules
  const visibleDynamicIds = moreThanTwo ? dynamicIds.slice(-2) : dynamicIds; // siste to hvis mange
  // brukes ikke lenger (back-knapp fjernet)

  // Bygg et rad-tre av visibleDynamicIds
  const buildRow = (ids: Id[]): MosaicNode<Id> | null => {
    if (ids.length === 0) return null;
    let tree: MosaicNode<Id> = ids[0];
    for (let i = 1; i < ids.length; i++) {
      tree = {
        direction: 'row',
        first: tree,
        second: ids[i],
        splitPercentage: 60,
      };
    }
    return tree;
  };

  const visibleDynamicLayout = useMemo(
    () => buildRow(visibleDynamicIds),
    [visibleDynamicIds],
  );

  // Full verdi til Mosaic: hvis locked skal skjules (>=2 dynamiske) viser vi kun de to dynamiske, ellers locked + ev. en dynamisk
  const mosaicValue: MosaicNode<Id> = useMemo(() => {
    if (!visibleDynamicLayout && !moreThanTwo) return LOCKED_ID; // Kun locked
    if (moreThanTwo) {
      // Kun to dynamiske synlige; tillat resizing mellom disse (lagres i dynamicPairSplit)
      if (visibleDynamicIds.length === 2) {
        return {
          direction: 'row',
          first: visibleDynamicIds[0],
          second: visibleDynamicIds[1],
          splitPercentage: dynamicPairSplit,
        } as MosaicNode<Id>;
      }
      return visibleDynamicLayout as MosaicNode<Id>;
    }
    if (!visibleDynamicLayout) return LOCKED_ID;
    return {
      direction: 'row',
      first: LOCKED_ID,
      second: visibleDynamicLayout,
      splitPercentage: rootSplit,
    };
  }, [
    visibleDynamicLayout,
    moreThanTwo,
    rootSplit,
    dynamicPairSplit,
    visibleDynamicIds,
  ]);

  const addWindow = useCallback<WindowContextValue['addWindow']>(
    ({
      id,
      onClose,
      navigasjon,
      content,
      customHeader,
      title,
      position = 'right',
    }) => {
      const alreadyExists = idsRef.current.has(id);
      if (alreadyExists) {
        // Flytt vinduet til samme posisjon som spesifisert for å opprettholde konsistent oppførsel
        // Dette sikrer at vinduer alltid havner på samme side når de oppdateres
        setDynamicLayout((prevLayout) => {
          // Fjern id fra treet og legg det inn igjen på spesifisert posisjon for å sikre synlighet
          const utenId = removeFromTree(prevLayout, id);
          return position === 'left'
            ? insertBefore(utenId, id)
            : insertAfter(utenId, id);
        });
        setElements((prev) => {
          const current = prev[id];
          if (!current) return prev; // (teoretisk) skulle ikke skje
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn(
              `[WindowWrapper] addWindow: vindu med id="${id}" finnes allerede – erstatter innhold & flytter til høyre for synlighet`,
            );
          }
          return {
            ...prev,
            [id]: {
              ...current,
              navigasjon: navigasjon ?? current.navigasjon,
              onClose: onClose ?? current.onClose, // Behold opprinnelig onClose hvis ingen ny
              content: content ?? current.content,
              customHeader: customHeader ?? current.customHeader,
              title: title ?? current.title,
              openedAt: Date.now() + Math.random(), // Oppdater tid så vinduet havner bakerst
            },
          };
        });
        return id;
      }

      // Registrer id umiddelbart (hindrer race hvis addWindow kalles to ganger før state commit)
      idsRef.current.add(id);

      // Legg vindu inn i layout helt til venstre eller høyre
      setDynamicLayout((prevLayout) =>
        position === 'left'
          ? insertBefore(prevLayout, id)
          : insertAfter(prevLayout, id),
      );
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[WindowWrapper] addWindow (ny)', id, {
          forcedPosition: position,
        });
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
          openedAt: Date.now() + Math.random(), // relativt monotont — høyere verdi => senere
        },
      }));
      return id;
    },
    [],
  );

  // Fjern ett vindu OG alle som ble åpnet etter det (kaskadelukking)
  const removeWindow = useCallback<WindowContextValue['removeWindow']>((id) => {
    if (id === LOCKED_ID) return;
    setElements((prev) => {
      const target = prev[id];
      if (!target) return prev;
      const cutoff = target.openedAt;
      const idsToRemove = Object.values(prev)
        .filter((w) => w.id !== LOCKED_ID && w.openedAt >= cutoff)
        .map((w) => w.id);

      // Oppdatér layout (fjern alle i ett pass)
      setDynamicLayout((prevLayout) => {
        if (!prevLayout) return prevLayout;
        const idsSet = new Set(idsToRemove);
        const removeMany = (
          node: MosaicNode<Id> | null,
        ): MosaicNode<Id> | null => {
          if (!node) return null;
          if (typeof node === 'string') return idsSet.has(node) ? null : node;
          const first = removeMany(node.first);
          const second = removeMany(node.second);
          if (first && second) return { ...node, first, second };
          return (first || second) ?? null;
        };
        return removeMany(prevLayout);
      });

      const next: typeof prev = { ...prev };
      for (const rid of idsToRemove) {
        delete next[rid];
        idsRef.current.delete(rid);
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          '[WindowWrapper] removeWindow(kaskade)',
          id,
          '->',
          idsToRemove,
        );
      }
      return next;
    });
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

  return (
    <WindowContext.Provider value={ctxValue}>
      <div
        id='windows'
        ref={containerRef}
        className='w-full flex-1 flex flex-col min-h-0 overflow-hidden '
      >
        <Mosaic<Id>
          value={mosaicValue}
          onChange={(next) => {
            // Tillat kun endring av split (resizing) og interne endringer på dynamisk del.
            if (!next) return;
            // Når locked er skjult opererer vi kun på de synlige dynamiske vinduene (maks 2). Resizing kan ignoreres.
            if (typeof next === 'string') {
              if (next === LOCKED_ID) {
                setDynamicLayout(null);
              }
              return;
            }
            if (moreThanTwo) {
              // Her viser vi kun siste to dynamiske vinduer (locked er skjult). Tillat lagring av split.
              if (
                next.direction === 'row' &&
                typeof next.splitPercentage === 'number'
              ) {
                const clamped = clampSplit(next.splitPercentage);
                setDynamicPairSplit(clamped ?? next.splitPercentage);
              }
              return; // Ikke endre det underliggende dynamicLayout-treet (som inneholder alle)
            }
            if (next.direction === 'row') {
              if (next.first === LOCKED_ID) {
                setDynamicLayout(next.second);
                if (typeof next.splitPercentage === 'number') {
                  setRootSplit(
                    clampSplit(next.splitPercentage) ?? next.splitPercentage,
                  );
                }
              } else if (next.second === LOCKED_ID) {
                setDynamicLayout(next.first);
                if (typeof next.splitPercentage === 'number') {
                  // Når locked er second, rootSplit representerer bredden til locked second (speilvendt)
                  const lockedPct = 100 - next.splitPercentage;
                  const clamped = clampSplit(lockedPct);
                  setRootSplit(clamped ?? lockedPct);
                }
              }
            }
          }}
          renderTile={(id, path) => {
            const isDynamic = id !== LOCKED_ID;
            const item = elements[id];
            const content = item?.content;
            const customHeader = item?.customHeader;
            const isRightOfRoot =
              mosaicValue !== LOCKED_ID &&
              typeof mosaicValue !== 'string' &&
              path?.[0] === 'second';
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
                    (isRightOfRoot ? ' pl-0' : '')
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
