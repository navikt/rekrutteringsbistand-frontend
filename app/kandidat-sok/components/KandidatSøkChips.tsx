import * as React from 'react';
import { useGeografi } from '../../api/stilling/geografi/useGeografi';
import FilterChip from '../../components/FilterChip';
import { useKandidatSøkFilter } from '../KandidaSokContext';
import { Innsatsgruppe } from './innsatsgrupper';
import { HovedMålType } from './kandidat-sok-sidebar/components/Hovedmål';

const StillingsSøkChips: React.FC = () => {
  const filter = useKandidatSøkFilter();
  const { data } = useGeografi();

  function geografiNavn(code: string): string {
    if (code.length === 2) {
      const region = data?.fylker.find((r) => r.code === code);
      return region ? region.capitalizedName : '';
    } else {
      const region = data?.kommuner.find((r) => r.code === code);
      return region ? region.capitalizedName : '';
    }
  }

  return (
    <div className='flex gap-2 flex-wrap'>
      <FilterChip type={filter.fritekst} setVerdi={filter.setFritekst} />
      <FilterChip type={filter.ønsketYrke} setVerdi={filter.setØnsketYrke} />
      <FilterChip type={filter.ønsketSted} setVerdi={filter.setØnsketSted} />
      <FilterChip
        type={filter.innsatsgruppe}
        setVerdi={filter.setInnsatsgruppe}
        mapVerdiNavn={(navn: string) =>
          Object.keys(Innsatsgruppe).find(
            (key) => Innsatsgruppe[key as keyof typeof Innsatsgruppe] === navn,
          ) || navn
        }
      />
      <FilterChip
        type={filter.hovedmål}
        setVerdi={filter.setHovedmål}
        mapVerdiNavn={(navn: string) =>
          Object.keys(HovedMålType).find(
            (key) => HovedMålType[key as keyof typeof HovedMålType] === navn,
          ) || navn
        }
      />

      <FilterChip type={filter.kompetanse} setVerdi={filter.setKompetanse} />
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
  );
};

export default StillingsSøkChips;
