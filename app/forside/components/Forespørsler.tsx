import { ChatCheckmarkIcon, ChatIcon } from '@navikt/aksel-icons';
import * as React from 'react';
import SWRLaster from '../../../components/SWRLaster';
import { useForesporselOmdelingAvCV } from '../../api/foresporsel-om-deling-av-cv/statistikk/foresporselOmdelingAvCV';
import KryssIkon from '../icons/kryss.svg';
import Infokort, { InfokortSkeleton } from './Infokort';
import { IStatistikkValg } from './Statistikk';

const Forespørsler: React.FC<IStatistikkValg> = ({
  navKontor,
  fraOgMed,
  tilOgMed,
}) => {
  const hook = useForesporselOmdelingAvCV({
    navKontor,
    fraOgMed,
    tilOgMed,
  });

  return (
    <SWRLaster
      hook={hook}
      skeleton={
        <>
          <div className='flex gap-6 mt-6'>
            <InfokortSkeleton />
            <InfokortSkeleton />
          </div>
          <div className='flex gap-6 mt-6'>
            <InfokortSkeleton />
            <InfokortSkeleton />
          </div>
        </>
      }
    >
      {(data) => (
        <div className='flex flex-col gap-6 md:grid md:grid-cols-2 mt-6'>
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
                  <KryssIkon />
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
