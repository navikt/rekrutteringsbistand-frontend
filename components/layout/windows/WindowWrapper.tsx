import { Box } from '@navikt/ds-react';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { Mosaic, MosaicNode } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';

// nødvendig for layout

export interface WindowWrapperProps {
  /** Innholdet i det låste (første) vinduet */
  children?: React.ReactNode;
}

// ---------------- Window context ----------------
interface WindowContextValue {
  addWindow: (
    element: React.ReactElement,
    options?: { position?: 'below' | 'above' | 'after' },
  ) => string; // return id
  /** Oppdater innholdet i et eksisterende vindu */
  updateWindow: (id: string, element: React.ReactElement) => void;
  removeWindow: (id: string) => void;
  listWindows: () => string[]; // ekskluderer locked
}

const WindowContext = React.createContext<WindowContextValue | undefined>(
  undefined,
);

export const useWindows = () => {
  const ctx = React.useContext(WindowContext);
  if (!ctx) throw new Error('useWindows må brukes innenfor <WindowWrapper>');
  return ctx;
};

// ---------------- Hjelpefunksjoner for mosaic-tree ----------------
type Id = string; // enklere alias

function insertBelow(current: MosaicNode<Id> | null, id: Id): MosaicNode<Id> {
  if (!current) return id; // første dynamiske vindu
  return {
    direction: 'column',
    first: current,
    second: id,
    splitPercentage: 50,
  };
}

function insertAbove(current: MosaicNode<Id> | null, id: Id): MosaicNode<Id> {
  if (!current) return id;
  return {
    direction: 'column',
    first: id,
    second: current,
    splitPercentage: 50,
  };
}

// "after" = legg til som ny kolonne til høyre, bevarer eksisterende stack i venstre del av høyre side
function insertAfter(current: MosaicNode<Id> | null, id: Id): MosaicNode<Id> {
  if (!current) return id;
  return { direction: 'row', first: current, second: id, splitPercentage: 60 };
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

// ---------------- Komponent ----------------
const LOCKED_ID = '__locked__';

const WindowWrapper: React.FC<WindowWrapperProps> = ({ children }) => {
  // Element map lagres i state slik at re-render trigges når vi legger til / fjerner
  const [elements, setElements] = React.useState<
    Record<string, React.ReactElement>
  >({
    [LOCKED_ID]: (
      <div className='h-full w-full flex flex-col min-h-0'>{children}</div>
    ),
  });

  // Oppdater locked-element hvis children endrer seg
  React.useEffect(() => {
    setElements((prev) => ({
      ...prev,
      [LOCKED_ID]: (
        <div className='h-full w-full flex flex-col min-h-0'>{children}</div>
      ),
    }));
  }, [children]);

  // Lagrer bare den dynamiske delen av layouten (til høyre eller alene når tilstede)
  const [dynamicLayout, setDynamicLayout] =
    React.useState<MosaicNode<Id> | null>(null);
  const [rootSplit, setRootSplit] = React.useState<number>(35);

  // Full verdi til Mosaic avhenger av om vi har dynamiske vinduer
  const mosaicValue: MosaicNode<Id> = React.useMemo(() => {
    if (!dynamicLayout) return LOCKED_ID; // Kun locked vindu
    return {
      direction: 'row',
      first: LOCKED_ID,
      second: dynamicLayout,
      splitPercentage: rootSplit,
    };
  }, [dynamicLayout, rootSplit]);

  const addWindow = React.useCallback<WindowContextValue['addWindow']>(
    (element, options) => {
      const id = nanoid(6);
      setElements((prev) => ({ ...prev, [id]: element }));
      // Alltid legg til som kolonne til høyre uansett oppgitt position.
      setDynamicLayout((prev) => insertAfter(prev, id));
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[WindowWrapper] addWindow', id, {
          forcedPosition: 'right',
          requested: options?.position,
        });
      }
      return id;
    },
    [],
  );

  const removeWindow = React.useCallback<WindowContextValue['removeWindow']>(
    (id) => {
      if (id === LOCKED_ID) return; // kan ikke fjerne locked
      setDynamicLayout((prev) => removeFromTree(prev, id));
      setElements((prev) => {
        const { [id]: _removed, ...rest } = prev;
        return rest;
      });
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[WindowWrapper] removeWindow', id);
      }
    },
    [],
  );

  const updateWindow = React.useCallback<WindowContextValue['updateWindow']>(
    (id, element) => {
      setElements((prev) => {
        if (!prev[id]) return prev; // ignorer hvis ikke finnes
        return { ...prev, [id]: element };
      });
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[WindowWrapper] updateWindow', id);
      }
    },
    [],
  );

  const listWindows = React.useCallback(
    () => Object.keys(elements).filter((k) => k !== LOCKED_ID),
    [elements],
  );

  const ctxValue = React.useMemo<WindowContextValue>(
    () => ({ addWindow, updateWindow, removeWindow, listWindows }),
    [addWindow, updateWindow, removeWindow, listWindows],
  );

  return (
    <WindowContext.Provider value={ctxValue}>
      <div
        id='windows'
        className='w-full flex-1 flex flex-col min-h-0 overflow-hidden '
      >
        <Mosaic<Id>
          value={mosaicValue}
          onChange={(next) => {
            // Tillat kun endring av split (resizing) og interne endringer på dynamisk del.
            if (!next) return;
            if (typeof next === 'string') {
              // Bruker har lukket alle dynamiske paneler via UI (hvis mulig) -> reset
              if (next === LOCKED_ID) {
                setDynamicLayout(null);
              }
              return;
            }
            if (next.direction === 'row') {
              // Finn hvilken side som er locked og plukk ut dynamic
              if (next.first === LOCKED_ID) {
                setDynamicLayout(next.second);
                if (typeof next.splitPercentage === 'number') {
                  setRootSplit(next.splitPercentage);
                }
              } else if (next.second === LOCKED_ID) {
                // Reversert – sørg for at locked alltid ligger til venstre i vår modell
                setDynamicLayout(next.first);
                if (typeof next.splitPercentage === 'number') {
                  setRootSplit(100 - (next.splitPercentage ?? 0));
                }
              }
            } else {
              // Dersom biblioteket skulle sende en annen struktur, ignorer, vi beholder tidligere state
            }
          }}
          renderTile={(id, path) => {
            const content = elements[id];
            // Horisontal padding mellom locked (venstre) og resten (høyre) kun på rot-nivå.
            const isRightOfRoot = !!dynamicLayout && path?.[0] === 'second';
            return (
              <div
                className={
                  'h-full w-full flex flex-col min-h-0' +
                  (isRightOfRoot ? ' pl-2' : '')
                }
              >
                <Box.New
                  id={id === LOCKED_ID ? 'window-locked' : `window-${id}`}
                  borderColor='info-subtleA'
                  background='default'
                  className='h-full w-full flex flex-col overflow-hidden min-h-0'
                  data-window-type={id === LOCKED_ID ? 'locked' : 'dynamic'}
                >
                  <div className='flex-1 w-full overflow-auto min-h-0'>
                    {content}
                    {!content && (
                      <div className='text-xs text-red-600'>
                        Ingen innhold for id: {id}
                      </div>
                    )}
                  </div>
                </Box.New>
              </div>
            );
          }}
          className='h-full'
        />
      </div>
    </WindowContext.Provider>
  );
};

export default WindowWrapper;
