'use client';

import { oppdaterØnske } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import {
  MøtedagDTO,
  ØnskeDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { useCallback, useMemo, useRef, useState } from 'react';

type Ønskeendring = ØnskeDTO & { ønsket: boolean };

type Props = {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  onMøtedagOppdatert: (møtedag: MøtedagDTO) => void | Promise<void>;
};

const ønskeNøkkel = ({ personTreffId, arbeidsgiverTreffId }: ØnskeDTO) =>
  `${personTreffId}:${arbeidsgiverTreffId}`;

const erSammeØnskeendring = (
  venstre: Ønskeendring | undefined,
  høyre: Ønskeendring,
) =>
  venstre?.personTreffId === høyre.personTreffId &&
  venstre.arbeidsgiverTreffId === høyre.arbeidsgiverTreffId &&
  venstre.ønsket === høyre.ønsket;

const utenNøkkel = <T>(verdier: Record<string, T>, nøkkel: string) => {
  const neste = { ...verdier };
  delete neste[nøkkel];
  return neste;
};

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
  const [optimistiskeØnsker, setOptimistiskeØnsker] = useState<
    Record<string, Ønskeendring>
  >({});
  const [ventendePerØnske, setVentendePerØnske] = useState<
    Record<string, number>
  >({});
  const [feilPerØnske, setFeilPerØnske] = useState<Record<string, string>>({});
  const [kunngjøring, setKunngjøring] = useState('');
  const lagringskø = useRef(Promise.resolve());
  const feilsekvens = useRef(0);

  const effektivMøtedag = useMemo(
    () => medOptimistiskeØnsker(møtedag, optimistiskeØnsker),
    [møtedag, optimistiskeØnsker],
  );

  const lagreØnske = useCallback(
    (personTreffId: string, arbeidsgiverTreffId: string, ønsket: boolean) => {
      const ønskeendring = {
        personTreffId,
        arbeidsgiverTreffId,
        ønsket,
      };
      const nøkkel = ønskeNøkkel(ønskeendring);

      setOptimistiskeØnsker((forrige) => ({
        ...forrige,
        [nøkkel]: ønskeendring,
      }));
      setVentendePerØnske((forrige) => ({
        ...forrige,
        [nøkkel]: (forrige[nøkkel] ?? 0) + 1,
      }));
      setFeilPerØnske((forrige) => utenNøkkel(forrige, nøkkel));
      setKunngjøring('Lagrer ønske.');

      const utførLagring = async () => {
        setFeilPerØnske((forrige) => utenNøkkel(forrige, nøkkel));

        try {
          const oppdatertMøtedag = await oppdaterØnske(
            rekrutteringstreffId,
            { personTreffId, arbeidsgiverTreffId },
            ønsket,
          );
          await onMøtedagOppdatert(oppdatertMøtedag);
          setOptimistiskeØnsker((forrige) =>
            erSammeØnskeendring(forrige[nøkkel], ønskeendring)
              ? utenNøkkel(forrige, nøkkel)
              : forrige,
          );
          setKunngjøring('Ønsket er lagret.');
        } catch {
          feilsekvens.current += 1;
          setOptimistiskeØnsker((forrige) =>
            erSammeØnskeendring(forrige[nøkkel], ønskeendring)
              ? utenNøkkel(forrige, nøkkel)
              : forrige,
          );
          setFeilPerØnske((forrige) => ({
            ...forrige,
            [nøkkel]: 'Kunne ikke lagre ønsket. Prøv igjen.',
          }));
          setKunngjøring('Kunne ikke lagre ønsket.');
        } finally {
          setVentendePerØnske((forrige) => {
            const antallSomGjenstår = (forrige[nøkkel] ?? 1) - 1;
            return antallSomGjenstår > 0
              ? { ...forrige, [nøkkel]: antallSomGjenstår }
              : utenNøkkel(forrige, nøkkel);
          });
        }
      };

      lagringskø.current = lagringskø.current.then(utførLagring);
    },
    [onMøtedagOppdatert, rekrutteringstreffId],
  );

  const ventTilLagringerErFerdige = useCallback(async () => {
    const feilsekvensFørFlush = feilsekvens.current;
    await lagringskø.current;
    return feilsekvens.current === feilsekvensFørFlush;
  }, []);

  const erØnskeVentende = useCallback(
    (personTreffId: string, arbeidsgiverTreffId: string) =>
      (ventendePerØnske[ønskeNøkkel({ personTreffId, arbeidsgiverTreffId })] ??
        0) > 0,
    [ventendePerØnske],
  );

  return {
    effektivMøtedag,
    erØnskeVentende,
    harLagringsfeil: Object.keys(feilPerØnske).length > 0,
    harVentendeLagring: Object.keys(ventendePerØnske).length > 0,
    kunngjøring,
    lagreØnske,
    ventTilLagringerErFerdige,
  };
};
