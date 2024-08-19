import { InternalHeader } from '@navikt/ds-react';
import * as React from 'react';
import { ApplikasjonContext } from '../../ApplikasjonContext';
import { Rolle } from '../tilgangskontroll/Roller';

const DevDekoratør: React.FC = () => {
  const { navIdent, roller, valgtNavKontor, setValgtNavKontor } =
    React.useContext(ApplikasjonContext);

  React.useEffect(() => {
    if (!valgtNavKontor) {
      setValgtNavKontor({ navKontor: '1234', navKontorNavn: 'NAV FYA1' });
    }
  });
  const visRolleNavn = () => {
    if (roller?.includes(Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER)) {
      return 'Utvikler';
    }
    if (
      roller?.includes(Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET)
    ) {
      return 'Arbeidsgiverrettet';
    }
    if (
      roller?.includes(Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET)
    ) {
      return 'Jobbsøkerrettet';
    }
  };

  return (
    <InternalHeader>
      <InternalHeader.Title as='h1'>
        Rekrutteringsbistand - Developer
      </InternalHeader.Title>

      <div className='flex justify-between items-center gap-x-4 ml-4'>
        <span>
          <strong>Bruker:</strong> {navIdent}
        </span>
        <span>
          <strong>Rolle:</strong> {visRolleNavn()}
        </span>
        <span>
          <strong>NAV Kontor:</strong> {valgtNavKontor?.navKontorNavn} -{' '}
          {valgtNavKontor?.navKontor}
        </span>
      </div>
    </InternalHeader>
  );
};

export default DevDekoratør;
