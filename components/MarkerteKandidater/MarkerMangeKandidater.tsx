'use client';

import { useHentMangeKandidater } from '@/app/api/kandidat-sok/useHentMangeKandidater';
import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from '@/app/kandidat/KandidaSokFilterContext';
import {
  MarkertKandidat,
  useKandidatSøkMarkerteContext,
} from '@/app/kandidat/KandidatSøkMarkerteContext';
import { erKandidatLagtTil } from '@/app/kandidat/erKandidatLagtTil';
import { Alert, Button, HStack, TextField } from '@navikt/ds-react';
import { FC, useState } from 'react';

export interface MarkerMangeKandidaterProps {
  portefølje: KandidatSøkPortefølje;
  antallTotalt: number;
  alleredeLagtTil?: string[];
}

const MAKS_ANTALL = 2000;
const STANDARD_ANTALL = 100;

const MarkerMangeKandidater: FC<MarkerMangeKandidaterProps> = ({
  portefølje,
  antallTotalt,
  alleredeLagtTil,
}) => {
  const filter = useKandidatSøkFilterContext();
  const { hentMange } = useHentMangeKandidater(portefølje, filter);
  const { markerteKandidater, setMarkertListe } =
    useKandidatSøkMarkerteContext();

  const [ønsketAntall, setØnsketAntall] = useState(
    String(Math.min(STANDARD_ANTALL, antallTotalt)),
  );
  const [laster, setLaster] = useState(false);
  const [feilmelding, setFeilmelding] = useState<string | null>(null);

  const håndterHent = async () => {
    const antall = Math.min(
      MAKS_ANTALL,
      Math.max(1, Number(ønsketAntall) || 0),
    );
    setFeilmelding(null);
    setLaster(true);
    try {
      const { kandidater } = await hentMange(antall);

      const kandidaterPerId = new Map(
        markerteKandidater.map((k) => [k.arenaKandidatnr, k]),
      );
      for (const kandidat of kandidater) {
        if (
          !kandidat.arenaKandidatnr ||
          erKandidatLagtTil(kandidat, alleredeLagtTil)
        ) {
          continue;
        }
        if (!kandidaterPerId.has(kandidat.arenaKandidatnr)) {
          const markert: MarkertKandidat = {
            arenaKandidatnr: kandidat.arenaKandidatnr,
            fodselsnummer: kandidat.fodselsnummer ?? null,
            fornavn: kandidat.fornavn ?? null,
            etternavn: kandidat.etternavn ?? null,
          };
          kandidaterPerId.set(kandidat.arenaKandidatnr, markert);
        }
      }
      setMarkertListe([...kandidaterPerId.values()]);
    } catch {
      setFeilmelding('Klarte ikke å hente kandidatene. Prøv igjen.');
    } finally {
      setLaster(false);
    }
  };

  return (
    <HStack align='end' gap='space-8' wrap>
      <TextField
        label='Antall kandidater å markere'
        hideLabel={false}
        size='small'
        type='number'
        min={1}
        max={Math.min(MAKS_ANTALL, antallTotalt)}
        value={ønsketAntall}
        onChange={(e) => setØnsketAntall(e.target.value)}
        style={{ maxWidth: '10rem' }}
      />
      <Button
        size='small'
        variant='secondary'
        loading={laster}
        onClick={() => void håndterHent()}
      >
        Hent og marker kandidater
      </Button>
      {feilmelding && (
        <Alert variant='error' size='small'>
          {feilmelding}
        </Alert>
      )}
    </HStack>
  );
};

export default MarkerMangeKandidater;
