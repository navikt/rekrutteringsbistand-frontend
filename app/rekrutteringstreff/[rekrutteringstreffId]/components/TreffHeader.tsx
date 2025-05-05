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
import { BodyShort, Detail } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';

const TreffHeader = ({}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const rekrutteringstreffHook = useRekrutteringstreff(
    rekrutteringstreffId as string,
  );

  return (
    <div>
      <SWRLaster hooks={[rekrutteringstreffHook]}>
        {(rekrutteringstreff) => {
          const oppretthendelse = rekrutteringstreff.hendelser.find(
            (h) => h.hendelsestype === 'OPPRETT',
          );

          return (
            <SideLayout
              banner={
                <div className='flex items-center gap-4'>
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
                      <Detail className='text-gray-400'>
                        Opprettet av {oppretthendelse?.aktørIdentifikasjon}
                        {', '}
                        {oppretthendelse?.tidspunkt
                          ? format(
                              new Date(oppretthendelse.tidspunkt),
                              'd. MMMM yyyy',
                              { locale: nb },
                            )
                          : ''}
                      </Detail>
                    }
                  />
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
