import KryssIkon from '../../../public/ikoner/kryss.svg';
import { useForesporselOmdelingAvCV } from '../../api/foresporsel-om-deling-av-cv/statistikk/useForesporselOmdelingAvCV';
import SVGDarkmode from '../../components/SVGDarkmode';
import SWRLaster from '../../components/SWRLaster';
import Infokort, { InfokortSkeleton } from './Infokort';
import { IStatistikkValg } from './Statistikk';
import { ChatCheckmarkIcon, ChatIcon } from '@navikt/aksel-icons';
import * as React from 'react';

const Forespørsler: React.FC<IStatistikkValg> = ({
  navKontor,
  fraOgMed,
  tilOgMed,
}) => {
  const forespørselHook = useForesporselOmdelingAvCV({
    navKontor,
    fraOgMed,
    tilOgMed,
  });

  return (
    <SWRLaster
      hooks={[forespørselHook]}
      skeleton={
        <>
          <div className='mt-6 flex gap-6'>
            <InfokortSkeleton />
            <InfokortSkeleton />
          </div>
          <div className='mt-6 flex gap-6'>
            <InfokortSkeleton />
            <InfokortSkeleton />
          </div>
        </>
      }
    >
      {(data) => (
        <div
          className='mt-6 flex flex-col gap-6 md:grid md:grid-cols-2'
          data-testid='forside-forespørsel-statistikk'
        >
          <Infokort
            beskrivelse='Antall som har svart ja'
            ikon={<ChatCheckmarkIcon />}
            tall={data.antallSvartJa}
          />
          <Infokort
            beskrivelse='Antall som har svart nei'
            ikon={
              <>
                <span className='absolute'>
                  <SVGDarkmode src={KryssIkon} alt='Kryss' />
                </span>
                <ChatIcon className='relative' />
              </>
            }
            tall={data.antallSvartNei}
          />
          <Infokort
            beskrivelse='Antall som venter på svar'
            ikon={<ChatIcon />}
            tall={data.antallVenterPåSvar}
          />
          <Infokort
            beskrivelse='Antall utløpte svar'
            tall={data.antallUtløpteSvar}
          />
        </div>
      )}
    </SWRLaster>
  );
};

export default Forespørsler;
