import { useStatistikk } from '../../api/statistikk/useStatistikk';
import SWRLaster from '../../components/SWRLaster';
import Infokort, { InfokortSkeleton } from './Infokort';
import { IStatistikkValg } from './Statistikk';
import { EyeIcon, HandshakeIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

const Utfallsstatistikk: FunctionComponent<IStatistikkValg> = ({
  navKontor,
  fraOgMed,
  tilOgMed,
}) => {
  const statistikkHook = useStatistikk({
    navKontor,
    fraOgMed,
    tilOgMed,
  });

  return (
    <SWRLaster
      hooks={[statistikkHook]}
      skeleton={
        <div className='flex gap-6'>
          <InfokortSkeleton />
          <InfokortSkeleton />
        </div>
      }
    >
      {(data) => (
        <div
          className='flex flex-col gap-6 md:grid md:grid-cols-2'
          data-testid='forside-utfallsstatistikk'
        >
          <Infokort
            beskrivelse='Antall delt med arbeidsgiver'
            detaljer={[
              {
                beskrivelse: 'Antall under 30 år',
                tall: data.antPresentasjoner.under30år,
              },
              {
                beskrivelse: 'Antall uten standardinnsats',
                tall: data.antPresentasjoner.innsatsgruppeIkkeStandard,
              },
            ]}
            ikon={<EyeIcon aria-hidden />}
            tall={data.antPresentasjoner.totalt}
          />
          <Infokort
            beskrivelse='Antall som har fått jobb'
            detaljer={[
              {
                beskrivelse: 'Antall under 30 år',
                tall: data.antFåttJobben.under30år,
              },
              {
                beskrivelse: 'Antall uten standardinnsats',
                tall: data.antFåttJobben.innsatsgruppeIkkeStandard,
              },
            ]}
            ikon={<HandshakeIcon aria-hidden />}
            tall={data.antFåttJobben.totalt}
          />
        </div>
      )}
    </SWRLaster>
  );
};

export default Utfallsstatistikk;
