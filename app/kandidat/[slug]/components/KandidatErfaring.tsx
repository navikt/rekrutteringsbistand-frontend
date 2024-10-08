import { Heading } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatErfaringProps {
  children?: React.ReactNode | undefined;
}

const KandidatErfaring: React.FC<KandidatErfaringProps> = ({ children }) => {
  return (
    <div>
      <Heading size='large'>Erfaring</Heading>
    </div>
  );
};

export default KandidatErfaring;
