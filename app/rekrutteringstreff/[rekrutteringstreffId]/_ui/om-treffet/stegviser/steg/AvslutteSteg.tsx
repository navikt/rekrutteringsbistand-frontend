import { Detail } from '@navikt/ds-react';
import { FC } from 'react';

interface Props {
  harAvsluttet: boolean;
}

const AvslutteSteg: FC<Props> = ({ harAvsluttet }) => {
  return (
    <div className='flex-1'>
      {harAvsluttet ? (
        <Detail spacing>Treffet er avsluttet.</Detail>
      ) : (
        <Detail spacing>
          Her kan du avslutte og evaluere rekrutteringstreffet.
        </Detail>
      )}
    </div>
  );
};

export default AvslutteSteg;
