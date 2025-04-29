import { KompetanseSchemaDTO } from '../../../../../api/kandidat-sok/schema/kompetanseSchema.zod';
import GråBoks from './GråBoks';
import Erfaring from './erfaring/Erfaring';
import { ClipboardIcon } from '@navikt/aksel-icons';
import * as React from 'react';

export interface KandidatKompetanseProps {
  kompetanse?: KompetanseSchemaDTO[] | null;
}

const KandidatKompetanse: React.FC<KandidatKompetanseProps> = ({
  kompetanse,
}) => {
  if (!kompetanse || kompetanse.length === 0) {
    return null;
  }
  return (
    <GråBoks tittel='Kompetanse' ikon={<ClipboardIcon />}>
      <Erfaring
        beskrivelse={
          kompetanse
            .filter((k) => k.kompKodeNavn)
            .map((k) => k.kompKodeNavn)
            .join(', ')
          // <MangeTekstelementerSeparertMedKomma
          //   elementer={cv.kompetanseObj.map((u) => u.kompKodeNavn)}
          // />
        }
      />
    </GråBoks>
  );
};

export default KandidatKompetanse;
