'use client';

import {
  ModiaEventType,
  setModiaContext,
} from '@/app/api/modia/context/setModiaContext';
import { useKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
import LenkeKortMedIkon from '@/components/felles/LenkeKortMedIkon';
import { getMiljø, Miljø } from '@/util/miljø';
import { useState } from 'react';

const arbeidsrettetOppfølgingUrl =
  getMiljø() === Miljø.ProdGcp
    ? 'https://veilarbpersonflate.intern.nav.no'
    : 'https://veilarbpersonflate.intern.dev.nav.no';

export default function NavigerTilAktivitetsplanenKnapp() {
  const { kandidatData } = useKandidatContext();

  const [loading, setLoading] = useState(false);

  const navigerTilAktivitetsplanen = async (
    href: string,
    fødselsnummer: string,
  ) => {
    setLoading(true);
    await setModiaContext(ModiaEventType.NY_AKTIV_BRUKER, fødselsnummer).then(
      () => {
        setTimeout(() => {
          window.open(href, '_blank');
          setLoading(false);
        }, 500);
      },
    );
  };

  if (kandidatData.fodselsnummer) {
    return (
      <LenkeKortMedIkon
        tittel='Gå til aktivitetsplanen'
        beskrivelse='Se aktivitetsplanen i Modia arbeidsrettet oppfølging.'
        loading={loading}
        ikon={'🔗'}
        onClick={() =>
          navigerTilAktivitetsplanen(
            arbeidsrettetOppfølgingUrl,
            kandidatData.fodselsnummer!,
          )
        }
      />
    );
  }
  return null;
}
