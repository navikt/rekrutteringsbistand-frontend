import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { ReactNode } from 'react';

// BackButton er egen klient-komponent for å kunne bruke document.referrer uten
// å gjøre hele PanelHeader til en klient-komponent.
// Den forsøker å gå tilbake i historikken dersom forrige side er på samme origin.
// Hvis ikke (eller ingen referrer) brukes eventuell fallbackPath.
// Egendefinert onClick har alltid presedens.
function BackButton({
  fallbackPath,
  onClick,
}: {
  label?: string;
  fallbackPath?: string;
  onClick?: () => void;
  icon?: ReactNode;
}) {
  // Dynamisk import av hook for å unngå at filen må merkes 'use client'.
  // Vi sjekker om window finnes før vi bruker den.
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (typeof window !== 'undefined') {
      try {
        const ref = document.referrer;
        if (ref) {
          const refUrl = new URL(ref);
          if (refUrl.origin === window.location.origin) {
            window.history.back();
            return;
          }
        }
      } catch {
        // Ignorer – faller tilbake til fallbackPath / history.back
      }
      if (fallbackPath) {
        // Bruk location.assign fremfor router.push for å slippe å gjøre dette til en client component.
        window.location.assign(fallbackPath);
        return;
      }
      window.history.back();
    }
  };
  return (
    <Button
      size='small'
      variant='tertiary'
      icon={<ArrowLeftIcon />}
      onClick={handleClick}
    />
  );
}

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
export default function PanelHeader({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  // Sjekk om noen av seksjonene har tabs-prop.
  const hasTabs = (Array.isArray(children) ? children : [children]).some(
    (child: any) =>
      child &&
      typeof child === 'object' &&
      'props' in child &&
      child?.props?.tabs,
  );
  const borderCls = hasTabs
    ? ''
    : 'border-b border-b-[var(--ax-border-neutral-subtle)] py-4 ';
  return (
    <div className={`flex flex-col gap-2 ${borderCls} ${className}`}>
      {children}
    </div>
  );
}

export interface PanelHeaderSectionProps {
  back?: {
    label?: string;
    /** Sti som brukes dersom document.referrer peker til et annet domene */
    fallbackPath?: string;
    onClick?: () => void; // Egendefinert handler overstyrer standardlogikk
    icon?: ReactNode;
  };
  title?: ReactNode;
  /** Ikon som vises foran tittel (etter tilbake-knapp). Sett aria-hidden på dekorative ikoner. */
  titleIcon?: ReactNode;
  subtitle?: ReactNode;
  tabs?: ReactNode; // Egen tab-komponent (f.eks. <StillingTabs />)
  meta?: ReactNode; // f.eks. statustekst ("Lagret ...")
  actionsLeft?: ReactNode;
  actionsRight?: ReactNode;
  children?: ReactNode; // Tilleggsinnhold / ekstra rad under hovedlinjen
  className?: string;
}

function cx(...parts: Array<string | undefined | false | null>) {
  return parts
    .filter((p): p is string => typeof p === 'string' && p.length > 0)
    .join(' ');
}

export function PanelHeaderSection({
  back,
  title,
  titleIcon,
  subtitle,
  tabs,
  meta,
  actionsLeft,
  actionsRight,
  children,
  className,
}: PanelHeaderSectionProps) {
  const BackEl = back ? (
    <BackButton
      label={back.label}
      fallbackPath={back.fallbackPath}
      onClick={back.onClick}
    />
  ) : null;

  const rowClass = cx(
    'flex flex-wrap gap-x-4 gap-y-2',
    subtitle ? 'items-start' : 'items-center',
  );

  return (
    <div className={cx('group/section flex flex-col gap-2 px-5', className)}>
      {/* Hvis ingen subtitle: vertikalt sentrer tittel/ikon/knapper ved å bruke items-center */}
      <div className={rowClass}>
        <div className='flex items-center  gap-3 min-w-0 flex-1'>
          {BackEl && BackEl}
          {titleIcon && (
            <span className='shrink-0 flex items-center text-[0] ' aria-hidden>
              {titleIcon}
            </span>
          )}
          {(title || subtitle) && (
            <div className='min-w-0'>
              {title && (
                <h1
                  className={cx(
                    'text-base font-medium leading-tight truncate',
                    subtitle ? 'mb-0.5' : undefined,
                  )}
                >
                  {title}
                </h1>
              )}
              {subtitle && (
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
        <div className='flex items-center gap-3 ml-auto'>
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
      {tabs && <div>{tabs}</div>}
      {children && <div>{children}</div>}
    </div>
  );
}

PanelHeader.Section = PanelHeaderSection;
