import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import Kontaktpersoner from '../omStillingen/Kontaktpersoner';

export interface OmStillingBoksProps {
  tittel: string;
  gridInnhold: React.ReactNode;
  innhold?: React.ReactNode;
  innholdTopp?: boolean;
  kontaktpersoner?: boolean;
}

const OmStillingBoks: React.FC<OmStillingBoksProps> = ({
  tittel,
  gridInnhold,
  innhold,
  innholdTopp,
  kontaktpersoner,
}) => {
  return (
    <div className='pt-14 pb-14'>
      <Heading size='medium' className='mb-8'>
        {tittel}
      </Heading>
      {!innholdTopp && innhold && <div className='pb-8'>{innhold}</div>}

      <div className='grid grid-cols-3 gap-4 mt-4'>{gridInnhold}</div>
      {innholdTopp && innhold && <div className='pt-14'>{innhold}</div>}
      {kontaktpersoner && <Kontaktpersoner />}
    </div>
  );
};

export default OmStillingBoks;
