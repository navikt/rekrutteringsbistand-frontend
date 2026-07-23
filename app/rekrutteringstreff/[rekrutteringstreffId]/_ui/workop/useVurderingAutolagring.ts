'use client';

import { oppdaterVurdering } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import {
  MøtedagDTO,
  VurderingDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { useCallback, useMemo, useRef, useState } from 'react';

type Props = {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  onMøtedagOppdatert: (møtedag: MøtedagDTO) => void | Promise<void>;
};

const vurderingNøkkel = ({
  personTreffId,
  arbeidsgiverTreffId,
}: Pick<VurderingDTO, 'personTreffId' | 'arbeidsgiverTreffId'>) =>
  `${personTreffId}:${arbeidsgiverTreffId}`;

const erTomVurdering = (vurdering: VurderingDTO) =>
  vurdering.vurdering === null &&
  !vurdering.andreIntervju &&
  !vurdering.jobbtilbud;

const erSammeVurdering = (
  venstre: VurderingDTO | undefined,
  høyre: VurderingDTO,
) =>
  venstre?.personTreffId === høyre.personTreffId &&
  venstre.arbeidsgiverTreffId === høyre.arbeidsgiverTreffId &&
  venstre.vurdering === høyre.vurdering &&
  venstre.andreIntervju === høyre.andreIntervju &&
  venstre.jobbtilbud === høyre.jobbtilbud;

const utenNøkkel = <T>(verdier: Record<string, T>, nøkkel: string) => {
  const neste = { ...verdier };
  delete neste[nøkkel];
  return neste;
};

const medOptimistiskeVurderinger = (
  møtedag: MøtedagDTO,
  optimistiskeVurderinger: Record<string, VurderingDTO>,
): MøtedagDTO => {
  const vurderinger = [...møtedag.vurderinger];

  for (const vurdering of Object.values(optimistiskeVurderinger)) {
    const indeks = vurderinger.findIndex(
      (lagretVurdering) =>
        vurderingNøkkel(lagretVurdering) === vurderingNøkkel(vurdering),
    );

    if (erTomVurdering(vurdering)) {
      if (indeks >= 0) vurderinger.splice(indeks, 1);
    } else if (indeks >= 0) {
      vurderinger[indeks] = vurdering;
    } else {
      vurderinger.push(vurdering);
    }
  }

  return { ...møtedag, vurderinger };
};

export const useVurderingAutolagring = ({
  rekrutteringstreffId,
  møtedag,
  onMøtedagOppdatert,
}: Props) => {
  const [optimistiskeVurderinger, setOptimistiskeVurderinger] = useState<
    Record<string, VurderingDTO>
  >({});
  const [ventendePerVurdering, setVentendePerVurdering] = useState<
    Record<string, number>
  >({});
  const [feilPerVurdering, setFeilPerVurdering] = useState<
    Record<string, string>
  >({});
  const [kunngjøring, setKunngjøring] = useState('');
  const lagringskø = useRef(Promise.resolve());

  const effektivMøtedag = useMemo(
    () => medOptimistiskeVurderinger(møtedag, optimistiskeVurderinger),
    [møtedag, optimistiskeVurderinger],
  );

  const lagreVurdering = useCallback(
    (vurdering: VurderingDTO, jobbsøkernavn: string) => {
      const nøkkel = vurderingNøkkel(vurdering);

      setOptimistiskeVurderinger((forrige) => ({
        ...forrige,
        [nøkkel]: vurdering,
      }));
      setVentendePerVurdering((forrige) => ({
        ...forrige,
        [nøkkel]: (forrige[nøkkel] ?? 0) + 1,
      }));
      setFeilPerVurdering((forrige) => utenNøkkel(forrige, nøkkel));
      setKunngjøring(`Lagrer vurdering for ${jobbsøkernavn}.`);

      const utførLagring = async () => {
        setFeilPerVurdering((forrige) => utenNøkkel(forrige, nøkkel));

        try {
          const oppdatertMøtedag = await oppdaterVurdering(
            rekrutteringstreffId,
            vurdering,
          );
          await onMøtedagOppdatert(oppdatertMøtedag);
          setOptimistiskeVurderinger((forrige) =>
            erSammeVurdering(forrige[nøkkel], vurdering)
              ? utenNøkkel(forrige, nøkkel)
              : forrige,
          );
          setKunngjøring(`Vurderingen for ${jobbsøkernavn} er lagret.`);
        } catch {
          setOptimistiskeVurderinger((forrige) =>
            erSammeVurdering(forrige[nøkkel], vurdering)
              ? utenNøkkel(forrige, nøkkel)
              : forrige,
          );
          setFeilPerVurdering((forrige) => ({
            ...forrige,
            [nøkkel]: 'Kunne ikke lagre vurderingen. Prøv igjen.',
          }));
          setKunngjøring(`Kunne ikke lagre vurderingen for ${jobbsøkernavn}.`);
        } finally {
          setVentendePerVurdering((forrige) => {
            const antallSomGjenstår = (forrige[nøkkel] ?? 1) - 1;
            return antallSomGjenstår > 0
              ? { ...forrige, [nøkkel]: antallSomGjenstår }
              : utenNøkkel(forrige, nøkkel);
          });
        }
      };

      // Svarene inneholder hele møtedagen og må behandles i samme rekkefølge
      // som endringene, slik at et eldre svar ikke overskriver et nyere.
      lagringskø.current = lagringskø.current.then(utførLagring);
    },
    [onMøtedagOppdatert, rekrutteringstreffId],
  );

  const erVurderingVentende = useCallback(
    (vurdering: VurderingDTO) =>
      (ventendePerVurdering[vurderingNøkkel(vurdering)] ?? 0) > 0,
    [ventendePerVurdering],
  );

  const feilForVurdering = useCallback(
    (vurdering: VurderingDTO) =>
      feilPerVurdering[vurderingNøkkel(vurdering)] ?? null,
    [feilPerVurdering],
  );

  return {
    effektivMøtedag,
    erVurderingVentende,
    feilForVurdering,
    harVentendeLagring: Object.keys(ventendePerVurdering).length > 0,
    kunngjøring,
    lagreVurdering,
  };
};
