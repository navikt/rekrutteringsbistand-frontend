import { PersonGroupIcon } from '@navikt/aksel-icons';

export interface AntallJobbsøkereProps {
  antall?: number;
}

export default function AntallJobbsøkere({ antall }: AntallJobbsøkereProps) {
  if (antall === null || antall === undefined) {
    return null;
  }
  const tekst =
    antall === 0
      ? 'Ingen jobbsøkere'
      : antall === 1
        ? '1 jobbsøker'
        : `${antall} jobbsøkere`;

  return (
    <div className='flex items-center gap-1 text-nowrap'>
      <PersonGroupIcon /> {tekst}
    </div>
  );
}
