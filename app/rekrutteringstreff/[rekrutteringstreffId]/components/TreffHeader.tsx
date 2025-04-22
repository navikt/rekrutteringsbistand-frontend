'use client';

import RekrutteringstreffDark from '../../../../public/ikoner/rekrutteringstreff-dark.svg';
import Rekrutteringstreff from '../../../../public/ikoner/rekrutteringstreff.svg';
import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import SVGDarkmode from '@/app/components/SVGDarkmode';
import SWRLaster from '@/app/components/SWRLaster';
import SideLayout from '@/app/components/layout/SideLayout';
import SideTopBanner from '@/app/components/layout/SideTopBanner';
import { PencilIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

const TreffHeader = ({}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const rekrutteringstreffHook = useRekrutteringstreff(
    rekrutteringstreffId as string,
  );

  return (
    <div>
      <SWRLaster hooks={[rekrutteringstreffHook]}>
        {(rekrutteringstreff) => {
          return (
            <SideLayout
              banner={
                <div className='flex items-center gap-4'>
                  <div>
                    <SideTopBanner
                      tittel={rekrutteringstreff.tittel}
                      ikon={
                        <SVGDarkmode
                          light={Rekrutteringstreff}
                          dark={RekrutteringstreffDark}
                          alt='Rekrutteringstreff'
                        />
                      }
                      headerInnhold={
                        <BodyShort>
                          Opprettet av{' '}
                          {rekrutteringstreff.opprettetAvPersonNavident}
                        </BodyShort>
                      }
                    />
                  </div>
                  <div className='mb-6'>
                    <PencilIcon />
                  </div>

                  <BodyShort className='mb-6'>
                    {rekrutteringstreff.status}
                  </BodyShort>
                </div>
              }
            >
              <div></div>
            </SideLayout>
          );
        }}
      </SWRLaster>
    </div>
  );
};

export default TreffHeader;
