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

export interface NavigerTilAktivitetsplanenKnappProps {
  sidebar?: boolean;
}

const NavigerTilAktivitetsplanenKnapp: React.FC<
  NavigerTilAktivitetsplanenKnappProps
> = ({ sidebar }) => {
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
        size={sidebar ? 'small' : 'medium'}
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
