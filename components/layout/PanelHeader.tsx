'use client';

import { useWindowContext } from '@/app/_windows/util/DynamicWindowContext';
// Brødsmuler er deprecated – vi bygger breadcrumbs direkte her med UI-primitive
import AutoBreadcrumbs from '@/components/brødsmuler/Brødsmuler';
import { ExpandIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
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

export default function PanelHeader({
  children,
  className = '',
  fullskjermUrl,
  fullskjermAriaLabel = 'Åpne i fullskjerm',
}: {
  children: ReactNode;
  className?: string;
  /** Når satt og vinduet er dynamisk vises en knapp (til venstre for lukk) som navigerer hit i hovedvisning */
  fullskjermUrl?: string;
  fullskjermAriaLabel?: string;
}) {
  const dynamicCtx = useWindowContext();
  const childArr = (Array.isArray(children) ? children : [children]).filter(
    Boolean,
  );
  const hasTabs = childArr.some(
    (c: any) => c && typeof c === 'object' && 'props' in c && c.props?.tabs,
  );
  const borderCls = 'border-b border-b-[var(--ax-border-neutral-subtle)]';
  // Ønsket endring: Tabs skal alltid ligge under original (kompakt) header uten å påvirke høyden.
  // Derfor tvinger vi compact = true uavhengig av om seksjoner har tabs.
  const compact = true;

  // Injiser close-knapp kun for dynamiske vinduer (men uten å påvirke layoutbeslutningen)
  let enhancedChildren: ReactNode = childArr;
  if (dynamicCtx?.isDynamic && dynamicCtx.onRequestClose) {
    const lastIndex = childArr
      .map((c: any, i) => (c && c.type === PanelHeaderSection ? i : -1))
      .filter((i) => i >= 0)
      .pop();
    if (lastIndex != null) {
      enhancedChildren = childArr.map((c: any, i) => {
        if (i !== lastIndex) return c;
        const existing = c.props?.actionsRight;
        const already =
          existing &&
          (Array.isArray(existing)
            ? existing.some(
                (el: any) => el?.props?.['aria-label'] === 'Lukk vindu',
              )
            : existing?.props?.['aria-label'] === 'Lukk vindu');
        if (already) return c;
        const hasFullscreenAlready =
          existing &&
          (Array.isArray(existing)
            ? existing.some(
                (el: any) => el?.props?.['aria-label'] === fullskjermAriaLabel,
              )
            : existing?.props?.['aria-label'] === fullskjermAriaLabel);
        return (
          <PanelHeaderSection
            key={c.key || `ph-sec-${i}`}
            {...c.props}
            actionsRight={
              <>
                {existing}
                {fullskjermUrl && !hasFullscreenAlready && (
                  <Button
                    size='small'
                    variant='tertiary'
                    aria-label={fullskjermAriaLabel}
                    icon={<ExpandIcon aria-hidden />}
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.location.assign(fullskjermUrl);
                      }
                    }}
                  />
                )}
                <Button
                  size='small'
                  variant='tertiary'
                  aria-label='Lukk vindu'
                  icon={<XMarkIcon aria-hidden />}
                  onClick={() => dynamicCtx.onRequestClose?.()}
                />
              </>
            }
          />
        );
      });
    }
  }

  return (
    <PanelHeaderModeContext.Provider value={{ compact }}>
      <div
        className={`flex flex-col ${borderCls} ${compact ? (hasTabs ? 'pt-4 pb-0' : 'py-4') : ''} ${className}`}
      >
        {enhancedChildren}
      </div>
    </PanelHeaderModeContext.Provider>
  );
}

export interface PanelHeaderSectionProps {
  /** Hvis true, skjules brødsmuler */
  skjulBrødsmuler?: boolean;
  /** Tittel brukes automatisk som label for siste segment i brødsmuler */
  title?: ReactNode;

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
}: PanelHeaderSectionProps) {
  const { compact } = useContext(PanelHeaderModeContext);
  const winCtx = useWindowContext();
  // Pathname håndteres nå internt av AutoBreadcrumbs

  // pathConfig flyttet til AutoBreadcrumbs (defaultPathConfig)

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
          {!skjulBrødsmuler && !winCtx?.isDynamic ? (
            <div className='px-4 pt-2 max-w-full'>
              <AutoBreadcrumbs
                overrideLastLabel={
                  typeof title === 'string' ? (title as string) : undefined
                }
              />
            </div>
          ) : (
            title
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
