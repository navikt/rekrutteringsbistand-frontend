'use client';

import HovedInnholdKort from '../components/layout/HovedInnholdKort';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import VisEditorTekst from '../components/rikteksteditor/VisEditorTekst';
import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../components/tilgangskontroll/roller';
import { formaterNorskDato } from '../components/util';
import { nyheter } from '../nyheter';
import { OpprettNyhetModal } from './OpprettNyhetModal';
import { PencilIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button } from '@navikt/ds-react';
import * as React from 'react';

const Nyheter: React.FC = () => {
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
        <div className='flex flex-col gap-4 mb-4'>
          {nyheter.map((nyhet, index) => (
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
                    <Button variant='tertiary' disabled icon={<PencilIcon />}>
                      Endre
                    </Button>
                    <Button variant='tertiary' disabled icon={<TrashIcon />}>
                      Slett
                    </Button>
                  </TilgangskontrollForInnhold>
                </div>
              </div>
              <BodyShort>{formaterNorskDato({ dato: nyhet.dato })}</BodyShort>
              <div className='my-8'>
                <VisEditorTekst htmlTekst={nyhet.beskrivelse} />
              </div>
            </Box.New>
          ))}
        </div>
      </SideLayout>
    </HovedInnholdKort>
  );
};

export default Nyheter;
