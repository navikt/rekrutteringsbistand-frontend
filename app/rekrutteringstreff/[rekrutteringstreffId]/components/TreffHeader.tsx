'use client';

import RekrutteringstreffDark from '../../../../public/ikoner/rekrutteringstreff-dark.svg';
import Rekrutteringstreff from '../../../../public/ikoner/rekrutteringstreff.svg';
import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import Endretittel from './om-treffet/components/EndreTittel';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
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
const TreffHeader: React.FC<TreffHeaderProps> = ({ endreTittel }) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const rekrutteringstreffHook = useRekrutteringstreff(
    rekrutteringstreffId as string,
  );

  const endreTittelModalref = useRef<HTMLDialogElement>(null);

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
                <div>
                  <div className='flex items-center gap-4'>
                    <div className='w-90 flex justify-between pt-[32px] pb-10'>
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
                    </div>
                    {endreTittel && rekrutteringstreff && (
                      <div className='mb-6'>
                        <Button
                          icon={<PencilIcon />}
                          variant='tertiary'
                          size='small'
                          onClick={() =>
                            endreTittelModalref.current?.showModal()
                          }
                        ></Button>
                      </div>
                    )}

                    <Endretittel
                      modalRef={endreTittelModalref}
                      rekrutteringstreff={rekrutteringstreff}
                      onUpdated={rekrutteringstreffHook.mutate}
                    />

                    <BodyShort className='mb-6'>
                      {rekrutteringstreff.status}
                    </BodyShort>
                  </div>
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
