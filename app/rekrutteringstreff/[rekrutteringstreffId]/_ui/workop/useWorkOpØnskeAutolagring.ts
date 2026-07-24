'use client';

import { oppdaterØnske } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import {
  MøtedagDTO,
  ØnskeDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { useSekvensiellAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/useSekvensiellAutolagring';
import { useCallback, useMemo } from 'react';

type Ønskeendring = ØnskeDTO & { ønsket: boolean };

type Props = {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  onMøtedagOppdatert: (møtedag: MøtedagDTO) => void | Promise<void>;
};

const ønskeNøkkel = ({ personTreffId, arbeidsgiverTreffId }: ØnskeDTO) =>
  `${personTreffId}:${arbeidsgiverTreffId}`;

const medOptimistiskeØnsker = (
  møtedag: MøtedagDTO,
  optimistiskeØnsker: Record<string, Ønskeendring>,
): MøtedagDTO => {
  let ønsker = [...møtedag.ønsker];

  for (const ønske of Object.values(optimistiskeØnsker)) {
    ønsker = ønsker.filter(
      (lagretØnske) => ønskeNøkkel(lagretØnske) !== ønskeNøkkel(ønske),
    );
    if (ønske.ønsket) {
      ønsker.push({
        personTreffId: ønske.personTreffId,
        arbeidsgiverTreffId: ønske.arbeidsgiverTreffId,
      });
    }
  }

  return { ...møtedag, ønsker };
};

export const useWorkOpØnskeAutolagring = ({
  rekrutteringstreffId,
  møtedag,
  onMøtedagOppdatert,
}: Props) => {
  const utførLagring = useCallback(
    async (ønske: Ønskeendring) => {
      const oppdatertMøtedag = await oppdaterØnske(
        rekrutteringstreffId,
        {
          personTreffId: ønske.personTreffId,
          arbeidsgiverTreffId: ønske.arbeidsgiverTreffId,
        },
        ønske.ønsket,
      );
      await onMøtedagOppdatert(oppdatertMøtedag);
    },
    [onMøtedagOppdatert, rekrutteringstreffId],
  );
  const {
    erVentende,
    harLagringsfeil,
    harVentendeLagring,
    kunngjøring,
    lagre,
    optimistiskeVerdier,
    ventTilLagringerErFerdige,
  } = useSekvensiellAutolagring({
    nøkkelFor: ønskeNøkkel,
    utførLagring,
  });

  const effektivMøtedag = useMemo(
    () => medOptimistiskeØnsker(møtedag, optimistiskeVerdier),
    [møtedag, optimistiskeVerdier],
  );

  const lagreØnske = useCallback(
    (personTreffId: string, arbeidsgiverTreffId: string, ønsket: boolean) => {
      lagre(
        { personTreffId, arbeidsgiverTreffId, ønsket },
        {
          lagrer: 'Lagrer ønske.',
          lagret: 'Ønsket er lagret.',
          feil: 'Kunne ikke lagre ønsket. Prøv igjen.',
        },
      );
    },
    [lagre],
  );

  const erØnskeVentende = useCallback(
    (personTreffId: string, arbeidsgiverTreffId: string) =>
      erVentende({ personTreffId, arbeidsgiverTreffId, ønsket: false }),
    [erVentende],
  );

  return {
    effektivMøtedag,
    erØnskeVentende,
    harLagringsfeil,
    harVentendeLagring,
    kunngjøring,
    lagreØnske,
    ventTilLagringerErFerdige,
  };
};
