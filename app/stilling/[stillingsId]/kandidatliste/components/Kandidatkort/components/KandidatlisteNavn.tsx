import { usynligKandidaterSchemaDTO } from '../../../../../../api/kandidat/schema.zod';
import { storForbokstav } from '../../../../../../kandidat/util';
import { KandidatVisningProps } from '../../KandidatlisteFilter/useFiltrerteKandidater';
import { BodyShort } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
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
  const [, setVisKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const onKandidatKlikk = () => {
    setVisKandidatnr(kandidat?.kandidatnr ?? '');
  };

  if (usynligKandidat) {
    return (
      <div className={`flex flex-col gap-2`}>
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
      <div className={`flex flex-col gap-2`}>
        <BodyShort>
          {kandidat.etternavn}, {kandidat.fornavn}
        </BodyShort>
        <BodyShort textColor='subtle'>Inaktiv kandidat</BodyShort>
      </div>
    );
  }

  if (slettet) {
    return (
      <div className={`flex flex-col gap-2`}>
        <span
          className='aksel-link aksel-link--action cursor-pointer'
          onClick={onKandidatKlikk}
        >
          {kandidat.etternavn}, {kandidat.fornavn}
        </span>
        <span>Slettet av {kandidat.arkivertAv?.navn}</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2`}>
      <span
        className='aksel-link aksel-link--action cursor-pointer'
        onClick={onKandidatKlikk}
      >
        {kandidat.etternavn}, {kandidat.fornavn}
      </span>
      <span>f.nr. {kandidat.fodselsnr}</span>
    </div>
  );
};

export default KandidatlisteNavn;
