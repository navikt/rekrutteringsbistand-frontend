'use client';

import { useNullableKandidatContext } from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useWindowTile } from '@/components/window/WindowView';
import { useThemeProvider } from '@/providers/ThemeProvider';
import { BriefcaseIcon, PersonIcon, ReceptionIcon } from '@navikt/aksel-icons';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Fragment,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface PathConfigEntry {
  label: string;
  icon?: ReactNode;
  skipLink?: boolean;
}

export type PathConfig = Record<string, PathConfigEntry>;

interface AutoBreadcrumbsProps {
  /** Valgfri mapping av path-segmenter -> label/icon. Hvis utelatt brukes defaultPathConfig. */
  pathConfig?: PathConfig;
  className?: string;
  /** Bytt ut et segment-navn med en custom label. Eks: ['a1d169be-...','Senior utvikler'] */
  erstattPath?: [originalSegment: string, nyLabel: string];
  /** For test / Storybook: bruk denne pathen i stedet for usePathname() */
  forcedPath?: string;
}

// Standard mapping som tidligere lå i PanelHeader
export const defaultPathConfig: PathConfig = {
  rekrutteringstreff: {
    label: 'Rekrutteringstreff',
    icon: <ReceptionIcon aria-hidden className='w-4 h-4' />,
  },
  stilling: {
    label: 'Stillingsoppdrag',
    icon: <BriefcaseIcon aria-hidden className='w-4 h-4' />,
  },
  stillinger: {
    label: 'Stillinger',
    icon: <BriefcaseIcon aria-hidden className='w-4 h-4' />,
  },
  etterregistrering: {
    label: 'Etterregistrering',
    icon: <BriefcaseIcon aria-hidden className='w-4 h-4' />,
  },
  kandidat: {
    label: 'Jobbsøkere',
    icon: <PersonIcon aria-hidden className='w-4 h-4' />,
  },
  kandidater: {
    label: 'Jobbsøkere',
    icon: <PersonIcon aria-hidden className='w-4 h-4' />,
  },
  'vis-kandidat': {
    label: 'Jobbsøker',
    icon: <PersonIcon aria-hidden className='w-4 h-4' />,
  },
  'finn-kandidater': { label: 'Finn jobbsøker' },
  'finn-stilling': { label: 'Finn stilling' },
};

function AutoBreadcrumbs({
  pathConfig = defaultPathConfig,
  erstattPath,
  className,
  forcedPath,
}: AutoBreadcrumbsProps) {
  const { windowMode } = useThemeProvider();
  const tileInfo = useWindowTile();
  const livePath = usePathname();
  const pathname =
    forcedPath ||
    livePath ||
    (typeof window !== 'undefined' ? window.location.pathname : '');
  const segments = pathname ? pathname.split('/').filter(Boolean) : [];
  const searchParams = useSearchParams();
  const visKandidatId = searchParams?.get('visKandidatId');
  const visStillingId = searchParams?.get('visStillingId');
  const [collapsed, setCollapsed] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  // Hent kontekster
  const stillingsCtx = useNullableStillingsContext();
  const kandidatCtx = useNullableKandidatContext();

  // Felles hjelpefunksjoner for å slå opp labels basert på ID
  const kandidatFullName =
    kandidatCtx?.kandidatData?.fornavn && kandidatCtx?.kandidatData?.etternavn
      ? `${kandidatCtx.kandidatData.fornavn} ${kandidatCtx.kandidatData.etternavn}`
      : undefined;
  const computeKandidatLabel = (id: string) => {
    if (kandidatCtx?.kandidatId === id && kandidatFullName)
      return kandidatFullName;
    return undefined;
  };
  const stillingTitle = stillingsCtx?.stillingsData?.stilling?.title;
  const computeStillingLabel = (id: string) => {
    const uuid = stillingsCtx?.stillingsData?.stilling?.uuid;
    if (uuid === id && stillingTitle) return stillingTitle;
    return undefined;
  };

  // Reset collapsed on path change
  useEffect(() => {
    setCollapsed(false);
  }, [pathname]);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ro = new ResizeObserver(() => {
      if (!measureRef.current || !rootRef.current) return;
      const fullWidth = measureRef.current.scrollWidth;
      const avail = rootRef.current.clientWidth;
      if (fullWidth > avail && segments.length > 2) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    });
    ro.observe(rootRef.current);
    return () => ro.disconnect();
  }, [segments.length]);

  const items = segments.map((seg, i) => {
    const entry = pathConfig[seg];
    const href = '/' + segments.slice(0, i + 1).join('/');
    const isLast = i === segments.length - 1;
    let label = entry?.label || seg;
    // Rebruk samme logikk for ID->navn/tittel
    label = computeStillingLabel(seg) ?? computeKandidatLabel(seg) ?? label;
    if (erstattPath && seg === erstattPath[0]) label = erstattPath[1];
    return {
      segment: seg,
      href,
      icon: entry?.icon,
      label,
      skipLink: isLast || !!entry?.skipLink,
    };
  });

  const visibleItems = useMemo(() => {
    if (!collapsed || items.length <= 2) return items;
    return [
      items[0],
      { segment: '__ellipsis__' } as any,
      items[items.length - 1],
    ];
  }, [collapsed, items]);
  if (!pathname || segments.length === 0) {
    return null;
  }

  if (windowMode && tileInfo?.tile === 'detail') {
    const last = items[items.length - 1];
    // Bruk samme hjelpefunksjoner også for query-param basert visning
    const labelOverride =
      (visStillingId && computeStillingLabel(visStillingId)) ||
      (visKandidatId && computeKandidatLabel(visKandidatId)) ||
      last.label;
    // Velg ikon basert på hvilken param som faktisk ga label. Prioritet: stilling > kandidat
    const iconOverride =
      (visStillingId &&
        computeStillingLabel(visStillingId) &&
        pathConfig['stilling']?.icon) ||
      (visKandidatId &&
        computeKandidatLabel(visKandidatId) &&
        (pathConfig['vis-kandidat']?.icon || pathConfig['kandidat']?.icon)) ||
      last.icon;
    return (
      <div ref={rootRef} className={className}>
        <Breadcrumb aria-label='Vindusnavn'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage icon={iconOverride}>
                {labelOverride}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={className}>
      {/* Hidden full width measurement */}
      <div
        ref={measureRef}
        aria-hidden
        className='invisible absolute left-0 top-0 h-0 overflow-hidden'
      >
        <Breadcrumb aria-label='Full breadcrumb width measurement'>
          <BreadcrumbList>
            {items.map((it, idx) => (
              <Fragment key={`measure-${it.segment}-${idx}`}>
                {idx > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {it.skipLink ? (
                    <BreadcrumbPage icon={it.icon}>{it.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={it.href} icon={it.icon}>
                      {it.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Breadcrumb aria-label='Brødsmulesti'>
        <BreadcrumbList>
          {visibleItems.map((it, idx) => {
            const showSep = idx > 0;
            if (it.segment === '__ellipsis__') {
              return (
                <Fragment key={`ellipsis-${idx}`}>
                  {showSep && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                </Fragment>
              );
            }
            return (
              <Fragment key={`bc-${it.segment}-${idx}`}>
                {showSep && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {it.skipLink ? (
                    <BreadcrumbPage icon={it.icon}>{it.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={it.href} icon={it.icon}>
                      {it.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default AutoBreadcrumbs;
