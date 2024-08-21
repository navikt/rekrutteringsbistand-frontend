import { ChatCheckmarkIcon, ChatIcon } from '@navikt/aksel-icons';
import * as React from 'react';
import { useDelingAvCV } from '../../api/statistikk/deling-av-cv/delingAvCV';
import SWRLaster from '../../components/SWRLaster';
import KryssIkon from '../icons/kryss.svg';
import Infokort from './Infokort';
import { IStatistikkValg } from './Statistikk';

const Forespørsler: React.FC<IStatistikkValg> = ({
  navKontor,
  fraOgMed,
  tilOgMed,
}) => {
  const swrData = useDelingAvCV({
    navKontor,
    fraOgMed,
    tilOgMed,
  });

  const { data } = swrData;
  return (
    <SWRLaster swrData={swrData}>
      {data && (
        <div className='flex flex-col gap-6 md:grid md:grid-cols-2 mt-6'>
          <Infokort
            tall={data.antallSvartJa}
            beskrivelse='Antall som har svart ja'
            ikon={<ChatCheckmarkIcon />}
          />
          <Infokort
            tall={data.antallSvartNei}
            beskrivelse='Antall som har svart nei'
            ikon={
              <>
                <span className='absolute'>
                  <KryssIkon />
                </span>
                <ChatIcon className='relative' />
              </>
            }
          />
          <Infokort
            tall={data.antallVenterPåSvar}
            beskrivelse='Antall som venter på svar'
            ikon={<ChatIcon />}
          />
          <Infokort
            tall={data.antallUtløpteSvar}
            beskrivelse='Antall utløpte svar'
          />
        </div>
      )}
    </SWRLaster>
  );
};

export default Forespørsler;
