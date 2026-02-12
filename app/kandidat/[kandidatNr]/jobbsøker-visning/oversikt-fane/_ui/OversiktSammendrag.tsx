import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import InfoBoks from '@/components/InfoBoks';
import { BodyLong, Heading } from '@navikt/ds-react';

export default function OversiktSammendrag() {
  const { kandidatData } = useJobbsøkerContext();

  return (
    <InfoBoks>
      <Heading size='small' className='mb-4'>
        Sammendrag
      </Heading>
      <BodyLong> {kandidatData?.beskrivelse ?? '-'} </BodyLong>
    </InfoBoks>
  );
}
