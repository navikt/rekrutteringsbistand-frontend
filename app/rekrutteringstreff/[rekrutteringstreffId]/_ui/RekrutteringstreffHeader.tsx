'use client';

import RekrutteringstreffDark from '../../../../public/ikoner/rekrutteringstreff-dark.svg';
import Rekrutteringstreff from '../../../../public/ikoner/rekrutteringstreff.svg';
import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import {
  HendelseDTO,
  RekrutteringstreffDTO,
  useRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import SWRLaster from '@/components/SWRLaster';
import SVGDarkmode from '@/components/layout/SVGDarkmode';
import SideLayout from '@/components/layout/SideLayout';
import SideTopBanner from '@/components/layout/SideTopBanner';
import { Detail } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';

const TreffHeader = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreffId);

  return (
    <SWRLaster hooks={[rekrutteringstreffHook]}>
      {(treff: RekrutteringstreffDTO) => {
        if (
          !treff ||
          typeof treff !== 'object' ||
          !('tittel' in treff) ||
          !('hendelser' in treff)
        ) {
          return (
            <SideLayout
              banner={<SideTopBanner tittel='Problem med lasting av data' />}
            >
              <div>Kunne ikke laste rekrutteringstreffdetaljer riktig.</div>
            </SideLayout>
          );
        }

        const opprett = treff.hendelser.find(
          (h: HendelseDTO) => h.hendelsestype === 'OPPRETT',
        );

        const visningstittel = treff.tittel;

        return (
          <SideLayout
            banner={
              <>
                <div className='flex items-center gap-4'>
                  <div className='w-full flex justify-between pt-[32px] pb-10'>
                    <SideTopBanner
                      tittel={visningstittel}
                      ikon={
                        <SVGDarkmode
                          light={Rekrutteringstreff}
                          dark={RekrutteringstreffDark}
                          alt='Rekrutteringstreff'
                        />
                      }
                      headerInnhold={
                        <Detail className='text-gray-400'>
                          Opprettet av {opprett?.aktørIdentifikasjon}
                          {', '}
                          {opprett?.tidspunkt
                            ? format(
                                new Date(opprett.tidspunkt),
                                'd. MMMM yyyy',
                                { locale: nb },
                              )
                            : ''}
                        </Detail>
                      }
                      tittelElementer={[]}
                    />
                  </div>
                </div>
              </>
            }
          >
            <div />
          </SideLayout>
        );
      }}
    </SWRLaster>
  );
};

export default TreffHeader;
