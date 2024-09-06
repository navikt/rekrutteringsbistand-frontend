import { Alert } from '@navikt/ds-react';
import * as React from 'react';
import { stillingsDataDTO } from '../stilling-typer';

export interface IStillingInnhold {
  stilling: stillingsDataDTO;
}

const StillingInnhold: React.FC<IStillingInnhold> = ({ stilling }) => {
  return (
    <div className='mt-4'>
      <Alert variant='info'>
        <div>Info</div>
      </Alert>
    </div>
  );
};

export default StillingInnhold;
