'use client';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatsøk } from '../api/kandidat-sok/useKandidatsøk';
import { useApplikasjonContext } from '../ApplikasjonContext';
import SWRLaster from '../components/SWRLaster';

import { KandidatDataSchemaDTO } from '../api/kandidat-sok/schema/cvSchema.zod';
import KandidatKort from './components/KandidatKort';
import {
  KandidatSøkPortefølje,
  useKandidatSøkFilter,
} from './KandidaSokContext';

interface KandidatSøkResultatProps {
  type: KandidatSøkPortefølje;
}

const KandidatSøkResultat: React.FC<KandidatSøkResultatProps> = ({ type }) => {
  const filter = useKandidatSøkFilter();
  const {
    brukerData: { ident },
  } = useApplikasjonContext();
  const kandidatsøkHook = useKandidatsøk(type, filter);

  return (
    <SWRLaster hooks={[kandidatsøkHook]}>
      {(kandidatData) => {
        // const markerteKandidater = kandidatData.kandidater.mark
        return (
          <>
            <div className='flex justify-between items-center my-4'>
              <Heading size='medium'>
                Viser {kandidatData.antallTotalt} treff
              </Heading>
              <div>
                <Button
                  size='small'
                  variant='primary'
                  icon={<PersonPlusIcon aria-hidden />}
                  disabled
                  // disabled={markerteKandidater.size === 0}
                  // onClick={onLagreIKandidatlisteClick}
                >
                  Lagre i kandidatliste
                </Button>
              </div>
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
