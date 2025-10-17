// Bruk absolutte alias som er konfigurert i tsconfig ("@/*": ["./*"]) - fungerer også i Storybook
import { kandidatlisteSchemaDTO } from '../app/api/kandidat/schema.zod';
import { mockBaseStilling } from '../app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import { StillingsContextMedData } from '../app/stilling/[stillingsId]/StillingsContext';
import {
  InternKandidatstatus,
  KandidatutfallTyper,
} from '../app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { KandidatlisteContextProvider } from '../app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import React from 'react';

// Default stillingsData (bruker mockBaseStilling fra eksisterende mock)
const defaultStillingsData = mockBaseStilling;

// Helper to create a kandidatliste mock with variable kandidat status/utfall
export const createKandidatlisteMock = (opts?: {
  status?: InternKandidatstatus;
  utfall?: KandidatutfallTyper;
  antall?: number;
  lukket?: boolean;
  stillingsData?: typeof mockBaseStilling;
}): kandidatlisteSchemaDTO => {
  const {
    status = InternKandidatstatus.VURDERES,
    utfall = KandidatutfallTyper.PRESENTERT,
    antall = 3,
    lukket,
    stillingsData = defaultStillingsData,
  } = opts || {};
  const now = new Date().toISOString();
  const kandidater = Array.from({ length: antall }).map((_, i) => ({
    kandidatId: `kandidat-arenaKandidatnr-${i + 1}`,
    kandidatnr: `kandidat-arenaKandidatnr-${i + 1}`,
    status,
    lagtTilTidspunkt: now,
    lagtTilAv: { ident: 'Z123456', navn: 'Veileder V Veiledersen' },
    fornavn: 'Kandidat',
    etternavn: `Nr${i + 1}`,
    fodselsdato: '1990-01-01',
    fodselsnr: null,
    utfall,
    telefon: null,
    epost: null,
    innsatsgruppe: 'STANDARD',
    antallNotater: 0,
    arkivert: false,
    arkivertTidspunkt: null,
    arkivertAv: null,
    aktørid: null,
    utfallsendringer: [
      {
        utfall,
        registrertAvIdent: 'Z123456',
        tidspunkt: now,
        sendtTilArbeidsgiversKandidatliste: false,
      },
    ],
  }));

  return {
    kandidatlisteId: 'demo-liste',
    tittel: 'Kandidatliste Demo',
    organisasjonReferanse: '312113341',
    organisasjonNavn: 'MockOrg AS',
    stillingId: stillingsData.stilling.uuid,
    opprettetAv: { ident: 'Z123456', navn: 'Veileder V Veiledersen' },
    opprettetTidspunkt: now,
    kandidater,
    kanEditere: true,
    erEier: true,
    kanSlette: 'JA',
    formidlingerAvUsynligKandidat: [],
    status: lukket ? 'LUKKET' : 'ÅPEN',
    antallStillinger: 1,
    stillingskategori:
      stillingsData.stillingsinfo?.stillingskategori || 'STILLING',
  } as kandidatlisteSchemaDTO;
};

export interface StillingsDecoratorProps {
  kandidatliste?: kandidatlisteSchemaDTO;
  stillingsDataOverride?: typeof mockBaseStilling;
  children: React.ReactNode;
}

export const StillingsOgKandidatlisteDecorator: React.FC<
  StillingsDecoratorProps
> = ({ kandidatliste, stillingsDataOverride, children }) => {
  const liste = kandidatliste || createKandidatlisteMock();
  const stillingsData = stillingsDataOverride || defaultStillingsData;

  // StillingsContextMedData forventer stillingsData og optional refetch
  return (
    <StillingsContextMedData stillingsData={stillingsData}>
      <KandidatlisteContextProvider
        kandidatliste={liste}
        forespurteKandidater={{ foresporsler: [] } as any}
        beskjeder={{}}
        reFetchKandidatliste={() => {}}
      >
        {children}
      </KandidatlisteContextProvider>
    </StillingsContextMedData>
  );
};

// Convenience wrapper for stories
export const withStillingsKandidatliste = (
  fn: () => React.ReactNode,
  liste?: kandidatlisteSchemaDTO,
  stillingsDataOverride?: typeof mockBaseStilling,
) => (
  <StillingsOgKandidatlisteDecorator
    kandidatliste={liste}
    stillingsDataOverride={stillingsDataOverride}
  >
    {fn()}
  </StillingsOgKandidatlisteDecorator>
);
