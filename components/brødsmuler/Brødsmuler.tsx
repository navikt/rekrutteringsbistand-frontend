'use client';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { BriefcaseIcon, PersonIcon } from '@navikt/aksel-icons';
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
  /** Hvis satt, overskriver label på siste segment */
  overrideLastLabel?: string;
  className?: string;
  /** For test / Storybook: bruk denne pathen i stedet for usePathname() */
  forcedPath?: string;
}

// Standard mapping som tidligere lå i PanelHeader
export const defaultPathConfig: PathConfig = {
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
  'finn-kandidater': { label: 'Finn kandidater for stilling' },
  rekrutteringsbistand: { label: 'Rekrutteringsbistand' },
};

export function AutoBreadcrumbs({
  pathConfig = defaultPathConfig,
  overrideLastLabel,
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
    return {
      segment: seg,
      href,
      icon: entry?.icon,
      label:
        isLast && overrideLastLabel ? overrideLastLabel : entry?.label || seg,
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
