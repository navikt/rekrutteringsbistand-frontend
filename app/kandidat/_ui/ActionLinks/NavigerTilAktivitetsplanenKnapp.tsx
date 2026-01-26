'use client';

import { useKandidatContext } from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';
import { setModiaBrukerOgNaviger } from '@/app/kandidat/util';
import LenkeKortMedIkon from '@/components/lenke-kort/LenkeKortMedIkon';
import { getMiljø, Miljø } from '@/util/miljø';
import { LinkIcon } from '@navikt/aksel-icons';
import { ActionMenu } from '@navikt/ds-react';
import { useState } from 'react';

const arbeidsrettetOppfølgingUrl =
  getMiljø() === Miljø.ProdGcp
    ? 'https://veilarbpersonflate.intern.nav.no'
    : 'https://veilarbpersonflate.intern.dev.nav.no';

export interface NavigerTilAktivitetsplanenKnappProps {
  fnr: string | null;
  actionMenu?: boolean;
}

export function NavigerTilAktivitetsplanenMedContext() {
  const { kandidatData } = useKandidatContext();

  if (!kandidatData.fodselsnummer) {
    return null;
  }
  return <NavigerTilAktivitetsplanenKnapp fnr={kandidatData.fodselsnummer} />;
}

export default function NavigerTilAktivitetsplanenKnapp({
  fnr,
  actionMenu,
}: NavigerTilAktivitetsplanenKnappProps) {
  const [loading, setLoading] = useState(false);

  const navigerTilAktivitetsplanen = async (
    href: string,
    fødselsnummer: string,
  ) => {
    setLoading(true);
    await setModiaBrukerOgNaviger(href, fødselsnummer);
    setLoading(false);
  };

  if (!fnr) {
    return null;
  }

  if (actionMenu) {
    return (
      <>
        <ActionMenu.Item
          onSelect={() =>
            navigerTilAktivitetsplanen(arbeidsrettetOppfølgingUrl, fnr)
          }
        >
          <LinkIcon /> Gå til aktivitetsplanen
        </ActionMenu.Item>
      </>
    );
  }

  return (
    <LenkeKortMedIkon
      tittel='Gå til aktivitetsplanen'
      beskrivelse='Se aktivitetsplanen i Modia arbeidsrettet oppfølging.'
      loading={loading}
      ikon={'🔗'}
      onClick={() =>
        navigerTilAktivitetsplanen(arbeidsrettetOppfølgingUrl, fnr)
      }
    />
  );
}
