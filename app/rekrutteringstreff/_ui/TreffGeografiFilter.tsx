'use client';

import { usePamGeografi } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import FylkerOgKommuner from '@/app/stilling/_ui/StillingsSøkFilter/FylkerOgKommunerFilter';
import SWRLaster from '@/components/SWRLaster';

export default function TreffGeografiFilter() {
  const geografiHook = usePamGeografi();
  const { fylker, setFylker, kommuner, setKommuner, sokHook } =
    useRekrutteringstreffSøkFilter();

  const geografiaggregering = sokHook.data?.geografiaggregering;
  const fylkeBuckets = (geografiaggregering?.fylkesnummeraggregering ?? []).map(
    (fylkesnummeraggregering) => ({
      key: fylkesnummeraggregering.verdi,
      count: fylkesnummeraggregering.antall,
    }),
  );
  const kommuneBuckets = (
    geografiaggregering?.kommunenummeraggregering ?? []
  ).map((kommunenummeraggregering) => ({
    key: kommunenummeraggregering.verdi,
    count: kommunenummeraggregering.antall,
  }));

  return (
    <SWRLaster hooks={[geografiHook]}>
      {(geografi) => (
        <FylkerOgKommuner
          geografi={geografi}
          fylker={fylker}
          setFylker={setFylker}
          kommuner={kommuner}
          setKommuner={setKommuner}
          fylkeBuckets={fylkeBuckets}
          kommuneBuckets={kommuneBuckets}
          loading={sokHook.isLoading || sokHook.isValidating}
        />
      )}
    </SWRLaster>
  );
}
