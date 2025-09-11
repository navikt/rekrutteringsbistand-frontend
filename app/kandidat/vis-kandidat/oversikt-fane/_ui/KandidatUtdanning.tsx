import TidslinjeFelt from './TidslinjeFelt';
import { useKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
import { Heading } from '@navikt/ds-react';

const KandidatUtdanning: React.FC = () => {
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
