'use client';

import { useJobbsøkerFilterContext } from './filter/JobbsøkerFilterContext';
import { statusLabelMap } from './filter/StatusFilter';
import { storForbokstavString } from '@/app/kandidat/util';
import ValgteFiltre, { FilterItem } from '@/components/filter/ValgteFiltre';

export default function JobbsøkerSøkChips() {
  const filter = useJobbsøkerFilterContext();

  const filtre: FilterItem[] = [
    {
      type: filter.status,
      setVerdi: filter.setStatus,
      mapVerdiNavn: statusLabelMap,
    },
    {
      type: filter.innsatsgruppe,
      setVerdi: filter.setInnsatsgruppe,
      mapVerdiNavn: (v: string) => storForbokstavString(v).replace(/_/g, ' '),
    },
    {
      type: filter.navkontor ? [filter.navkontor] : [],
      setVerdi: () => filter.setNavkontor(''),
    },
  ];

  if (filter.fritekst) {
    filtre.unshift({
      type: [filter.fritekst],
      setVerdi: () => filter.setFritekst(''),
    });
  }

  return (
    <div className='w-full'>
      <ValgteFiltre
        filtre={filtre}
        tømFiltreProps={
          filter.harAktiveFiltre
            ? {
                fjernFritekst: () => filter.tømAlleFiltre(),
              }
            : undefined
        }
      />
    </div>
  );
}
