'use client';

import { OpprettNyhetModal } from './OpprettNyhetModal';
import { slettNyhet } from '@/app/api/bruker/nyheter/[...slug]/nyhet-admin';
import { useNyheter } from '@/app/api/bruker/nyheter/useNyheter';
import SWRLaster from '@/components/SWRLaster';
import VisEditorTekst from '@/components/felles/rikteksteditor/VisEditorTekst';
import HovedInnholdKort from '@/components/layout/HovedInnholdKort';
import SideLayout from '@/components/layout/SideLayout';
import SideTopBanner from '@/components/layout/SideTopBanner';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { formaterNorskDato } from '@/util/util';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button } from '@navikt/ds-react';
import * as React from 'react';
import { EndreNyhetModal } from '@/app/nyheter/EndreNyhetModal';

const Nyheter: React.FC = () => {
  const nyheterHook = useNyheter();

  return (
    <SWRLaster hooks={[nyheterHook]}>
      {(nyheterData) => {
        nyheterData.sort(
          (a, b) =>
            new Date(b.opprettetDato).getDate() -
            new Date(a.opprettetDato).getDate(),
        );

        return (
          <HovedInnholdKort>
            <SideLayout
              banner={
                <SideTopBanner
                  tittel={'Nyheter'}
                  knappIBanner={
                    <TilgangskontrollForInnhold
                      skjulVarsel
                      kreverEnAvRollene={[
                        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
                      ]}
                    >
                      <OpprettNyhetModal />
                    </TilgangskontrollForInnhold>
                  }
                />
              }
            >
              <OpprettNyhetModal />
              <div className='flex flex-col gap-4 mb-4'>
                {nyheterData.map((nyhet, index) => (
                  <Box.New
                    key={index}
                    className='@container/kandidatlistekort mb-4 flex flex-col p-4 min-w-fit'
                    background='neutral-softA'
                    borderRadius='xlarge'
                    data-testid='stillings-kort'
                  >
                    <div className='flex justify-between'>
                      <h1 className='text-2xl font-bold flex gap-2'>
                        {nyhet.tittel}
                      </h1>
                      <div>
                        <TilgangskontrollForInnhold
                          skjulVarsel
                          kreverEnAvRollene={[
                            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
                          ]}
                        >
                          <EndreNyhetModal id={nyhet.id} tittel={nyhet.tittel} innhold={nyhet.innhold}/>
                          {/*<Button*/}
                          {/*  variant='tertiary'*/}
                          {/*  disabled*/}
                          {/*  icon={<PencilIcon />}*/}
                          {/*>*/}
                          {/*  Endre*/}
                          {/*</Button>*/}
                          <Button
                            variant='tertiary'
                            icon={<TrashIcon />}
                            onClick={() =>
                              slettNyhet(nyhet.id).then(() =>
                                nyheterHook.mutate(),
                              )
                            }
                          >
                            Slett
                          </Button>
                        </TilgangskontrollForInnhold>
                      </div>
                    </div>
                    <BodyShort>
                      {formaterNorskDato({ dato: nyhet.opprettetDato })}
                    </BodyShort>
                    <div className='my-8'>
                      <VisEditorTekst htmlTekst={nyhet.innhold} />
                    </div>
                  </Box.New>
                ))}
              </div>
            </SideLayout>
          </HovedInnholdKort>
        );
      }}
    </SWRLaster>
  );
};

export default Nyheter;
