import RekBisKort from '@/components/layout/RekBisKort';
import { ArrowLeftIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Box, Button } from '@navikt/ds-react';
import * as React from 'react';
import { Mosaic, MosaicNode } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';

// nødvendig for layout

export interface WindowWrapperProps {
  /** Innholdet i det låste (første) vinduet */
  children?: React.ReactNode;
}

interface WindowItem {
  id: string;
  navigasjon?: React.ReactNode;
  onClose?: () => void;
  content: React.ReactElement;
}

// ---------------- Window context ----------------
interface WindowContextValue {
  addWindow: (props: {
    id: string;
    onClose?: () => void;
    navigasjon?: React.ReactNode;
    content: React.ReactElement;
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

const WindowWrapper: React.FC<WindowWrapperProps> = ({ children }) => {
  const [elements, setElements] = React.useState<Record<string, WindowItem>>({
    [LOCKED_ID]: {
      id: LOCKED_ID,
      content: (
        <div className='h-full w-full flex flex-col min-h-0'>{children}</div>
      ),
    },
  });

  // Holder en synkron liste over IDer som finnes (inkluderer nylig la til vinduer før React-state er commitet)
  const idsRef = React.useRef<Set<string>>(new Set([LOCKED_ID]));

  React.useEffect(() => {
    setElements((prev) => ({
      ...prev,
      [LOCKED_ID]: {
        id: LOCKED_ID,
        content: (
          <div className='h-full w-full flex flex-col min-h-0'>{children}</div>
        ),
      },
    }));
  }, [children]);

  // Lagrer bare den dynamiske delen av layouten (til høyre eller alene når tilstede)
  const [dynamicLayout, setDynamicLayout] =
    React.useState<MosaicNode<Id> | null>(null);
  const [rootSplit, setRootSplit] = React.useState<number>(35);

  // Beregn synlige dynamiske vinduer, maks 2 dersom flere åpne
  const dynamicIds = React.useMemo(
    () => flattenRow(dynamicLayout),
    [dynamicLayout],
  );
  const moreThanTwo = dynamicIds.length > 1; // når vi får vindu #2 (dvs 2 dynamiske) skal locked skjules
  const visibleDynamicIds = moreThanTwo ? dynamicIds.slice(-2) : dynamicIds; // siste to hvis mange
  const newestDynamicId = visibleDynamicIds[visibleDynamicIds.length - 1];
  const oldestVisibleDynamicId = visibleDynamicIds[0];

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

  const visibleDynamicLayout = React.useMemo(
    () => buildRow(visibleDynamicIds),
    [visibleDynamicIds],
  );

  // Full verdi til Mosaic: hvis locked skal skjules (>=2 dynamiske) viser vi kun de to dynamiske, ellers locked + ev. en dynamisk
  const mosaicValue: MosaicNode<Id> = React.useMemo(() => {
    if (!visibleDynamicLayout && !moreThanTwo) return LOCKED_ID; // Kun locked
    if (moreThanTwo) {
      // Kun to dynamiske synlige
      return visibleDynamicLayout as MosaicNode<Id>;
    }
    if (!visibleDynamicLayout) return LOCKED_ID;
    return {
      direction: 'row',
      first: LOCKED_ID,
      second: visibleDynamicLayout,
      splitPercentage: rootSplit,
    };
  }, [visibleDynamicLayout, moreThanTwo, rootSplit]);

  const addWindow = React.useCallback<WindowContextValue['addWindow']>(
    ({ id, onClose, navigasjon, content, position = 'right' }) => {
      const alreadyExists = idsRef.current.has(id);
      if (alreadyExists) {
        // Bare oppdater innholdet, IKKE endre layout for å unngå duplikate noder i mosaic-treet
        // Endret: Flytt likevel vinduet helt til høyre slik at "siste åpnet" alltid havner ytterst.
        setDynamicLayout((prevLayout) => {
          // Fjern id fra treet og legg det inn igjen etter valgt position
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
              `[WindowWrapper] addWindow: vindu med id="${id}" finnes allerede – erstatter innhold & flytter (${position})`,
            );
          }
          return {
            ...prev,
            [id]: {
              ...current,
              navigasjon: navigasjon ?? current.navigasjon,
              onClose: onClose ?? current.onClose,
              content: content ?? current.content,
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
        [id]: { id, navigasjon, onClose, content },
      }));
      return id;
    },
    [],
  );

  const removeWindow = React.useCallback<WindowContextValue['removeWindow']>(
    (id) => {
      if (id === LOCKED_ID) return;
      setDynamicLayout((prev) => removeFromTree(prev, id));
      setElements((prev) => {
        const { [id]: _removed, ...rest } = prev;
        return rest;
      });
      idsRef.current.delete(id);
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[WindowWrapper] removeWindow', id);
      }
    },
    [],
  );

  const updateWindow = React.useCallback<WindowContextValue['updateWindow']>(
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
            // Når locked er skjult opererer vi kun på de synlige dynamiske vinduene (maks 2). Resizing kan ignoreres.
            if (typeof next === 'string') {
              if (next === LOCKED_ID) {
                setDynamicLayout(null);
              }
              return;
            }
            if (moreThanTwo) {
              // Ignorer endringer (vi vil ikke miste original struktur). Alternativt kunne vi prøve å mappe.
              return;
            }
            if (next.direction === 'row') {
              if (next.first === LOCKED_ID) {
                setDynamicLayout(next.second);
                if (typeof next.splitPercentage === 'number')
                  setRootSplit(next.splitPercentage);
              } else if (next.second === LOCKED_ID) {
                setDynamicLayout(next.first);
                if (typeof next.splitPercentage === 'number')
                  setRootSplit(100 - (next.splitPercentage ?? 0));
              }
            }
          }}
          renderTile={(id, path) => {
            const isDynamic = id !== LOCKED_ID;
            const item = elements[id];
            const content = item?.content;
            const nav = item?.navigasjon;
            const isRightOfRoot =
              mosaicValue !== LOCKED_ID &&
              typeof mosaicValue !== 'string' &&
              path?.[0] === 'second';
            const showBackButton =
              isDynamic && moreThanTwo && id === oldestVisibleDynamicId;
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
                  className='h-full w-full flex flex-col overflow-auto min-h-0'
                  data-window-type={id === LOCKED_ID ? 'locked' : 'dynamic'}
                >
                  <RekBisKort className='flex-1 w-full min-h-0'>
                    {isDynamic && (
                      <div className='flex items-center justify-between mb-2 gap-2'>
                        <div className='flex items-center gap-2 flex-1'>
                          {showBackButton && (
                            <Button
                              size='xsmall'
                              variant='tertiary'
                              icon={<ArrowLeftIcon aria-hidden />}
                              aria-label='Tilbake'
                              onClick={() => {
                                // Finn siste (nyeste) dynamiske vindu akkurat NÅ og lukk det
                                const idsNow = flattenRow(dynamicLayout);
                                if (idsNow.length > 1) {
                                  const lastId = idsNow[idsNow.length - 1];
                                  if (lastId) {
                                    // Kall onClose først slik at query-param e.l. nullstilles
                                    try {
                                      const lastItem = elements[lastId];
                                      lastItem?.onClose?.();
                                    } catch (e) {
                                      if (
                                        process.env.NODE_ENV === 'development'
                                      ) {
                                        // eslint-disable-next-line no-console
                                        console.warn(
                                          '[WindowWrapper] back onClose feilet',
                                          e,
                                        );
                                      }
                                    }
                                    removeWindow(lastId);
                                  }
                                }
                              }}
                            />
                          )}
                          <div className='flex-1'>{nav}</div>
                        </div>
                        <Button
                          size='xsmall'
                          variant='tertiary'
                          icon={<XMarkIcon aria-hidden />}
                          aria-label='Lukk vindu'
                          onClick={() => {
                            try {
                              item?.onClose?.();
                            } catch (e) {
                              if (process.env.NODE_ENV === 'development') {
                                // eslint-disable-next-line no-console
                                console.warn(
                                  '[WindowWrapper] onClose feilet',
                                  e,
                                );
                              }
                            }
                            removeWindow(id);
                          }}
                        />
                      </div>
                    )}
                    {content}
                    {!content && (
                      <div className='text-xs text-red-600'>
                        Ingen innhold for id: {id}
                      </div>
                    )}
                  </RekBisKort>
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
