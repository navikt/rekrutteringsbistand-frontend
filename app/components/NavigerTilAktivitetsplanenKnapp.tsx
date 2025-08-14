'use client';

import { getMiljø, Miljø } from '../../util/miljø';
import {
  ModiaEventType,
  setModiaContext,
} from '../api/context/setModiaContext';
import { useKandidatContext } from '../kandidat/vis-kandidat/KandidatContext';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

const arbeidsrettetOppfølgingUrl =
  getMiljø() === Miljø.ProdGcp
    ? 'https://veilarbpersonflate.intern.nav.no'
    : 'https://veilarbpersonflate.intern.dev.nav.no';

const NavigerTilAktivitetsplanenKnapp: React.FC = () => {
  const { kandidatData } = useKandidatContext();
  const navigerTilAktivitetsplanen = async (
    href: string,
    fødselsnummer: string,
  ) => {
    await setModiaContext(ModiaEventType.NY_AKTIV_BRUKER, fødselsnummer).then(
      () => window.open(href, '_blank'),
    );
  };

  if (kandidatData.fodselsnummer) {
    return (
      <Button
        size={'small'}
        variant={'secondary'}
        icon={<ExternalLinkIcon />}
        onClick={() =>
          navigerTilAktivitetsplanen(
            arbeidsrettetOppfølgingUrl,
            kandidatData.fodselsnummer!,
          )
        }
      >
        Gå til aktivitetsplanen
      </Button>
    );
  }
  return null;
};

export default NavigerTilAktivitetsplanenKnapp;
