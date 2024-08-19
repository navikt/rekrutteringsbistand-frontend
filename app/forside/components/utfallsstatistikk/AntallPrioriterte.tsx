import { BodyShort, Skeleton } from '@navikt/ds-react';
import * as React from 'react';
import { AntallDTO } from '../../../api/statistikk/statistikk';

export interface IAntallPrioriterte {
  antall: AntallDTO;
}

const AntallPrioriterte: React.FC<IAntallPrioriterte> = ({ antall }) => {
  if (antall !== undefined) {
    return (
      <BodyShort size='small' as='ul' className='text-text-subtle p-0'>
        <li className='inline-flex'>{antall.under30år} var under 30 år</li>
        <li className='inline-flex'>
          {antall.innsatsgruppeIkkeStandard} hadde ikke standardinnsats
        </li>
      </BodyShort>
    );
  } else {
    return <Skeleton width={100} />;
  }
};

export default AntallPrioriterte;
