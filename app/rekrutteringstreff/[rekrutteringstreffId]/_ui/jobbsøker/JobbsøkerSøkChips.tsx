'use client';

import { useJobbsøkerSøkContext } from './filter/JobbsøkerSøkContext';
import { statusLabelMap } from './filter/StatusFilter';
import ValgteFiltre, { FilterItem } from '@/components/filter/ValgteFiltre';

export default function JobbsøkerSøkChips() {
  const søkState = useJobbsøkerSøkContext();

  const filtre: FilterItem[] = [
    {
      type: søkState.status,
      setVerdi: søkState.setStatus,
      mapVerdiNavn: statusLabelMap,
    },
  ];

  if (søkState.fritekst) {
    filtre.unshift({
      type: [søkState.fritekst],
      setVerdi: () => søkState.setFritekst(''),
    });
  }

  return (
    <div className='mt-4 w-full'>
      <ValgteFiltre
        filtre={filtre}
        size='medium'
        tømFiltreProps={
          søkState.harAktiveFiltre
            ? {
                fjernFritekst: () => søkState.tømAlleFiltre(),
              }
            : undefined
        }
      />
    </div>
  );
}
