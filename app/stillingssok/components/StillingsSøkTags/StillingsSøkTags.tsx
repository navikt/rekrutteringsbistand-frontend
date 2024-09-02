import { Chips, VStack } from '@navikt/ds-react';
import * as React from 'react';
import { storForbokstavString } from '../../../kandidatsok/util';
import { useStillingsSøk } from '../../StillingsSøkContext';
import {
  hierarkiAvTagsForFilter,
  Hovedtag,
  Subtag,
  visningsnavnForFilter,
} from '../StillingsSøkFilter/InkluderingFilter';

const StillingsSøkTags: React.FC = () => {
  const {
    statuser,
    setStatuser,
    fylker,
    kommuner,
    portefølje,
    inkludering,
    setInkludering,
    inkluderingUnderkategori,
    setInkluderingUnderkategori,
    kategori,
    publisert,
  } = useStillingsSøk();

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

  return (
    <div className='mt-4'>
      <VStack gap='10'>
        <Chips>
          {harAktiveFilter && (
            <Chips.Removable onClick={() => {}}>
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
            if (aktiveSubtags) {
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
        </Chips>
      </VStack>
    </div>
  );
};

export default StillingsSøkTags;
