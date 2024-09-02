import { Chips, VStack } from '@navikt/ds-react';
import * as React from 'react';
import { useStillingsSøk } from '../StillingsSøkContext';

const StillingsSøkChips: React.FC = () => {
  const {
    statuser,
    fylker,
    kommuner,
    portefølje,
    inkludering,
    inkluderingUnderkategori,
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

  console.log('🎺 filtre', filtre);

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
            <Chips.Removable key={i} variant='neutral' onClick={() => {}}>
              {status}
            </Chips.Removable>
          ))}
        </Chips>
      </VStack>
    </div>
  );
};

export default StillingsSøkChips;
