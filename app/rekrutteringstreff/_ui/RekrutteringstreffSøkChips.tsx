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

  const filtreItems: FilterItem[] = [];

  if (fylker.length > 0) {
    filtreItems.push({
      type: [...fylker],
      setVerdi: (ny) => setFylker(ny),
      mapVerdiNavn: (v) => storForbokstavString(geografiNavn(v)),
    });
  }

  if (kommuner.length > 0) {
    filtreItems.push({
      type: [...kommuner],
      setVerdi: (ny) => setKommuner(ny),
      mapVerdiNavn: (verdi) => storForbokstavString(geografiNavn(verdi)),
    });
  }

  return (
    <div className='mt-2'>
      <ValgteFiltre
        filtre={filtreItems}
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
