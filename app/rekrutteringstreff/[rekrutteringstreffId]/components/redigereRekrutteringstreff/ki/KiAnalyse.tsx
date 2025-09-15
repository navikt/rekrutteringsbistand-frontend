'use client';

import { EyeIcon, PersonCircleIcon } from '@navikt/aksel-icons';
import { Detail } from '@navikt/ds-react';
import { FC } from 'react';

const KiAnalyse: FC = () => {
  return (
    <div className='space-y-1'>
      <Detail size='small' className='flex items-start gap-2 text-gray-400'>
        <PersonCircleIcon
          aria-hidden
          className='h-6 w-6 shrink-0 self-start mt-0.5'
        />
        <span>
          Ikke skriv personopplysninger og diskriminerende innhold. KI hjelper
          deg å vurdere innholdet, men du er ansvarlig.
        </span>
      </Detail>
      <Detail size='small' className='flex items-start gap-2 text-gray-400'>
        <EyeIcon aria-hidden fontSize='2em' className='mt-0.5' />
        <span>
          Synlig for jobbsøker, arbeidsgivere og NAV-ansatte når treffet er
          publisert.
        </span>
      </Detail>
    </div>
  );
};

export default KiAnalyse;
