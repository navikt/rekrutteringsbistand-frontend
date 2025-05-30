import { usynligKandidaterSchemaDTO } from '../../../../../../api/kandidat/schema.zod';
import { storForbokstav } from '../../../../../../kandidat/util';
import { KandidatVisningProps } from '../../KandidatlisteFilter/useFiltrerteKandidater';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatlisteNavnProps {
  kandidat?: KandidatVisningProps;
  usynligKandidat?: usynligKandidaterSchemaDTO;
  slettet?: boolean;
}

const KandidatlisteNavn: React.FC<KandidatlisteNavnProps> = ({
  kandidat,
  usynligKandidat,
  slettet,
}) => {
  if (usynligKandidat) {
    return (
      <div className={`flex flex-col `}>
        <BodyShort>
          {storForbokstav(usynligKandidat.etternavn)},{' '}
          {storForbokstav(usynligKandidat.fornavn)}
        </BodyShort>
        <BodyShort textColor='subtle'>Usynlig kandidat</BodyShort>
      </div>
    );
  }

  if (!kandidat) {
    return null;
  }

  if (!kandidat?.fodselsnr) {
    return (
      <div className={`flex flex-col `}>
        <BodyShort>
          {kandidat.etternavn}, {kandidat.fornavn}
        </BodyShort>
        <BodyShort textColor='subtle'>Inaktiv kandidat</BodyShort>
      </div>
    );
  }

  if (slettet) {
    return (
      <div className={`flex flex-col `}>
        {kandidat.etternavn}, {kandidat.fornavn}
        <BodyShort textColor='subtle'>
          Slettet av {kandidat.arkivertAv?.navn}
        </BodyShort>
      </div>
    );
  }

  return (
    <div className={`flex flex-col `}>
      {kandidat.etternavn}, {kandidat.fornavn}
      <BodyShort textColor='subtle'>f.nr. {kandidat.fodselsnr}</BodyShort>
    </div>
  );
};

export default KandidatlisteNavn;
