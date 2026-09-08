'use client';

import { useOppdaterJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useOppdaterJobbsøkere';
import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import {
  medOptimistiskOppmøte,
  type Oppmøteendring,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/optimistiskeRegistreringer';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useSekvensiellAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useSekvensiellAutolagring';
import { useMemo } from 'react';

type Props = {
  rekrutteringstreffId: string;
  treffgjennomføring: TreffgjennomføringDTO;
  oppdatering: TreffgjennomføringOppdatering;
};

export const useOppmøteAutolagring = ({
  rekrutteringstreffId,
  treffgjennomføring,
  oppdatering,
}: Props) => {
  const oppdaterJobbsøkere = useOppdaterJobbsøkere();

  const {
    erVentende,
    feilFor,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagre,
    optimistiskeVerdier,
  } = useSekvensiellAutolagring<Oppmøteendring>({
    lagreTilServer: (endring) =>
      oppdaterOppmøte(
        rekrutteringstreffId,
        endring.personTreffId,
        endring.skalMøte,
      ),
    oppdatering: {
      brukLagretSvar: async (oppdatert) => {
        await oppdatering.brukLagretSvar(oppdatert);
        await oppdaterJobbsøkere(rekrutteringstreffId);
      },
      hentBekreftetTilstand: async () => {
        await oppdatering.hentBekreftetTilstand();
        await oppdaterJobbsøkere(rekrutteringstreffId);
      },
    },
    hentNøkkel: (endring) => endring.personTreffId,
  });

  const treffgjennomføringForVisning = useMemo(
    () => medOptimistiskOppmøte(treffgjennomføring, optimistiskeVerdier),
    [treffgjennomføring, optimistiskeVerdier],
  );

  const lagreOppmøte = (
    personTreffId: string,
    skalMøte: boolean,
    navn: string,
  ) => {
    lagre(
      { personTreffId, skalMøte },
      {
        lagrer: skalMøte
          ? `Registrerer oppmøte for ${navn}.`
          : `Fjerner oppmøte for ${navn}.`,
        lagret: skalMøte
          ? `Oppmøte for ${navn} er registrert.`
          : `Oppmøte for ${navn} er fjernet.`,
        feilmelding: `Vi kunne ikke bekrefte oppmøteendringen for ${navn}. Kontroller oppmøtet før du prøver igjen.`,
      },
    );
  };

  return {
    treffgjennomføringForVisning,
    erOppmøteVentende: erVentende,
    feilForOppmøte: feilFor,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreOppmøte,
  };
};
