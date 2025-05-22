import Kontaktpersoner from '../omStillingen/Kontaktpersoner';
import { Heading } from '@navikt/ds-react';
import * as React from 'react';

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
    <div className='pb-14'>
      <Heading size='medium' className='mb-8'>
        {tittel}
      </Heading>
      {!innholdTopp && innhold && (
        <div className='prose prose-ul:list-disc prose-ul:pl-6 max-w-none pb-8 [&_ul]:list-disc [&_ul]:pl-6'>
          {innhold}
        </div>
      )}

      <div className='mt-4 grid  grid-cols-1 2xl:grid-cols-3 gap-4'>
        {gridInnhold}
      </div>
      {innholdTopp && innhold && (
        <div className='prose prose-ul:list-disc prose-ul:pl-6 max-w-none pt-8 [&_ul]:list-disc [&_ul]:pl-6'>
          {innhold}
        </div>
      )}
      {kontaktpersoner && <Kontaktpersoner />}
    </div>
  );
};

export default OmStillingBoks;
