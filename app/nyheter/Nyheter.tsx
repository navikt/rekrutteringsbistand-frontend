import HovedInnholdKort from '../components/layout/HovedInnholdKort';
import SideLayout from '../components/layout/SideLayout';
import SideTopBanner from '../components/layout/SideTopBanner';
import VisEditorTekst from '../components/rikteksteditor/VisEditorTekst';
import { TilgangskontrollForInnhold } from '../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../components/tilgangskontroll/roller';
import { formaterNorskDato } from '../components/util';
import { nyheter } from '../nyheter';
import { OpprettNyhetModal } from './OpprettNyhetModal';
import { MegaphoneIcon, SparklesIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

const Nyheter: React.FC = () => {
  return (
    <HovedInnholdKort>
      <SideLayout
        banner={
          <SideTopBanner
            ikon={<MegaphoneIcon className='w-full h-full' />}
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
            <div className='flex flex-col gap-4 mb-4' key={index}>
              <div className='flex justify-between'>
                <h1 className='text-2xl font-bold flex gap-2'>
                  <SparklesIcon /> {nyhet.tittel}
                </h1>
                <BodyShort>{formaterNorskDato({ dato: nyhet.dato })}</BodyShort>
              </div>
              <div className='mx-8'>
                <VisEditorTekst htmlTekst={nyhet.beskrivelse} />
              </div>
              <hr />
            </div>
          ))}
        </div>
      </SideLayout>
    </HovedInnholdKort>
  );
};

export default Nyheter;
