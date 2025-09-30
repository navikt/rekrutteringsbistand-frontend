import TidslinjeFelt from './TidslinjeFelt';
import { useKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
import { Heading } from '@navikt/ds-react';
import { FC } from 'react';

const KandidatUtdanning: FC = () => {
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
          description={edu?.beskrivelse}
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
          description={fag?.beskrivelse}
        />
      ))}
    </div>
  );
};

export default KandidatUtdanning;
