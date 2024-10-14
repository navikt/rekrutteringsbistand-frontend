import { differenceInMonths, differenceInYears, format } from 'date-fns';
import React from 'react';

export const formatDateRange = (fraDato: string, tilDato: string) => {
  const start = new Date(fraDato);
  const end = new Date(tilDato);
  return `${format(start, 'MMM. yyyy')} - ${format(end, 'MMM yyyy')}`;
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
    <div className='mb-6 last:mb-0 flex'>
      <div className='w-1/3 pr-4 border-r border-gray-300'>
        {fagDokumentasjon ? (
          <p className='font-medium'>Fagdokumentasjon</p>
        ) : (
          <>
            <p className='font-medium'>
              {startDate && endDate ? formatDateRange(startDate, endDate) : '-'}
            </p>
            <p className='text-sm text-gray-600'>
              {startDate && endDate
                ? calculateDuration(startDate, endDate)
                : 'Ingen dato oppgitt'}
            </p>
          </>
        )}
      </div>
      <div className='w-2/3 pl-4'>
        <p className='text-s text-gray-600'>{subtitle}</p>
        <p className='font-medium'>{title}</p>
        {description && <p className='mt-2 text-sm'>{description}</p>}
      </div>
    </div>
  );
};

export default TidslinjeFelt;
