'use client';

import { useJobbsøkerSøkContext } from './JobbsøkerSøkContext';
import { statusLabelMap } from './StatusFilter';
import { aldersgruppeLabelMap } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/filter/AldersgruppeFilter';
import { kontorLabelMap } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/filter/KontorFilter';
import ValgteFiltre, { FilterItem } from '@/components/filter/ValgteFiltre';

export default function JobbsøkerSøkChips() {
  const søkState = useJobbsøkerSøkContext();

  const filtre: FilterItem[] = [
    {
      type: søkState.status,
      setVerdi: søkState.setStatus,
      mapVerdiNavn: statusLabelMap,
    },
    {
      type: søkState.aldersgruppe,
      setVerdi: søkState.setAldersgruppe,
      mapVerdiNavn: aldersgruppeLabelMap,
    },
    {
      type: søkState.kontornummer,
      setVerdi: søkState.setKontornummer,
      mapVerdiNavn: kontorLabelMap,
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
