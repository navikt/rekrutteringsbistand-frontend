'use client';
import { oppdaterØnske } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import {
  MøtedagDTO,
  InteresseDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import type { MøtedagOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useMøtedagFane';
import { useSekvensiellAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useSekvensiellAutolagring';
import { useCallback, useMemo } from 'react';

type Ønskeendring = InteresseDTO & { interessert: boolean };

type Props = {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  onMøtedagOppdatert: MøtedagOppdatering;
};

const ønskeNøkkel = ({ personTreffId, arbeidsgiverTreffId }: InteresseDTO) =>
  `${personTreffId}:${arbeidsgiverTreffId}`;

const medOptimistiskeØnsker = (
  møtedag: MøtedagDTO,
  optimistiskeØnsker: Record<string, Ønskeendring>,
): MøtedagDTO => {
  let interesser = [...møtedag.interesser];

  for (const interesse of Object.values(optimistiskeØnsker)) {
    interesser = interesser.filter(
      (lagretØnske) => ønskeNøkkel(lagretØnske) !== ønskeNøkkel(interesse),
    );
    if (interesse.interessert) {
      interesser.push({
        personTreffId: interesse.personTreffId,
        arbeidsgiverTreffId: interesse.arbeidsgiverTreffId,
      });
    }
  }

  return { ...møtedag, interesser };
};

export const useInteresseAutolagring = ({
  rekrutteringstreffId,
  møtedag,
  onMøtedagOppdatert,
}: Props) => {
  const utførLagring = useCallback(
    async (interesse: Ønskeendring) => {
      const oppdatertMøtedag = await oppdaterØnske(
        rekrutteringstreffId,
        {
          personTreffId: interesse.personTreffId,
          arbeidsgiverTreffId: interesse.arbeidsgiverTreffId,
        },
        interesse.interessert,
      );
      await onMøtedagOppdatert(oppdatertMøtedag);
    },
    [onMøtedagOppdatert, rekrutteringstreffId],
  );
  const hentMøtedagPåNytt = useCallback(
    () => onMøtedagOppdatert(),
    [onMøtedagOppdatert],
  );

  const {
    erVentende,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagre,
    optimistiskeVerdier,
    ventTilLagringerErFerdige,
  } = useSekvensiellAutolagring({
    nøkkelFor: ønskeNøkkel,
    utførLagring,
    vedLagringsfeil: hentMøtedagPåNytt,
  });

  const effektivMøtedag = useMemo(
    () => medOptimistiskeØnsker(møtedag, optimistiskeVerdier),
    [møtedag, optimistiskeVerdier],
  );

  const lagreØnske = useCallback(
    (
      personTreffId: string,
      arbeidsgiverTreffId: string,
      interessert: boolean,
    ) => {
      lagre(
        { personTreffId, arbeidsgiverTreffId, interessert },
        {
          lagrer: 'Lagrer ønske.',
          lagret: 'Ønsket er lagret.',
          feilmelding: 'Kunne ikke lagre ønsket. Prøv igjen.',
        },
      );
    },
    [lagre],
  );

  const erØnskeVentende = useCallback(
    (personTreffId: string, arbeidsgiverTreffId: string) =>
      erVentende({ personTreffId, arbeidsgiverTreffId, interessert: false }),
    [erVentende],
  );

  return {
    effektivMøtedag,
    erØnskeVentende,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreØnske,
    ventTilLagringerErFerdige,
  };
};
