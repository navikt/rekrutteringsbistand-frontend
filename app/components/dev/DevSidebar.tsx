import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import { Roller } from '../tilgangskontroll/roller';
import { Box, Select, TextField } from '@navikt/ds-react';
import * as React from 'react';

const rolleTilnavn = (rolle: Roller) => {
  switch (rolle) {
    case Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER:
      return 'Utvikler';
    case Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET:
      return 'Arbeidsgiverrettet';
    case Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET:
      return 'Jobbsøkerrettet';
    case Roller.AD_GRUPPE_MODIA_GENERELL_TILGANG:
      return 'Modia generell';
    default:
      return 'Ukjent rolle';
  }
};

const DevSidebar: React.FC = () => {
  const { valgtNavKontor, setValgtNavKontor, visVarsel } =
    useApplikasjonContext();

  const [devRolle, setDevRolle] = React.useState<Roller>(
    (localStorage.getItem('DEV-ROLLE') as Roller) ||
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
  );
  const [devBruker, setDevBruker] = React.useState<string>(
    localStorage.getItem('DEV-BRUKER') || 'TestIdent',
  );

  const setDevRolleCookie = (rolle: Roller) => {
    localStorage.setItem('DEV-ROLLE', rolle);
    setDevRolle(rolle);
    window.location.reload();
  };

  const setDevBrukerCookie = (bruker: string) => {
    localStorage.setItem('DEV-BRUKER', bruker);
    setDevBruker(bruker);
    window.location.reload();
  };

  React.useEffect(() => {
    if (!valgtNavKontor) {
      setValgtNavKontor({ navKontor: '1234', navKontorNavn: 'NAV FYA1' });
    }
  });

  if (process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE) {
    return (
      <Box.New background='raised' className='flex flex-col px-2'>
        <strong>Playwright Test</strong>
        <span>Bruker: {devBruker} </span>
        <span>Rolle: {rolleTilnavn(devRolle)}</span>
      </Box.New>
    );
  }

  return (
    <Box.New background='raised' className='flex flex-col px-2 gap-2'>
      <strong>Dev:</strong>

      <div className='flex items-center gap-2'>
        <span>
          <strong>Bruker:</strong>{' '}
        </span>
        <TextField
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setDevBrukerCookie(e.currentTarget.value);
            }
          }}
          defaultValue={devBruker}
          size='small'
          label={'Dev bruker'}
          hideLabel
        />
      </div>

      <div className='flex items-center gap-2'>
        <span>
          <strong>Rolle: </strong>
        </span>
        <Select
          label='Velg bostedsland'
          hideLabel
          size='small'
          value={devRolle}
          onChange={(e) => setDevRolleCookie(e.target.value as Roller)}
        >
          <option value={Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER}>
            Utvikler
          </option>
          <option
            value={Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET}
          >
            Arbeidsgiverrettet
          </option>
          <option value={Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET}>
            Jobbsøkerrettet
          </option>
          <option value={Roller.AD_GRUPPE_MODIA_GENERELL_TILGANG}>
            Modia generell
          </option>
        </Select>
      </div>
      <button onClick={() => visVarsel({ tekst: 'Test', type: 'info' })}>
        Vis varsel
      </button>
    </Box.New>
  );
};

export default DevSidebar;
