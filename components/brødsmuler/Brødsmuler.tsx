'use client';

import { useNullableKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
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
import { BriefcaseIcon, PersonIcon, ReceptionIcon } from '@navikt/aksel-icons';
import { usePathname } from 'next/navigation';
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
  const livePath = usePathname();
  const pathname =
    forcedPath ||
    livePath ||
    (typeof window !== 'undefined' ? window.location.pathname : '');
  const segments = pathname ? pathname.split('/').filter(Boolean) : [];
  const [collapsed, setCollapsed] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  // Hent kontekster
  const stillingsCtx = useNullableStillingsContext();
  const kandidatCtx = useNullableKandidatContext();

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

  // Ikke returner før hooks er opprettet; vi håndterer tom path senere.

  const items = segments.map((seg, i) => {
    const entry = pathConfig[seg];
    const href = '/' + segments.slice(0, i + 1).join('/');
    const isLast = i === segments.length - 1;
    let label = entry?.label || seg;

    // Automatisk erstatt stilling UUID med tittel
    if (
      stillingsCtx?.stillingsData?.stilling?.uuid === seg &&
      stillingsCtx.stillingsData?.stilling?.title
    ) {
      label = stillingsCtx.stillingsData.stilling.title;
    }

    // Automatisk erstatt kandidat ID med navn
    if (
      kandidatCtx?.kandidatId === seg &&
      kandidatCtx.kandidatData?.fornavn &&
      kandidatCtx.kandidatData?.etternavn
    ) {
      label = `${kandidatCtx.kandidatData.fornavn} ${kandidatCtx.kandidatData.etternavn}`;
    }
    if (erstattPath && seg === erstattPath[0]) {
      label = erstattPath[1];
    }

    return {
      segment: seg,
      href,
      icon: entry?.icon,
      label,
      // Siste segment skal ikke være lenke; ellers følger vi config
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
