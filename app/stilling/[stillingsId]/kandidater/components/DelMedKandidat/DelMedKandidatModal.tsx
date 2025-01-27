import { ArrowForwardIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { kandidatlisteSchemaDTO } from '../../../../../api/kandidat/schema.zod';

export interface DelMedKandidatModalProps {
  markerteFnr: string[];
  fjernAllMarkering: () => void;
  kandidatliste: kandidatlisteSchemaDTO;
}

const DelMedKandidatModal: React.FC<DelMedKandidatModalProps> = ({
  markerteFnr,
  fjernAllMarkering,
  kandidatliste,
}) => {
  const [modalErÅpen, setModalErÅpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button
        onClick={() => setModalErÅpen(true)}
        disabled
        variant='tertiary'
        icon={<ArrowForwardIcon title='Del med kandidat' />}
      >
        Del med kandidat
      </Button>
    </React.Fragment>
  );
};

export default DelMedKandidatModal;
