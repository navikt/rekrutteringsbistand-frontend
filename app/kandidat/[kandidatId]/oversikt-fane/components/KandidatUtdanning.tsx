import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatContext } from '../../KandidatContext';
import TidslinjeFelt from './TidslinjeFelt';

export interface KandidatUtdanningProps {
  children?: React.ReactNode | undefined;
}

const KandidatUtdanning: React.FC<KandidatUtdanningProps> = ({ children }) => {
  const { kandidatData } = useKandidatContext();

  return (
    <div>
      <Heading size='medium' className='mb-4'>
        Utdanning
      </Heading>
      {kandidatData.utdanning?.map((edu, index) => (
        <TidslinjeFelt
          key={index}
          startDate={edu?.fraDato}
          endDate={edu?.tilDato}
          title={edu?.alternativGrad}
          subtitle={edu?.utdannelsessted}
        />
      ))}
      {kandidatData.fagdokumentasjon?.map((fag, index) => (
        <TidslinjeFelt
          fagDokumentasjon
          key={index}
          startDate={null}
          endDate={null}
          title={fag?.tittel}
          subtitle={fag?.type}
        />
      ))}
    </div>
  );
};

export default KandidatUtdanning;
