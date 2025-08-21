'use client';

import { KandidatDataSchemaDTO } from '../api/kandidat-sok/schema/cvSchema.zod';
import {
  KandidatsokKandidat,
  useKandidatsøk,
} from '../api/kandidat-sok/useKandidatsøk';
import RekrutteringstreffFeatureToggle from '../components/RekrutteringstreffFeatureToggle';
import SWRLaster from '../components/SWRLaster';
import { useKandidatNavigeringContext } from '../providers/KandidatNavigeringContext';
import LagreIRekrutteringstreffButton from '../rekrutteringstreff/[rekrutteringstreffId]/components/lagreIRekrutteringstreffButton/LagreIRekrutteringstreffButton';
import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from './KandidaSokFilterContext';
import { useKandidatSøkMarkerteContext } from './KandidatSøkMarkerteContext';
import KandidatKort from './components/KandidatKort';
import LagreIKandidatlisteButton from './components/lagreKandidatliste/LagreIKandidatlisteButton';
import { Checkbox, Pagination } from '@navikt/ds-react';
import * as React from 'react';

interface KandidatSøkResultatProps {
  type: KandidatSøkPortefølje;
  stillingsId?: string;
  rekrutteringstreffId?: string;
  alleredeLagtTilTreff?: string[];
  alleredeLagtTilKandidatliste?: string[];
}

const KandidatSøkResultat: React.FC<KandidatSøkResultatProps> = ({
  type,
  stillingsId,
  rekrutteringstreffId,
  alleredeLagtTilTreff,
  alleredeLagtTilKandidatliste,
}) => {
  const filter = useKandidatSøkFilterContext();
  const kandidatsøkHook = useKandidatsøk(type, filter);
  const { setKandidatNavigering } = useKandidatNavigeringContext();

  React.useEffect(() => {
    setKandidatNavigering(kandidatsøkHook.data?.navigering.kandidatnumre ?? []);
  }, [kandidatsøkHook.data?.navigering, setKandidatNavigering]);

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
            <div className='flex items-center justify-between'>
              <div className='ml-5'>
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
              <div className='flex gap-2'>
                {!rekrutteringstreffId && (
                  <LagreIKandidatlisteButton stillingsId={stillingsId} />
                )}
                <RekrutteringstreffFeatureToggle>
                  {!stillingsId && (
                    <LagreIRekrutteringstreffButton
                      rekrutteringstreffId={rekrutteringstreffId}
                      kandidatsokKandidater={
                        kandidatData.kandidater as KandidatsokKandidat[]
                      }
                    />
                  )}
                </RekrutteringstreffFeatureToggle>
              </div>
            </div>
            {kandidatData.kandidater?.map((kandidat, index) => (
              <KandidatKort
                stillingsId={stillingsId}
                alleredeLagtTil={
                  alleredeLagtTilKandidatliste ?? alleredeLagtTilTreff
                }
                key={kandidat.arenaKandidatnr || index}
                kandidat={kandidat as KandidatDataSchemaDTO}
              />
            ))}
            <div className={'flex justify-between items-center'}>
              <div>Viser {kandidatData.antallTotalt} treff</div>

              {antallSider > 1 && (
                <Pagination
                  className={'my-4 flex justify-center'}
                  size='medium'
                  page={filter.side}
                  onPageChange={filter.setSide}
                  count={siderTilPaginering}
                />
              )}
            </div>
          </>
        );
      }}
    </SWRLaster>
  );
};

export default KandidatSøkResultat;
