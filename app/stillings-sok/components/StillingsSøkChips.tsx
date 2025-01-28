import { Chips } from '@navikt/ds-react';
import * as React from 'react';
import { useGeografi } from '../../api/stilling/geografi/useGeografi';
import FilterChip from '../../components/FilterChip';
import { storForbokstavString } from '../../kandidat-sok/util';
import { useStillingsSøkFilter } from '../StillingsSøkContext';
import {
  hierarkiAvTagsForFilter,
  Hovedtag,
  Subtag,
  visningsnavnForFilter,
} from './StillingsSøkFilter/InkluderingFilter';

const StillingsSøkChips: React.FC = () => {
  const filter = useStillingsSøkFilter();

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
    <div className='mt-4 relative w-full'>
      <Chips>
        <div className='flex flex-row gap-2 flex-wrap overflow-x-auto pb-2'>
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
