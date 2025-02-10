import { BodyLong, Heading } from '@navikt/ds-react';
import * as React from 'react';
import LeggTilKandidater from '../../../../../../components/legg-til-kandidat/LeggTilKandidater';

export interface FormidlingLeggTilKandidatProps {
  children?: React.ReactNode | undefined;
}

const FormidlingLeggTilKandidat: React.FC<FormidlingLeggTilKandidatProps> = ({
  children,
}) => {
  //TODO
  return (
    <React.Fragment>
      <Heading size='large'>Om kandidatene</Heading>
      <BodyLong>Vi må vite hvilke kandidater du ønsker å formidle</BodyLong>
      <div className='mt-4'>
        <LeggTilKandidater måHaAktørId callBack={() => {}} />
      </div>
    </React.Fragment>
  );
};

export default FormidlingLeggTilKandidat;
