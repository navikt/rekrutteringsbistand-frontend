'use client';

import { KandidatDataSchemaDTO } from '../api/kandidat-sok/schema/cvSchema.zod';
import { useKandidatsøk } from '../api/kandidat-sok/useKandidatsøk';
import { useKandidatNavigering } from '../components/KandidatNavigeringContext';
import SWRLaster from '../components/SWRLaster';
import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from './KandidaSokFilterContext';
import { useKandidatSøkMarkerteContext } from './KandidatSøkMarkerteContext';
import KandidatKort from './components/KandidatKort';
import LagreIKandidatliste from './components/LagreIKandidatliste';
import { Checkbox, Heading, Pagination } from '@navikt/ds-react';
import * as React from 'react';

interface KandidatSøkResultatProps {
  type: KandidatSøkPortefølje;
  stillingsId?: string;
  alleredeLagtTil?: string[];
}

const KandidatSøkResultat: React.FC<KandidatSøkResultatProps> = ({
  type,
  stillingsId,
  alleredeLagtTil,
}) => {
  const filter = useKandidatSøkFilterContext();
  const kandidatsøkHook = useKandidatsøk(type, filter);
  const { setNavigering } = useKandidatNavigering();

  React.useEffect(() => {
    setNavigering(kandidatsøkHook.data?.navigering.kandidatnumre ?? []);
  }, [kandidatsøkHook.data?.navigering, setNavigering]);

  const { markerteKandidater, setMarkertListe, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  return (
    <SWRLaster hooks={[kandidatsøkHook]}>
      {(kandidatData) => {
        const antallSider = Math.ceil(kandidatData.antallTotalt / 25);
        // Elasticsearch takler ikke mer enn 10000 element i pagineringen uten å endre max result i es, som kan ha konsekvenser for minne og ytelse.
        // I tillegg så må vi trekke fra 10 elementer på grunn av next og previous blading i kandidater.
        const siderTilPaginering = antallSider > 390 ? 390 : antallSider;

        const markerAlle = () => {
          if (
            markerteKandidater &&
            markerteKandidater.length == kandidatData.kandidater.length
          ) {
            fjernMarkerteKandidater();
          } else if (kandidatData.kandidater) {
            const kandidatnumre = kandidatData.kandidater
              .map((kandidat) => kandidat.arenaKandidatnr)
              .filter(
                (nr): nr is string =>
                  nr !== null && nr !== undefined && nr !== '',
              );
            setMarkertListe(kandidatnumre);
          }
        };

        return (
          <>
            <Heading size='medium'>
              Viser {kandidatData.antallTotalt} treff
            </Heading>
            <div className='my-4 flex items-center justify-between'>
              <div>
                <Checkbox
                  checked={
                    markerteKandidater &&
                    markerteKandidater.length > 0 &&
                    markerteKandidater.length === kandidatData.kandidater.length
                  }
                  onClick={markerAlle}
                >
                  Marker alle på siden
                </Checkbox>
              </div>
              <div>
                <LagreIKandidatliste stillingsId={stillingsId} />
              </div>
            </div>
            {kandidatData.kandidater?.map((kandidat, index) => (
              <KandidatKort
                stillingsId={stillingsId}
                alleredeLagtTil={alleredeLagtTil}
                key={kandidat.arenaKandidatnr || index}
                kandidat={kandidat as KandidatDataSchemaDTO}
              />
            ))}
            {antallSider > 2 && (
              <Pagination
                className='mt-4 flex justify-center'
                size='medium'
                page={filter.side}
                onPageChange={filter.setSide}
                count={siderTilPaginering}
              />
            )}
          </>
        );
      }}
    </SWRLaster>
  );
};

export default KandidatSøkResultat;
