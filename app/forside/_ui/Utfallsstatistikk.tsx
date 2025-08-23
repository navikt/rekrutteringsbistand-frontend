import Infokort, { InfokortSkeleton } from './Infokort';
import { IStatistikkValg } from './Statistikk';
import { useStatistikk } from '@/app/api/statistikk/useStatistikk';
import SWRLaster from '@/components/SWRLaster';
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
            tittel='Antall delt med arbeidsgiver'
            ikon={<EyeIcon aria-hidden />}
            tall={data.antPresentasjoner.totalt}
            beskrivelse={`${data.antPresentasjoner.under30år} under 30 år · ${data.antPresentasjoner.innsatsgruppeIkkeStandard} utenom standardinnsats`}
          />
          <Infokort
            tittel='Antall som har fått jobb'
            beskrivelse={`${data.antFåttJobben.under30år} under 30 år · ${data.antFåttJobben.innsatsgruppeIkkeStandard} utenom standardinnsats`}
            ikon={<HandshakeIcon aria-hidden />}
            tall={data.antFåttJobben.totalt}
          />
        </div>
      )}
    </SWRLaster>
  );
};

export default Utfallsstatistikk;
