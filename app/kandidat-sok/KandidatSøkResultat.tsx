'use client';
import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import SWRLaster from '../../components/SWRLaster';
import { useKandidatsøk } from '../api/kandidat-sok/useKandidatsøk';
import {
  maksAntallTreffPerSøk,
  regnUtFørsteTreffFra,
} from '../api/stillings-sok/stillingssøkElasticSearchQuery';
import { useApplikasjonContext } from '../ApplikasjonContext';

import KandidatKort from './components/KandidatKort';
import { KandidatSøkPortefølje } from './components/PorteføljeTabs';
import { useKandidatSøkFilter } from './KandidatsøkContext';

interface KandidatSøkResultatProps {
  type: KandidatSøkPortefølje;
}

const KandidatSøkResultat: React.FC<KandidatSøkResultatProps> = ({ type }) => {
  const filter = useKandidatSøkFilter();
  const {
    brukerData: { ident },
  } = useApplikasjonContext();
  const hook = useKandidatsøk(type, filter);

  const antallVisning = (fra: number, til: number, total: number) => {
    const treffFra = regnUtFørsteTreffFra(filter.side, maksAntallTreffPerSøk);
    const fraAntall = treffFra + 1;

    const tilAntall = treffFra + maksAntallTreffPerSøk;

    return (
      <Heading size='medium'>
        Viser {fraAntall}-{tilAntall < total ? tilAntall : total} av {total}{' '}
        treff
      </Heading>
    );
  };
  return (
    <SWRLaster hook={hook}>
      {(kandidatData) => (
        <>
          <div className='flex justify-between'>
            {/* <StillingsSøkChips /> */}
            <div>Lagre TBD</div>
          </div>
          <div className='flex justify-between items-center my-4'>
            {kandidatData.antallTotalt}
            {/* {antallVisning(
              data.hits.total.value ?? 1,
              data.hits.total.value ?? 1,
              data.hits.total.value,
            )} */}
            {/* <StillingsSøkSortering /> */}
          </div>
          {kandidatData.kandidater.map((kandidat, index) => (
            <KandidatKort
              markert={false}
              erIListen={false}
              key={kandidat.arenaKandidatnr || index}
              kandidat={kandidat}
            />
          ))}
          {/* <StillingsSøkPaginering
            totaltAntallTreff={data.hits.total.value ?? 0}
          /> */}
        </>
      )}
    </SWRLaster>
  );
};

export default KandidatSøkResultat;
