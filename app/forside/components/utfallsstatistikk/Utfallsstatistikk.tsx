import { EyeIcon, HandshakeIcon } from '@navikt/aksel-icons';
import { Loader } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { useStatistikk } from '../../../api/statistikk/statistikk';
import Feilmelding from '../../../components/feilhåndtering/Feilmelding';
import AntallPrioriterte from './AntallPrioriterte';
import Utfalltelling from './UtfallTelling';

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
    return <Loader />;
  }

  if (error) {
    return <Feilmelding {...error} tittel='Feil ved henting av statistikk' />;
  }

  if (!data) {
    return null;
  }
  return (
    <div className='flex flex-col gap-6 md:grid md:grid-cols-2'>
      <Utfalltelling
        tall={data?.antPresentasjoner.totalt}
        beskrivelse='Delt med arbeidsgiver'
        ikon={<EyeIcon aria-hidden />}
        detaljer={<AntallPrioriterte antall={data?.antPresentasjoner} />}
      />

      <Utfalltelling
        tall={data?.antFåttJobben.totalt}
        beskrivelse='Fikk jobb'
        ikon={<HandshakeIcon aria-hidden />}
        detaljer={<AntallPrioriterte antall={data?.antFåttJobben} />}
      />
    </div>
  );
};

export default Utfallsstatistikk;
