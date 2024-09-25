import { Chips, VStack } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useGeografi } from '../../api/stilling/geografi/useGeografi';
import { storForbokstavString } from '../../kandidat-sok/util';
import { useStillingsSøkFilter } from '../StillingsSøkContext';
import {
  hierarkiAvTagsForFilter,
  Hovedtag,
  Subtag,
  visningsnavnForFilter,
} from './StillingsSøkFilter/InkluderingFilter';

const StillingsSøkChips: React.FC = () => {
  const {
    statuser,
    setStatuser,
    fylker,
    setFylker,
    kommuner,
    setKommuner,
    inkludering,
    setInkludering,
    inkluderingUnderkategori,
    setInkluderingUnderkategori,
    kategori,
    setKategori,
    publisert,
    setPublisert,
  } = useStillingsSøkFilter();

  const filtre = {
    statuser,
    fylker,
    kommuner,
    inkludering,
    inkluderingUnderkategori,
    kategori,
    publisert,
  };

  const harAktiveFilter = Object.values(filtre).some(
    (array) => array.length > 0,
  );

  const router = useRouter();

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
    <div className='mt-4'>
      <VStack gap='10'>
        <Chips>
          {harAktiveFilter && (
            <Chips.Removable onClick={() => router.push('/stillings-sok')}>
              Tøm alle filtre
            </Chips.Removable>
          )}

          {statuser.map((status, i) => (
            <Chips.Removable
              key={i}
              variant='neutral'
              onClick={() => setStatuser(statuser.filter((i) => i !== status))}
            >
              {storForbokstavString(status)}
            </Chips.Removable>
          ))}

          {inkludering.map((hovedInkludering, i) => {
            const tagger = hierarkiAvTagsForFilter.find(
              (gruppe) => gruppe.hovedtag === hovedInkludering,
            );

            const aktiveSubtags = inkluderingUnderkategori.filter((i) =>
              tagger?.subtags.includes(i as Subtag),
            );
            if (aktiveSubtags.length > 0) {
              return aktiveSubtags.map((subtag, i) => (
                <Chips.Removable
                  key={i}
                  variant='neutral'
                  onClick={() =>
                    setInkluderingUnderkategori(
                      inkludering.filter((i) => i !== hovedInkludering),
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
                    setInkludering(
                      inkludering.filter((i) => i !== hovedInkludering),
                    )
                  }
                >
                  {visningsnavnForFilter[hovedInkludering as Hovedtag]}
                </Chips.Removable>
              );
            }
          })}

          {kategori.map((k, i) => (
            <Chips.Removable
              key={i}
              variant='neutral'
              onClick={() => setKategori(kategori.filter((i) => i !== k))}
            >
              {storForbokstavString(k)}
            </Chips.Removable>
          ))}

          {publisert.map((k, i) => (
            <Chips.Removable
              key={i}
              variant='neutral'
              onClick={() => setPublisert(publisert.filter((i) => i !== k))}
            >
              {storForbokstavString(k)}
            </Chips.Removable>
          ))}

          {fylker.map((fylke, i) => (
            <Chips.Removable
              key={i}
              variant='neutral'
              onClick={() => {
                // setKommuner(
                //   kommuner.filter((kommune) => kommune.slice(0, 2) !== fylke),
                // );
                setFylker(fylker.filter((i) => i !== fylke));
              }}
            >
              {storForbokstavString(geografiNavn(fylke))}
            </Chips.Removable>
          ))}
          {kommuner.map((kommune, i) => (
            <Chips.Removable
              key={i}
              variant='neutral'
              onClick={() => setKommuner(kommuner.filter((i) => i !== kommune))}
            >
              {storForbokstavString(geografiNavn(kommune))}
            </Chips.Removable>
          ))}
        </Chips>
      </VStack>
    </div>
  );
};

export default StillingsSøkChips;
