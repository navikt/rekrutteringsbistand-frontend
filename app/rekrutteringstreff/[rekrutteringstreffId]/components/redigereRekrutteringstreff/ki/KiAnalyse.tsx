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
          Ikke skriv personopplysninger og diskriminerende innhold. KI-verktøyet
          hjelper deg med å vurdere innholdet, men du er ansvarlig for all tekst
          som står i treffet.
        </span>
      </Detail>
    </div>
  );
};

export default KiAnalyse;
