'use client';

import { KandidatDataSchemaDTO } from '../api/kandidat-sok/schema/cvSchema.zod';
import { useKandidatsøk } from '../api/kandidat-sok/useKandidatsøk';
import { useKandidatNavigering } from '../components/KandidatNavigeringContext';
import SWRLaster from '../components/SWRLaster';
import {
  KandidatSøkPortefølje,
  useKandidatSøkFilter,
} from './KandidaSokContext';
import KandidatKort from './components/KandidatKort';
import LagreIKandidatliste from './components/LagreIKandidatliste';
import { Heading } from '@navikt/ds-react';
import * as React from 'react';

interface KandidatSøkResultatProps {
  type: KandidatSøkPortefølje;
  stillingsId?: string;
}

// TODO Legg til paginering

const KandidatSøkResultat: React.FC<KandidatSøkResultatProps> = ({
  type,
  stillingsId,
}) => {
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
            <div className='my-4 flex items-center justify-between'>
              <Heading size='medium'>
                Viser {kandidatData.antallTotalt} treff
              </Heading>
              <div>
                <LagreIKandidatliste stillingsId={stillingsId} />
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
