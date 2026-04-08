'use client';

import { useJobbsøkerSøkContext } from './filter/JobbsøkerSøkContext';
import { statusLabelMap } from './filter/StatusFilter';
import ValgteFiltre, { FilterItem } from '@/components/filter/ValgteFiltre';

export default function JobbsøkerSøkChips() {
  const filter = useJobbsøkerSøkContext();

  const filtre: FilterItem[] = [
    {
      type: filter.status,
      setVerdi: filter.setStatus,
      mapVerdiNavn: statusLabelMap,
    },
  ];

  if (filter.fritekst) {
    filtre.unshift({
      type: [filter.fritekst],
      setVerdi: () => filter.setFritekst(''),
    });
  }

  return (
    <div className='mt-4 w-full'>
      <ValgteFiltre
        filtre={filtre}
        size='medium'
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
