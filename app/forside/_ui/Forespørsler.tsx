import Infokort, { InfokortSkeleton } from './Infokort';
import { IStatistikkValg } from './Statistikk';
import { useForesporselOmdelingAvCV } from '@/app/api/foresporsel-om-deling-av-cv/statistikk/useForesporselOmdelingAvCV';
import SWRLaster from '@/components/SWRLaster';
import { ArrowForwardIcon } from '@navikt/aksel-icons';
import { FC } from 'react';

const Forespørsler: FC<IStatistikkValg> = ({
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
          <div className='mt-6 flex '>
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
            ikonFront
            tittel='CV-er godkjent for deling med arbeidsgiver'
            ikon={<ArrowForwardIcon />}
            detaljer={[
              {
                beskrivelse: 'Kandidater spurt om å dele',
                tall:
                  data.antallSvartJa +
                  data.antallSvartNei +
                  data.antallVenterPåSvar +
                  data.antallUtløpteSvar,
              },
              {
                beskrivelse: 'Godkjent',
                tall: data.antallSvartJa,
              },
              {
                beskrivelse: 'Avslått',
                tall: data.antallSvartNei,
              },
              {
                beskrivelse: 'Ikke svart',
                tall: data.antallVenterPåSvar,
              },
              {
                beskrivelse: 'Utløpt',
                tall: data.antallUtløpteSvar,
              },
            ]}
          />
        </div>
      )}
    </SWRLaster>
  );
};

export default Forespørsler;
