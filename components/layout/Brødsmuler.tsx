'use client';

import { useNullableKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { BriefcaseIcon, PersonIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';
import { usePathname } from 'next/navigation';
import { Fragment, ReactNode } from 'react';

interface BrødsmuleConfig {
  [key: string]: {
    label: string;
    /** Ikon som vises foran label */
    icon?: ReactNode;
    /** Hvis true, vises bare labelen uten lenke (typisk for siste element) */
    skipLink?: boolean;
  };
}

// Konfigurasjon av labels for ulike path-segmenter
const defaultConfig: BrødsmuleConfig = {
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
  'finn-kandidater': {
    label: 'Finn kandidater for stilling',
  },
  rekrutteringsbistand: { label: 'Rekrutteringsbistand' },
};

interface BrødsmulerProps {
  /** Egendefinert konfigurasjon som slås sammen med default */
  config?: BrødsmuleConfig;
  /** Egendefinert path – bruker usePathname() hvis ikke satt */
  customPath?: string;
  /** Maksimalt antall synlige segmenter før collapse */
  maxVisible?: number;
  className?: string;
}

export default function Brødsmuler({
  config = {},
  customPath,
  maxVisible = 4,
  className = '',
}: BrødsmulerProps) {
  const pathname = usePathname();
  const path = customPath || pathname;
  const stillingsContext = useNullableStillingsContext();
  const kandidatContext = useNullableKandidatContext();

  const mergedConfig = { ...defaultConfig, ...config };

  // Legg til stillingstittel i config hvis tilgjengelig
  if (stillingsContext?.stillingsData?.stilling) {
    const stillingId = stillingsContext.stillingsData.stilling.uuid;
    const stillingTitle = stillingsContext.stillingsData.stilling.title;
    if (stillingId && stillingTitle) {
      mergedConfig[stillingId] = {
        label: stillingTitle,
      };
    }
  }

  // Legg til kandidatnavn i config hvis tilgjengelig
  if (kandidatContext?.kandidatData) {
    const kandidatId = kandidatContext.kandidatData.kandidatnr;
    const kandidatNavn =
      [
        kandidatContext.kandidatData.fornavn,
        kandidatContext.kandidatData.etternavn,
      ]
        .filter(Boolean)
        .join(' ') || 'Jobbsøker';

    if (kandidatId) {
      // Match mot kandidatnr
      mergedConfig[kandidatId] = {
        label: kandidatNavn,
      };

      // Finn det faktiske ID-segmentet i path-en
      const segments = path.split('/').filter(Boolean);
      const kandidatIndex = segments.indexOf('kandidat');
      if (kandidatIndex !== -1 && segments[kandidatIndex + 1]) {
        // Match mot det som faktisk er i URL-en
        mergedConfig[segments[kandidatIndex + 1]] = {
          label: kandidatNavn,
        };
      }
    }
  }

  // Split path og filtrer bort tomme segmenter
  const segments = path.split('/').filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  // Bygg opp breadcrumb-items
  const items = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const configEntry = mergedConfig[segment];
    const label = configEntry?.label || segment;
    const icon = configEntry?.icon;
    const isLast = index === segments.length - 1;
    const skipLink = isLast || configEntry?.skipLink;

    return {
      label,
      icon,
      href,
      skipLink,
      segment,
      isFirst: index === 0,
    };
  });

  // Håndter collapse hvis for mange items
  let displayItems = items;
  if (items.length > maxVisible) {
    const firstTwo = items.slice(0, 2);
    const lastTwo = items.slice(-2);
    displayItems = [
      ...firstTwo,
      {
        label: '...',
        icon: undefined,
        href: '',
        skipLink: true,
        segment: 'collapsed',
        isFirst: false,
      },
      ...lastTwo,
    ];
  }

  return (
    <nav aria-label='Brødsmulesti' className={className}>
      <ol className='flex items-center gap-2 '>
        {displayItems.map((item, index) => (
          <Fragment key={`${item.segment}-${index}`}>
            {!item.isFirst && (
              <li aria-hidden className='text-text-subtle'>
                /
              </li>
            )}
            <li className='flex items-center min-w-0'>
              {item.skipLink || item.segment === 'collapsed' ? (
                <span
                  className={`truncate flex items-center gap-1 ${item.segment === 'collapsed' ? 'text-text-subtle' : 'text-text-default font-medium'}`}
                  aria-current={
                    item.skipLink && index === displayItems.length - 1
                      ? 'page'
                      : undefined
                  }
                >
                  {item.icon}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className='truncate flex items-center gap-1 text-text-subtle hover:text-text-default hover:underline'
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
