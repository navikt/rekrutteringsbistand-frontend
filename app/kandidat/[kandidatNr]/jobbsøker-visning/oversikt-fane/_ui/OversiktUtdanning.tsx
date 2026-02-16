import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import TidslinjeFelt from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/oversikt-fane/_ui/TidslinjeFelt';
import InfoBoks from '@/components/InfoBoks';
import { Heading } from '@navikt/ds-react';

export default function OversiktUtdanning() {
  const { kandidatData } = useJobbsøkerContext();
  return (
    <InfoBoks>
      <Heading size='small' className='mb-4'>
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
    </InfoBoks>
  );
}
