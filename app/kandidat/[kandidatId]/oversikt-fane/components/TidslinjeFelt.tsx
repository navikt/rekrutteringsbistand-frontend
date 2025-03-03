import { BodyShort, Box } from '@navikt/ds-react';
import { differenceInMonths, differenceInYears, format } from 'date-fns';
import { nb } from 'date-fns/locale';
import React from 'react';

export const formatDateRange = (fraDato: string, tilDato: string) => {
  const start = new Date(fraDato);
  const end = new Date(tilDato);
  return `${format(start, 'MMMM yyyy', { locale: nb })} - ${format(end, 'MMMM yyyy', { locale: nb })}`;
};

export const calculateDuration = (fraDato: string, tilDato: string) => {
  const start = new Date(fraDato);
  const end = new Date(tilDato);
  const years = differenceInYears(end, start);
  const months = differenceInMonths(end, start) % 12;
  return `${years} år, ${months} mnd.`;
};

interface TidslinjeFeltProps {
  fagDokumentasjon?: boolean;
  startDate?: string | null;
  endDate?: string | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
}

const TidslinjeFelt: React.FC<TidslinjeFeltProps> = ({
  fagDokumentasjon,
  startDate,
  endDate,
  title,
  subtitle,
  description,
}) => {
  return (
    <Box.New className='mb-6 last:mb-0 flex'>
      <Box.New className='w-1/3 pr-4 border-r border-gray-300'>
        {fagDokumentasjon ? (
          <BodyShort textColor='default'>Fagdokumentasjon</BodyShort>
        ) : (
          <>
            <BodyShort textColor='default'>
              {startDate && endDate ? formatDateRange(startDate, endDate) : '-'}
            </BodyShort>
            <BodyShort textColor='subtle' size='small'>
              {startDate && endDate
                ? calculateDuration(startDate, endDate)
                : 'Ingen dato oppgitt'}
            </BodyShort>
          </>
        )}
      </Box.New>
      <Box.New className='w-2/3 pl-4'>
        <BodyShort textColor='subtle'>{subtitle}</BodyShort>
        <BodyShort textColor='default'>{title}</BodyShort>
        {description && (
          <BodyShort className='mt-2' textColor='subtle'>
            {description}
          </BodyShort>
        )}
      </Box.New>
    </Box.New>
  );
};

export default TidslinjeFelt;
