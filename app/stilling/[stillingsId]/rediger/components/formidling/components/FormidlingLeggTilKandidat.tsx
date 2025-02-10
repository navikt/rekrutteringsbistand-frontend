import * as React from 'react';
import LeggTilKandidater from '../../../../../../components/legg-til-kandidat/LeggTilKandidater';

export interface FormidlingLeggTilKandidatProps {
  children?: React.ReactNode | undefined;
}

const FormidlingLeggTilKandidat: React.FC<FormidlingLeggTilKandidatProps> = ({
  children,
}) => {
  return (
    <React.Fragment>
      <LeggTilKandidater />
    </React.Fragment>
  );
};

export default FormidlingLeggTilKandidat;
