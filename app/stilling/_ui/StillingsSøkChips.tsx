import {
  hierarkiAvTagsForFilter,
  Hovedtag,
  Subtag,
  visningsnavnForFilter,
} from './StillingsSøkFilter/InkluderingFilter';
import LagreStandardsøk from './standardsøk/LagreStandardsøk';
import {
  GeografiType,
  usePamGeografi,
} from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { storForbokstavString } from '@/app/kandidat/util';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import FilterChip from '@/components/filter/FilterChip';
import TømFiltre from '@/components/filter/TømFiltre';
import { Chips } from '@navikt/ds-react';
import { FC } from 'react';

const StillingsSøkChips: FC<{ skjulLagreStandard: boolean }> = ({
  skjulLagreStandard,
}) => {
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
    <div className='relative w-full mt-3'>
      <Chips size='small'>
        <div className='flex flex-row flex-wrap gap-2  pb-2'>
          {Object.values(filter).some(
            (value) => Array.isArray(value) && value.length > 0,
          ) && <TømFiltre fjernFritekst={() => filter.setFritekstListe([])} />}
          {filter.fritekst && (
            <FilterChip
              type={filter.fritekst}
              setVerdi={filter.setFritekstListe}
            />
          )}
          {filter.statuser.map((statustekst, i) => (
            <Chips.Removable
              key={i}
              onClick={() =>
                filter.setStatuser(
                  filter.statuser.filter((i) => i !== statustekst),
                )
              }
            >
              {storForbokstavString(statustekst)}
            </Chips.Removable>
          ))}
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
          {filter.publisert.map((publisert, i) => (
            <Chips.Removable
              key={i}
              onClick={() =>
                filter.setPublisert(
                  filter.publisert.filter((i) => i !== publisert),
                )
              }
            >
              {storForbokstavString(publisert)}
            </Chips.Removable>
          ))}
          {filter.kategori.map((kategori, i) => (
            <Chips.Removable
              key={i}
              onClick={() =>
                filter.setKategori(
                  filter.kategori.filter((i) => i !== kategori),
                )
              }
            >
              {storForbokstavString(kategori)}
            </Chips.Removable>
          ))}
          {filter.fylker.map((fylke, i) => (
            <Chips.Removable
              key={i}
              onClick={() => {
                filter.setFylker(filter.fylker.filter((i) => i !== fylke));
              }}
            >
              {storForbokstavString(geografiNavn(fylke))}
            </Chips.Removable>
          ))}
          {filter.kommuner.map((kommune, i) => (
            <Chips.Removable
              key={i}
              onClick={() =>
                filter.setKommuner(filter.kommuner.filter((i) => i !== kommune))
              }
            >
              {storForbokstavString(geografiNavn(kommune))}
            </Chips.Removable>
          ))}
          {!skjulLagreStandard && <LagreStandardsøk />}
        </div>
      </Chips>
    </div>
  );
};

export default StillingsSøkChips;
