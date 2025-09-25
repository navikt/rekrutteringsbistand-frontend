import { useKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
import { BodyShort } from '@navikt/ds-react';

export default function KandidatNavn() {
  const { kandidatData } = useKandidatContext();
  return (
    <BodyShort>
      {kandidatData.fornavn} {kandidatData.etternavn}
    </BodyShort>
  );
}
