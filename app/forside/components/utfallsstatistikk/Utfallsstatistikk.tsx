import { EyeIcon, HandshakeIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { useStatistikk } from '../../../api/statistikk/statistikk';
import Feilmelding from '../../../components/feilhåndtering/Feilmelding';
import Sidelaster from '../../../components/Sidelaster';
import Infokort from './Infokort';

type Props = {
  navKontor: string;
  fraOgMed: Date;
  tilOgMed: Date;
};

const Utfallsstatistikk: FunctionComponent<Props> = ({
  navKontor,
  fraOgMed,
  tilOgMed,
}) => {
  const { data, isLoading, isValidating, error } = useStatistikk({
    navKontor,
    fraOgMed,
    tilOgMed,
  });

  if (isLoading || isValidating) {
    return <Sidelaster />;
  }

  if (error) {
    return <Feilmelding {...error} tittel='Feil ved henting av statistikk' />;
  }

  if (!data) {
    return null;
  }
  return (
    <div className='flex flex-col gap-6 md:grid md:grid-cols-2'>
      <Infokort
        tall={data?.antPresentasjoner.totalt}
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
  );
};

export default Utfallsstatistikk;
