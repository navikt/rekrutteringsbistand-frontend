import { BodyLong, Heading } from '@navikt/ds-react';
import { ReactNode } from 'react';

type Props = {
  overskrift?: string | null;
  beskrivelse?: string | ReactNode;
  detaljer?: ReactNode;
};
const Erfaring = ({ overskrift, beskrivelse, detaljer }: Props) => {
  return (
    <div className='mb-2'>
      {overskrift && (
        <Heading size='xsmall' level='3'>
          {overskrift}
        </Heading>
      )}
      {detaljer}
      {beskrivelse && <BodyLong size='small'>{beskrivelse}</BodyLong>}
    </div>
  );
};

export default Erfaring;
