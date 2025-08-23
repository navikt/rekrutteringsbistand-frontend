import { Detail } from '@navikt/ds-react';
import * as React from 'react';

interface Props {
  harAvsluttet: boolean;
}

const AvslutteSteg: React.FC<Props> = ({ harAvsluttet }) => {
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
