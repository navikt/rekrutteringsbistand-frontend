'use client';

import { jobbsøkerensStillingsfilter } from './jobbsøkerensStillingsfilter';
import { useKandidatStillingssøk } from '@/app/api/kandidat-sok/useKandidatStillingssøk';
import { StillingsSøkProvider } from '@/app/stilling/StillingsSøkContext';
import Sidelaster from '@/components/layout/Sidelaster';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { type ReactNode, useEffect, useMemo } from 'react';

interface Props {
  kandidatNr: string;
  children: ReactNode;
}

/**
 * Stillingssøket for en jobbsøker starter med jobbønskene og stedet til jobbsøkeren. Veilederens standardsøk brukes
 * ikke her, men veilederen kan velge et lagret søk i menyen og gå tilbake til jobbønskene. Kan ikke jobbønskene
 * hentes, viser siden vanlig søk.
 */
export default function JobbsøkerensStillingsSøkProvider({
  kandidatNr,
  children,
}: Props) {
  const { track } = useUmami();
  const { data, isLoading } = useKandidatStillingssøk(kandidatNr);

  const forhåndsutfyltSøk = useMemo(
    () =>
      data
        ? {
            navn: 'Fra jobbsøkeren',
            merknad: 'Jobbønsker og sted',
            ...jobbsøkerensStillingsfilter(data),
          }
        : null,
    [data],
  );

  const antallYrkesønsker = data?.yrkeJobbonskerObj[0]?.sokeTitler?.length ?? 0;
  useEffect(() => {
    if (antallYrkesønsker > 0) {
      track(UmamiEvent.Stilling.antall_yrkesjobbønsker_fra_kandidat, {
        antall: antallYrkesønsker,
      });
    }
  }, [antallYrkesønsker, track]);

  // Søket starter med det forhåndsutfylte søket når det monteres, så det må vente på jobbønskene.
  if (isLoading) return <Sidelaster />;

  return (
    <StillingsSøkProvider
      brukerLagredeSøk
      minnenøkkel={`stilling:kandidat:${kandidatNr}`}
      forhåndsutfyltSøk={forhåndsutfyltSøk}
    >
      {children}
    </StillingsSøkProvider>
  );
}
