'use client';

import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from './KandidaSokFilterContext';
import KandidatKort from './_ui/KandidatKort';
import { KandidatDataSchemaDTO } from '@/app/api/kandidat-sok/schema/cvSchema.zod';
import { useKandidatsøk } from '@/app/api/kandidat-sok/useKandidatsøk';
import KandidatSøkTabs from '@/app/kandidat/KandidatSøkTabs';
import KandidatSøkChips from '@/app/kandidat/_ui/KandidatSøkChips';
import MarkerOgLagreKandidater from '@/components/MarkerteKandidater/MarkerOgLagreKandidater';
import SWRLaster from '@/components/SWRLaster';
import SideScroll from '@/components/SideScroll';
import SkeletonKort from '@/components/layout/SkeletonKort';
import LitenPaginering from '@/components/paginering/LitenPaginering';
import { useKandidatNavigeringContext } from '@/providers/KandidatNavigeringContext';
import { FC, useEffect } from 'react';

const lagFilterSignatur = (
  filter: ReturnType<typeof useKandidatSøkFilterContext>,
  { inkluderSide }: { inkluderSide: boolean },
) => {
  const normalisert = {
    fritekst: filter.fritekst,
    portefølje: filter.portefølje,
    sortering: filter.sortering,
    valgtKontor: [...filter.valgtKontor].sort(),
    innsatsgruppe: [...filter.innsatsgruppe].sort(),
    ønsketYrke: [...filter.ønsketYrke].sort(),
    ønsketSted: [...filter.ønsketSted].sort(),
    borPåØnsketSted: filter.borPåØnsketSted,
    kompetanse: [...filter.kompetanse].sort(),
    førerkort: [...filter.førerkort].sort(),
    prioritertMålgruppe: [...filter.prioritertMålgruppe].sort(),
    hovedmål: [...filter.hovedmål].sort(),
    utdanningsnivå: [...filter.utdanningsnivå].sort(),
    arbeidserfaring: [...filter.arbeidserfaring].sort(),
    språk: [...filter.språk].sort(),
    ferskhet: filter.ferskhet ?? null,
    orgenhet: filter.orgenhet,
  } as const;

  const normalisertMedSide = inkluderSide
    ? { ...normalisert, side: filter.side }
    : normalisert;

  return JSON.stringify(normalisertMedSide);
};

interface KandidatSøkResultatProps {
  stillingsId?: string;
  rekrutteringstreffId?: string;
  alleredeLagtTilTreff?: string[];
  alleredeLagtTilKandidatliste?: string[];
}

const KandidatSøkResultat: FC<KandidatSøkResultatProps> = ({
  stillingsId,
  rekrutteringstreffId,
  alleredeLagtTilTreff,
  alleredeLagtTilKandidatliste,
}) => {
  const filter = useKandidatSøkFilterContext();
  const { portefølje } = useKandidatSøkFilterContext();
  const kandidatsøkHook = useKandidatsøk(
    portefølje as KandidatSøkPortefølje,
    filter,
  );
  const { setKandidatNavigering } = useKandidatNavigeringContext();
  useEffect(() => {
    setKandidatNavigering(kandidatsøkHook.data?.navigering.kandidatnumre ?? []);
  }, [kandidatsøkHook.data?.navigering, setKandidatNavigering]);

  const filterSignatur = lagFilterSignatur(filter, { inkluderSide: false });
  const scrollSignatur = lagFilterSignatur(filter, { inkluderSide: true });

  return (
    <>
      <div className='ml-4'>
        <KandidatSøkChips />
      </div>
      <SWRLaster
        hooks={[kandidatsøkHook]}
        skeleton={
          <div className='mt-14'>
            <SkeletonKort />
          </div>
        }
      >
        {(kandidatData) => {
          if (!kandidatData) return null;

          return (
            <>
              <div className='ml-4'>
                <KandidatSøkTabs />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex min-w-0 flex-row items-center gap-4 whitespace-nowrap'>
                  <MarkerOgLagreKandidater
                    kandidatsøkHook={kandidatsøkHook}
                    rekrutteringstreffId={rekrutteringstreffId}
                    stillingsId={stillingsId}
                  />
                </div>
                <div className='flex shrink-0 flex-row gap-2 whitespace-nowrap'>
                  <LitenPaginering
                    fraAntall={(filter.side - 1) * 25 + 1}
                    tilAntall={filter.side * 25}
                    total={kandidatData.antallTotalt}
                    side={filter.side}
                    setSide={filter.setSide}
                  />
                </div>
              </div>
              <SideScroll
                key={filterSignatur}
                lagreScrollNøkkel={`kandidater-${scrollSignatur}`}
              >
                <div className='flex flex-col gap-1 pt-2'>
                  {kandidatData.kandidater?.map((kandidat, index) => (
                    <KandidatKort
                      stillingsId={stillingsId}
                      rekrutteringstreffId={rekrutteringstreffId}
                      alleredeLagtTil={
                        alleredeLagtTilKandidatliste ?? alleredeLagtTilTreff
                      }
                      key={kandidat.arenaKandidatnr || index}
                      kandidat={kandidat as KandidatDataSchemaDTO}
                    />
                  ))}
                </div>
              </SideScroll>
            </>
          );
        }}
      </SWRLaster>
    </>
  );
};

export default KandidatSøkResultat;
