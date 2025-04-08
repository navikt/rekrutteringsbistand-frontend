'use client';

import { getMiljø, Miljø } from '../../util/miljø';
import { postApi } from '../api/fetcher';
import { useKandidatContext } from '../kandidat/[kandidatId]/KandidatContext';
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
    await postApi(`/api/context`, {
      verdi: fødselsnummer,
      eventType: 'NY_AKTIV_BRUKER',
    }).then(() => window.open(href, '_blank'));
  };

  if (kandidatData.fodselsnummer) {
    return (
      <Button
        variant='tertiary'
        className='mt-4'
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
