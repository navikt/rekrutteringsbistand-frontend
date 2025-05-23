'use client';

import RekrutteringstreffDark from '../../../../public/ikoner/rekrutteringstreff-dark.svg';
import Rekrutteringstreff from '../../../../public/ikoner/rekrutteringstreff.svg';
import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import EndreTittel from './om-treffet/components/EndreTittel';
import {
  HendelseDTO,
  RekrutteringstreffDTO,
  useRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import SVGDarkmode from '@/app/components/SVGDarkmode';
import SWRLaster from '@/app/components/SWRLaster';
import SideLayout from '@/app/components/layout/SideLayout';
import SideTopBanner from '@/app/components/layout/SideTopBanner';
import { PencilIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Detail } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { useRef } from 'react';

export interface TreffHeaderProps {
  endreTittel: boolean;
}

const TreffHeader = ({ endreTittel }: TreffHeaderProps) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreffId);

  const endreTittelModalref = useRef<HTMLDialogElement>(null);

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
                      tittelElementer={[
                        ...(endreTittel
                          ? [
                              <Button
                                key='endre-tittel-knapp'
                                icon={<PencilIcon aria-hidden />}
                                aria-label='Endre tittel'
                                variant='tertiary'
                                size='small'
                                onClick={() =>
                                  endreTittelModalref.current?.showModal()
                                }
                              />,
                              <EndreTittel
                                key='endre-tittel-modal-${treff.tittel}'
                                modalRef={endreTittelModalref}
                                rekrutteringstreff={treff}
                                onUpdated={rekrutteringstreffHook.mutate}
                              />,
                            ]
                          : []),
                        ...(treff.status
                          ? [<BodyShort key='status'>{treff.status}</BodyShort>]
                          : []),
                      ]}
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
