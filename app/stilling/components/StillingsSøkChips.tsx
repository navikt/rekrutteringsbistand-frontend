import {
  GeografiType,
  usePamGeografi,
} from '../../api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import FilterChip from '../../components/FilterChip';
import TømFiltre from '../../components/TømFiltre';
import { storForbokstavString } from '../../kandidat/util';
import { useStillingsSøkFilter } from '../StillingsSøkContext';
import {
  hierarkiAvTagsForFilter,
  Hovedtag,
  Subtag,
  visningsnavnForFilter,
} from './StillingsSøkFilter/InkluderingFilter';
import { Chips } from '@navikt/ds-react';
import * as React from 'react';

const StillingsSøkChips: React.FC = () => {
  const filter = useStillingsSøkFilter();

  const geografi = usePamGeografi();

  function geografiNavn(code: string): string {
    if (code.length === 2) {
      const region = geografi.data
        ?.filter((g) => g.type === GeografiType.FYLKE)
        .find((r) => r.lokasjon.fylkesnummer === code);
      return region ? region.navn : '';
    } else {
      const region = geografi.data
        ?.filter((g) => g.type === GeografiType.KOMMUNE)
        .find((r) => r.lokasjon.kommunenummer === code);
      return region ? region.navn : '';
    }
  }

  return (
    <div className='relative mt-4 w-full'>
      <Chips>
        <div className='flex flex-row flex-wrap gap-2  pb-2'>
          {Object.values(filter).some(
            (value) => Array.isArray(value) && value.length > 0,
          ) && <TømFiltre />}
          <FilterChip type={filter.fritekst} setVerdi={filter.setFritekst} />
          <FilterChip type={filter.statuser} setVerdi={filter.setStatuser} />

          {filter.inkludering.map((hovedInkludering, i) => {
            const tagger = hierarkiAvTagsForFilter.find(
              (gruppe) => gruppe.hovedtag === hovedInkludering,
            );

            const aktiveSubtags = filter.inkluderingUnderkategori.filter((i) =>
              tagger?.subtags.includes(i as Subtag),
            );
            if (aktiveSubtags.length > 0) {
              return aktiveSubtags.map((subtag, i) => (
                <Chips.Removable
                  key={i}
                  variant='neutral'
                  onClick={() =>
                    filter.setInkluderingUnderkategori(
                      filter.inkludering.filter((i) => i !== hovedInkludering),
                    )
                  }
                >
                  {visningsnavnForFilter[subtag as Subtag]}
                </Chips.Removable>
              ));
            } else {
              return (
                <Chips.Removable
                  key={i}
                  variant='neutral'
                  onClick={() =>
                    filter.setInkludering(
                      filter.inkludering.filter((i) => i !== hovedInkludering),
                    )
                  }
                >
                  {visningsnavnForFilter[hovedInkludering as Hovedtag]}
                </Chips.Removable>
              );
            }
          })}

          <FilterChip type={filter.kategori} setVerdi={filter.setKategori} />

          <FilterChip type={filter.publisert} setVerdi={filter.setPublisert} />

          {filter.fylker.map((fylke, i) => (
            <Chips.Removable
              key={i}
              variant='neutral'
              onClick={() => {
                // setKommuner(
                //   kommuner.filter((kommune) => kommune.slice(0, 2) !== fylke),
                // );
                filter.setFylker(filter.fylker.filter((i) => i !== fylke));
              }}
            >
              {storForbokstavString(geografiNavn(fylke))}
            </Chips.Removable>
          ))}
          {filter.kommuner.map((kommune, i) => (
            <Chips.Removable
              key={i}
              variant='neutral'
              onClick={() =>
                filter.setKommuner(filter.kommuner.filter((i) => i !== kommune))
              }
            >
              {storForbokstavString(geografiNavn(kommune))}
            </Chips.Removable>
          ))}
        </div>
      </Chips>
    </div>
  );
};

export default StillingsSøkChips;
