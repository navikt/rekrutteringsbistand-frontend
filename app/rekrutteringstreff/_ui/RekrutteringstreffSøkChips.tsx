'use client';

import {
  GeografiType,
  usePamGeografi,
} from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { storForbokstavString } from '@/app/kandidat/util';
import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import ValgteFiltre, { FilterItem } from '@/components/filter/ValgteFiltre';

export default function RekrutteringstreffSøkChips() {
  const { fylker, setFylker, kommuner, setKommuner } =
    useRekrutteringstreffSøkFilter();
  const geografi = usePamGeografi();

  function geografiNavn(kode: string): string {
    if (kode.length === 2) {
      const region = geografi.data
        ?.filter((geografi) => geografi.type === GeografiType.FYLKE)
        .find((region) => region.lokasjon.fylkesnummer === kode);
      return region ? region.navn : '';
    }
    const region = geografi.data
      ?.filter((geografi) => geografi.type === GeografiType.KOMMUNE)
      .find((region) => region.lokasjon.kommunenummer === kode);
    return region ? region.navn : '';
  }

  const filtre: FilterItem[] = [];

  if (fylker.length > 0) {
    filtre.push({
      type: [...fylker],
      setVerdi: (gjenværendeFylker) => setFylker(gjenværendeFylker),
      mapVerdiNavn: (fylke) => storForbokstavString(geografiNavn(fylke)),
    });
  }

  if (kommuner.length > 0) {
    filtre.push({
      type: [...kommuner],
      setVerdi: (gjenværendeKommuner) => setKommuner(gjenværendeKommuner),
      mapVerdiNavn: (kommune) => storForbokstavString(geografiNavn(kommune)),
    });
  }

  return (
    <div className='mt-2'>
      <ValgteFiltre
        filtre={filtre}
        tømFiltreProps={{
          fjernFritekst: () => {
            setFylker([]);
            setKommuner([]);
          },
        }}
      />{' '}
    </div>
  );
}
