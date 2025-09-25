'use client';

import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from './KandidaSokFilterContext';
import { useKandidatSøkMarkerteContext } from './KandidatSøkMarkerteContext';
import KandidatKort from './_ui/KandidatKort';
import LagreIKandidatlisteButton from './_ui/lagreKandidatliste/LagreIKandidatlisteButton';
import { KandidatDataSchemaDTO } from '@/app/api/kandidat-sok/schema/cvSchema.zod';
import {
  KandidatsokKandidat,
  useKandidatsøk,
} from '@/app/api/kandidat-sok/useKandidatsøk';
import LagreIRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/lagreIRekrutteringstreffButton/LagreIRekrutteringstreffButton';
import RekrutteringstreffFeatureToggle from '@/components/RekrutteringstreffFeatureToggle';
import SWRLaster from '@/components/SWRLaster';
import SideScroll from '@/components/SideScroll';
import SkeletonKort from '@/components/layout/SkeletonKort';
import { useKandidatNavigeringContext } from '@/providers/KandidatNavigeringContext';
import { Checkbox, Pagination } from '@navikt/ds-react';
import { FC, useEffect, useRef } from 'react';

interface KandidatSøkResultatProps {
  type: KandidatSøkPortefølje;
  stillingsId?: string;
  rekrutteringstreffId?: string;
  alleredeLagtTilTreff?: string[];
  alleredeLagtTilKandidatliste?: string[];
}

const KandidatSøkResultat: FC<KandidatSøkResultatProps> = ({
  type,
  stillingsId,
  rekrutteringstreffId,
  alleredeLagtTilTreff,
  alleredeLagtTilKandidatliste,
}) => {
  const filter = useKandidatSøkFilterContext();
  const kandidatsøkHook = useKandidatsøk(type, filter);
  const { setKandidatNavigering } = useKandidatNavigeringContext();
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setKandidatNavigering(kandidatsøkHook.data?.navigering.kandidatnumre ?? []);
  }, [kandidatsøkHook.data?.navigering, setKandidatNavigering]);

  const { markerteKandidater, setMarkertListe, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  return (
    <SWRLaster
      hooks={[kandidatsøkHook]}
      skeleton={
        <div className='mt-14'>
          <SkeletonKort />
        </div>
      }
    >
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
            <div ref={headerRef} className='flex items-center justify-between'>
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
              <div className='flex flex-row gap-2'>
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
            <SideScroll excludeRef={[headerRef]}>
              <div className='flex flex-col gap-1 pt-2'>
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
              </div>
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
            </SideScroll>
          </>
        );
      }}
    </SWRLaster>
  );
};

export default KandidatSøkResultat;
