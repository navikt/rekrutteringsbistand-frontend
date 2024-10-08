import { Heading } from '@navikt/ds-react';
import { differenceInMonths, differenceInYears, format } from 'date-fns';
import * as React from 'react';
import { useKandidatContext } from '../KandidatContext';

export interface KandidatUtdanningProps {
  children?: React.ReactNode | undefined;
}

const KandidatUtdanning: React.FC<KandidatUtdanningProps> = ({ children }) => {
  const { kandidatData } = useKandidatContext();

  const formatDateRange = (fraDato: string, tilDato: string) => {
    const start = new Date(fraDato);
    const end = new Date(tilDato);
    return `${format(start, 'MMM. yyyy')} - ${format(end, 'MMM yyyy')}`;
  };

  const calculateDuration = (fraDato: string, tilDato: string) => {
    const start = new Date(fraDato);
    const end = new Date(tilDato);
    const years = differenceInYears(end, start);
    const months = differenceInMonths(end, start) % 12;
    return `${years} år, ${months} mnd.`;
  };

  return (
    <div>
      <Heading size='large'>Utdanning</Heading>
      <div className='bg-white p-6 rounded-lg shadow-sm'>
        <h2 className='text-xl font-semibold mb-4'>Utdanning</h2>
        {kandidatData.utdanning?.map((edu, index) => (
          <div key={index} className='mb-6 last:mb-0 flex'>
            <div className='w-1/3 pr-4 border-r border-gray-300'>
              <p className='font-medium'>
                {formatDateRange(edu?.fraDato ?? '', edu?.tilDato ?? '')}
              </p>
              <p className='text-sm text-gray-600'>
                {calculateDuration(edu?.fraDato ?? '', edu?.tilDato ?? '')}
              </p>
            </div>
            <div className='w-2/3 pl-4'>
              <p className='text-s text-gray-600'>{edu?.utdannelsessted}</p>
              <p className='font-medium'>{edu?.alternativGrad}</p>
              {edu?.beskrivelse && (
                <p className='mt-2 text-sm'>{edu?.beskrivelse}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KandidatUtdanning;
