'use client';
import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatsøk } from '../api/kandidat-sok/useKandidatsøk';
import SWRLaster from '../components/SWRLaster';

import { KandidatDataSchemaDTO } from '../api/kandidat-sok/schema/cvSchema.zod';
import { useKandidatNavigering } from '../components/KandidatNavigeringContext';
import KandidatKort from './components/KandidatKort';
import LagreIKandidatliste from './components/LagreIKandidatliste';
import {
  KandidatSøkPortefølje,
  useKandidatSøkFilter,
} from './KandidaSokContext';

interface KandidatSøkResultatProps {
  type: KandidatSøkPortefølje;
  stillingsId?: string;
}

// TODO Legg til paginering

const KandidatSøkResultat: React.FC<KandidatSøkResultatProps> = ({ type, stillingsId }) => {
  const filter = useKandidatSøkFilter();
  const kandidatsøkHook = useKandidatsøk(type, filter);
  const { setNavigering } = useKandidatNavigering();

  React.useEffect(() => {
    setNavigering(kandidatsøkHook.data?.navigering.kandidatnumre ?? []);
  }, [kandidatsøkHook.data?.navigering, setNavigering]);

  return (
    <SWRLaster hooks={[kandidatsøkHook]}>
      {(kandidatData) => {
        return (
          <>
            <div className='flex justify-between items-center my-4'>
              <Heading size='medium'>
                Viser {kandidatData.antallTotalt} treff
              </Heading>
              <div>
                <LagreIKandidatliste stillingsId={stillingsId}/>
              </div>
            </div>
            {kandidatData.kandidater?.map((kandidat, index) => (
              <KandidatKort
                key={kandidat.arenaKandidatnr || index}
                kandidat={kandidat as KandidatDataSchemaDTO}
              />
            ))}
          </>
        );
      }}
    </SWRLaster>
  );
};

export default KandidatSøkResultat;
