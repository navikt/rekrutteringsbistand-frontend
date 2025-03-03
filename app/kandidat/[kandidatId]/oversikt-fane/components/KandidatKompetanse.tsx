import { KompetanseSchemaDTO } from '../../../../api/kandidat-sok/schema/kompetanseSchema.zod';
import GråRamme from './GråRamme';
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
    <GråRamme tittel='Kompetanse' ikon={<ClipboardIcon />}>
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
    </GråRamme>
  );
};

export default KandidatKompetanse;
