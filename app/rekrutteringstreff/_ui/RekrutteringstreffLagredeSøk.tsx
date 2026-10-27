'use client';

import { StandardsøkDomene } from '@/app/api/bruker/standardsok/standardsøkTyper';
import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import StandardsøkKnapper, {
  type StandardsøkHendelse,
} from '@/components/standardsøk/StandardsøkKnapper';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';

const umamiHendelser = {
  lagret_nytt: UmamiEvent.Rekrutteringstreff.lagret_søk_lagret_som_nytt,
  erstattet: UmamiEvent.Rekrutteringstreff.lagret_søk_erstattet,
  slettet: UmamiEvent.Rekrutteringstreff.lagret_søk_slettet,
  satt_som_standard: UmamiEvent.Rekrutteringstreff.lagret_søk_satt_som_standard,
  vanlig_søk_satt_som_standard:
    UmamiEvent.Rekrutteringstreff.vanlig_søk_satt_som_standard,
} satisfies Record<StandardsøkHendelse, unknown>;

export default function RekrutteringstreffLagredeSøk() {
  const {
    gjeldendeFilter,
    fritekst,
    aktivtStandardsøkId,
    setAktivtStandardsøkId,
    brukLagretSøk,
    nullstillFiltre,
  } = useRekrutteringstreffSøkFilter();
  const { track } = useUmami();

  return (
    <StandardsøkKnapper
      domene={StandardsøkDomene.REKRUTTERINGSTREFF}
      gjeldendeFilter={gjeldendeFilter}
      gjeldendeFritekst={fritekst}
      aktivtSøkId={aktivtStandardsøkId}
      onBrukVanligSøk={(kilde) => {
        nullstillFiltre();
        track(
          kilde === 'meny'
            ? UmamiEvent.Rekrutteringstreff.vanlig_søk_brukt_fra_menyen
            : UmamiEvent.Rekrutteringstreff.vanlig_søk_brukt_fra_administrasjon,
        );
      }}
      onBrukSøk={async (søk, kilde) => {
        if (await brukLagretSøk(søk)) {
          track(
            kilde === 'meny'
              ? UmamiEvent.Rekrutteringstreff.lagret_søk_brukt_fra_menyen
              : UmamiEvent.Rekrutteringstreff
                  .lagret_søk_brukt_fra_administrasjon,
          );
        }
      }}
      onLagret={(søk) => setAktivtStandardsøkId(søk.id)}
      onSlettet={(søk) => {
        if (søk.id === aktivtStandardsøkId) setAktivtStandardsøkId(null);
      }}
      onHendelse={(hendelse) => track(umamiHendelser[hendelse])}
    />
  );
}
