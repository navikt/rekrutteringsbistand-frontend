'use client';
import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import SWRLaster from '../../components/SWRLaster';
import { useKandidatsøk } from '../api/kandidat-sok/useKandidatsøk';
import { useApplikasjonContext } from '../ApplikasjonContext';

import { KandidatDataSchemaDTO } from '../api/kandidat-sok/schema/cvSchema.zod';
import KandidatKort from './components/KandidatKort';
import { KandidatSøkPortefølje } from './components/PorteføljeTabs';
import { useKandidatSøkFilter } from './KandidaSokContext';

interface KandidatSøkResultatProps {
  type: KandidatSøkPortefølje;
}

const KandidatSøkResultat: React.FC<KandidatSøkResultatProps> = ({ type }) => {
  const filter = useKandidatSøkFilter();
  const {
    brukerData: { ident },
  } = useApplikasjonContext();
  const hook = useKandidatsøk(type, filter);

  return (
    <SWRLaster hook={hook}>
      {(kandidatData) => {
        // const markerteKandidater = kandidatData.kandidater.mark
        return (
          <>
            <div className='flex justify-between'>
              {/* <StillingsSøkChips /> */}
              <div>Lagre TBD</div>
            </div>
            <div className='flex justify-between items-center my-4'>
              <Heading size='medium'>
                Viser {kandidatData.antallTotalt} treff
              </Heading>
            </div>
            {kandidatData.kandidater?.map((kandidat, index) => (
              <KandidatKort
                markert={false}
                erIListen={false}
                key={kandidat.arenaKandidatnr || index}
                kandidat={kandidat as KandidatDataSchemaDTO}
              />
            ))}
            {/* <StillingsSøkPaginering
          totaltAntallTreff={data.hits.total.value ?? 0}
        /> */}
          </>
        );
      }}
    </SWRLaster>
  );
};

export default KandidatSøkResultat;
