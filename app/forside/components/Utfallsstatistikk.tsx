import { EyeIcon, HandshakeIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { useStatistikk } from '../../api/statistikk/statistikk';
import SWRLaster from '../../../components/SWRLaster';
import Infokort from './Infokort';
import { IStatistikkValg } from './Statistikk';

const Utfallsstatistikk: FunctionComponent<IStatistikkValg> = ({
  navKontor,
  fraOgMed,
  tilOgMed,
}) => {
  const swrData = useStatistikk({
    navKontor,
    fraOgMed,
    tilOgMed,
  });

  const { data } = swrData;

  return (
    <SWRLaster swrData={swrData}>
      {data && (
        <div className='flex flex-col gap-6 md:grid md:grid-cols-2'>
          <Infokort
            tall={data.antPresentasjoner.totalt}
            beskrivelse='Antall delt med arbeidsgiver'
            ikon={<EyeIcon aria-hidden />}
            detaljer={[
              {
                beskrivelse: 'Antall under 30 år',
                tall: data?.antPresentasjoner.under30år,
              },
              {
                beskrivelse: 'Antall uten standardinnsats',
                tall: data?.antPresentasjoner.innsatsgruppeIkkeStandard,
              },
            ]}
          />
          <Infokort
            tall={data?.antFåttJobben.totalt}
            beskrivelse='Antall som har fått jobb'
            ikon={<HandshakeIcon aria-hidden />}
            detaljer={[
              {
                beskrivelse: 'Antall under 30 år',
                tall: data?.antFåttJobben.under30år,
              },
              {
                beskrivelse: 'Antall uten standardinnsats',
                tall: data?.antFåttJobben.innsatsgruppeIkkeStandard,
              },
            ]}
          />
        </div>
      )}
    </SWRLaster>
  );
};

export default Utfallsstatistikk;
