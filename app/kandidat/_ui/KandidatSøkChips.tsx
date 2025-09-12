import { useKandidatSøkFilterContext } from '@/app/kandidat/KandidaSokFilterContext';
import { HovedMålType } from '@/app/kandidat/kandidat-søk-filter/_ui/Hovedmål';
import FilterChip from '@/components/felles/filter/FilterChip';
import TømFiltre from '@/components/felles/filter/TømFiltre';
import { Chips } from '@navikt/ds-react';

export default function KandidatSøkChips() {
  const filter = useKandidatSøkFilterContext();

  return (
    <div className='mt-4 w-full'>
      <Chips size='small'>
        <div className='flex flex-row flex-wrap items-center gap-2 pb-2'>
          {Object.values(filter).some(
            (value) => Array.isArray(value) && value.length > 0,
          ) && <TømFiltre fjernFritekst={() => filter.setFritekst('')} />}
          {filter.fritekst && (
            <Chips.Removable
              variant='neutral'
              onClick={() => {
                filter.setFritekst('');
              }}
            >
              {filter.fritekst}
            </Chips.Removable>
          )}

          <FilterChip
            type={filter.ønsketYrke}
            setVerdi={filter.setØnsketYrke}
          />
          <FilterChip
            type={filter.ønsketSted}
            setVerdi={filter.setØnsketSted}
          />
          <FilterChip
            type={filter.innsatsgruppe}
            setVerdi={filter.setInnsatsgruppe}
          />
          <FilterChip
            type={filter.hovedmål}
            setVerdi={filter.setHovedmål}
            mapVerdiNavn={(navn: string) =>
              Object.keys(HovedMålType).find(
                (key) =>
                  HovedMålType[key as keyof typeof HovedMålType] === navn,
              ) || navn
            }
          />

          <FilterChip
            type={filter.kompetanse}
            setVerdi={filter.setKompetanse}
          />
          <FilterChip type={filter.førerkort} setVerdi={filter.setFørerkort} />
          <FilterChip type={filter.språk} setVerdi={filter.setSpråk} />
          <FilterChip
            type={filter.arbeidserfaring}
            setVerdi={filter.setArbeidserfaring}
          />
          <FilterChip
            type={filter.utdanningsnivå}
            setVerdi={filter.setUtdanningsnivå}
          />
          <FilterChip
            type={filter.prioritertMålgruppe}
            setVerdi={filter.setPrioritertMålgruppe}
          />
        </div>
      </Chips>
    </div>
  );
}
