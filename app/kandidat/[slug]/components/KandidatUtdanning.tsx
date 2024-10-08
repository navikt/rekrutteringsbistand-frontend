import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatContext } from '../KandidatContext';
import TidslinjeFelt from './TidslinjeFelt';

export interface KandidatUtdanningProps {
  children?: React.ReactNode | undefined;
}

const KandidatUtdanning: React.FC<KandidatUtdanningProps> = ({ children }) => {
  const { kandidatData } = useKandidatContext();

  return (
    <div>
      <Heading size='large'>Utdanning</Heading>
      <div className='bg-white p-6 rounded-lg shadow-sm'>
        {kandidatData.utdanning?.map((edu, index) => (
          <TidslinjeFelt
            key={index}
            startDate={edu?.fraDato}
            endDate={edu?.tilDato}
            title={edu?.alternativGrad}
            subtitle={edu?.utdannelsessted}
          />
        )) ?? 'Ingen utdanning registrert'}
      </div>
    </div>
  );
};

export default KandidatUtdanning;
