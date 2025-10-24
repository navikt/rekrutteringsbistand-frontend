'use client';

// Brødsmuler er deprecated – vi bygger breadcrumbs direkte her med UI-primitive
import { useWindowTile } from '@/components/WindowView';
import AutoBreadcrumbs from '@/components/brødsmuler/Brødsmuler';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext } from 'react';

/**
 * Generisk toppseksjon (panel-header) satt sammen av én eller flere seksjoner.
 * Hver seksjon kan vise:
 *  - valgfri tilbake‑lenke / knapp
 *  - tittel + valgfri undertittel
 *  - faner (enkle pille‑/knappestil)
 *  - meta‑informasjon (f.eks. «Lagret for 2 minutter siden»)
 *  - handlingsområder venstre / høyre
 *
 * Eksempel på bruk:
 * <PanelHeader>
 *   <PanelHeader.Section
 *     back={{ label: 'Tilbake', onClick: () => router.back() }}
 *     title='Nytt rekrutteringstreff'
 *     meta={<span className='text-xs text-muted-foreground'>Lagret for 2 minutter siden</span>}
 *     actionsRight={<Button size='sm'>Slett</Button>}
 *   />
 *   <PanelHeader.Section
 *     title='Treff arbeidsgivere i bad- og restaurantbransjen'
 *     tabs={<MinTabs />}
 *     actionsRight={<div className='flex gap-2'><Button size='sm'>Del</Button><Button size='sm'>Legg til jobbsøkere</Button></div>}
 *   />
 * </PanelHeader>
 *
 * Eller med egen komponent:
 * <PanelHeader.Section
 *   title='Stilling'
 *   tabs={<StillingTabs />}
 * />
 */
// Intern context for å signalisere kompakt modus til seksjoner
const PanelHeaderModeContext = createContext<{ compact: boolean }>({
  compact: false,
});

interface PanelHeaderProps {
  children: ReactNode;
  className?: string;
  /** URL som representerer fullskjerm-visning av innholdet i detaljvinduet */
  fullskjermUrl?: string;
}

const PanelHeaderExtraContext = createContext<
  { fullskjermUrl?: string } | undefined
>(undefined);

export default function PanelHeader({
  children,
  className = '',
  fullskjermUrl,
}: PanelHeaderProps) {
  const childArr = (Array.isArray(children) ? children : [children]).filter(
    Boolean,
  );
  const hasTabs = childArr.some(
    (c: any) => c && typeof c === 'object' && 'props' in c && c.props?.tabs,
  );

  // Ønsket endring: Tabs skal alltid ligge under original (kompakt) header uten å påvirke høyden.
  // Derfor tvinger vi compact = true uavhengig av om seksjoner har tabs.
  const compact = true;

  // Dynamisk vinduslogikk fjernet – children brukes direkte
  const enhancedChildren: ReactNode = childArr;

  return (
    <PanelHeaderModeContext.Provider value={{ compact }}>
      <PanelHeaderExtraContext.Provider value={{ fullskjermUrl }}>
        <div
          className={` w-full flex flex-col ${compact ? (hasTabs ? 'pt-4 pb-0' : 'py-4') : ''} ${className}`}
        >
          {enhancedChildren}
        </div>
      </PanelHeaderExtraContext.Provider>
    </PanelHeaderModeContext.Provider>
  );
}

export interface PanelHeaderSectionProps {
  /** Hvis true, skjules brødsmuler */
  skjulBrødsmuler?: boolean;
  /** Tittel brukes automatisk som label for siste segment i brødsmuler */
  title?: ReactNode;
  erstattPath?: [originalSegment: string, nyLabel: string];
  subtitle?: ReactNode;
  tabs?: ReactNode;
  meta?: ReactNode;
  actionsLeft?: ReactNode;
  actionsRight?: ReactNode;
  children?: ReactNode;
  className?: string;
}

function cx(...parts: Array<string | undefined | false | null>) {
  return parts
    .filter((p): p is string => typeof p === 'string' && p.length > 0)
    .join(' ');
}

export function PanelHeaderSection({
  skjulBrødsmuler,
  title,
  subtitle,
  tabs,
  meta,
  actionsLeft,
  actionsRight,
  children,
  className,
  erstattPath,
}: PanelHeaderSectionProps) {
  const { compact } = useContext(PanelHeaderModeContext);
  const extra = useContext(PanelHeaderExtraContext);
  const tileInfo = useWindowTile();
  const router = useRouter();
  // Pathname håndteres nå internt av AutoBreadcrumbs

  const rowClass = cx(
    'flex gap-x-4',
    compact
      ? 'h-auto min-h-8 items-center px-4 flex-wrap'
      : 'flex-wrap gap-y-2 items-center px-5',
    subtitle && !compact ? 'items-start' : undefined,
  );

  return (
    <div
      className={cx(
        'group/section flex flex-col',
        compact ? '' : 'gap-2',
        className,
      )}
    >
      <div className={rowClass}>
        <div className='flex items-center gap-3 min-w-0 flex-1 flex-wrap'>
          {!skjulBrødsmuler ? (
            <div className='pt-2 max-w-full'>
              <AutoBreadcrumbs erstattPath={erstattPath} />
            </div>
          ) : (
            title && <div className='text-lg font-semibold  pt-2'>{title}</div>
          )}
          {subtitle && (
            <div className='min-w-0'>
              {!compact && subtitle && (
                <div className='text-xs text-muted-foreground truncate'>
                  {subtitle}
                </div>
              )}
            </div>
          )}
          {actionsLeft && (
            <div className='flex items-center gap-2'>{actionsLeft}</div>
          )}
        </div>
        <div className='flex items-center gap-3 ml-auto flex-shrink-0'>
          {meta && (
            <div className='text-xs text-muted-foreground whitespace-nowrap'>
              {meta}
            </div>
          )}
          {tileInfo?.tile === 'detail' && (
            <div className='flex items-center gap-2'>
              {extra?.fullskjermUrl && (
                <Button
                  size='small'
                  variant='secondary'
                  onClick={() => router.push(extra.fullskjermUrl!)}
                >
                  Fullskjerm
                </Button>
              )}
              {tileInfo.close && (
                <Button
                  size='small'
                  variant='tertiary'
                  onClick={() => tileInfo.close?.()}
                >
                  Lukk
                </Button>
              )}
            </div>
          )}
          {actionsRight && (
            <div className='flex items-center gap-2'>{actionsRight}</div>
          )}
        </div>
      </div>
      {tabs && <div className='px-5'>{tabs}</div>}
      {children && <div className='px-5'>{children}</div>}
    </div>
  );
}

PanelHeader.Section = PanelHeaderSection;
