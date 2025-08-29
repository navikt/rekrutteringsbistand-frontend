// app/rekrutteringstreff/[rekrutteringstreffId]/steg/PublisereSteg.tsx
'use client';

import {
  SjekklisteContainer,
  SjekklisteRad,
  SjekklisteSeparator,
} from './Sjekkliste';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { Detail, Loader } from '@navikt/ds-react';
import * as React from 'react';

// app/rekrutteringstreff/[rekrutteringstreffId]/steg/PublisereSteg.tsx

// app/rekrutteringstreff/[rekrutteringstreffId]/steg/PublisereSteg.tsx

// app/rekrutteringstreff/[rekrutteringstreffId]/steg/PublisereSteg.tsx

// app/rekrutteringstreff/[rekrutteringstreffId]/steg/PublisereSteg.tsx

// app/rekrutteringstreff/[rekrutteringstreffId]/steg/PublisereSteg.tsx

// app/rekrutteringstreff/[rekrutteringstreffId]/steg/PublisereSteg.tsx

const DEFAULT_TITTEL = 'Nytt rekrutteringstreff';

const sjekklisteData = [
  { id: 'arbeidsgiver', label: 'Minst 1 arbeidsgiver' },
  { id: 'navn', label: 'Navn' },
  { id: 'sted', label: 'Sted' },
  { id: 'tidspunkt', label: 'Tidspunkt' },
  { id: 'svarfrist', label: 'Svarfrist' },
  { id: 'omtreffet', label: 'Om treffet' },
] as const;

const PublisereSteg: React.FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const { data: arbeidsgivereData, isLoading: arbeidsgivereLoading } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const { data: rekrutteringstreffData, isLoading: rekrutteringstreffLoading } =
    useRekrutteringstreff(rekrutteringstreffId);

  const { data: innleggData, isLoading: innleggLoading } =
    useInnlegg(rekrutteringstreffId);

  const checkedItems: Record<(typeof sjekklisteData)[number]['id'], boolean> =
    React.useMemo(() => {
      const tittel = rekrutteringstreffData?.tittel?.trim() ?? '';
      return {
        arbeidsgiver: (arbeidsgivereData?.length ?? 0) > 0,
        navn: tittel.length > 0 && tittel !== DEFAULT_TITTEL,
        sted:
          !!rekrutteringstreffData?.gateadresse?.trim() &&
          !!rekrutteringstreffData?.poststed?.trim(),
        tidspunkt: !!rekrutteringstreffData?.fraTid,
        svarfrist: !!rekrutteringstreffData?.svarfrist,
        omtreffet: (innleggData?.length ?? 0) > 0,
      };
    }, [arbeidsgivereData, rekrutteringstreffData, innleggData]);

  const loading =
    arbeidsgivereLoading || rekrutteringstreffLoading || innleggLoading;

  return (
    <SjekklisteContainer>
      <Detail spacing>
        Før treffet er tilgjengelig for andre, og du kan invitere jobbsøker, må
        noen detaljer være på plass først:
      </Detail>

      {loading && <Loader size='medium' title='Laster sjekkliste status...' />}

      {!loading &&
        sjekklisteData.map((item, idx) => {
          const erOppfylt = !!checkedItems[item.id];
          return (
            <React.Fragment key={item.id}>
              <SjekklisteRad erOppfylt={erOppfylt} label={item.label} />
              {idx < sjekklisteData.length - 1 && <SjekklisteSeparator />}
            </React.Fragment>
          );
        })}
    </SjekklisteContainer>
  );
};

export default PublisereSteg;
