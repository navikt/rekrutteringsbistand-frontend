import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Box, Select, TextField } from '@navikt/ds-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

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

const hentCookie = (navn: string): string | null => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${navn}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const DevDekoratør: React.FC = () => {
  const { valgtNavKontor, setValgtNavKontor } = useApplikasjonContext();

  const [devRolle, setDevRolle] = useState<Roller>(
    (hentCookie('DEV-ROLLE') as Roller) ||
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
  );
  const [devBruker, setDevBruker] = useState<string>(
    hentCookie('DEV-BRUKER') || 'TestIdent',
  );

  const setDevRolleCookie = (rolle: Roller) => {
    document.cookie = `DEV-ROLLE=${rolle}; path=/`;
    setDevRolle(rolle);
    window.location.reload();
  };

  const setDevBrukerCookie = (bruker: string) => {
    document.cookie = `DEV-BRUKER=${bruker}; path=/`;
    setDevBruker(bruker);
    window.location.reload();
  };

  useEffect(() => {
    if (!valgtNavKontor) {
      setValgtNavKontor({ navKontor: '1234', navKontorNavn: 'NAV FYA1' });
    }
  }, [valgtNavKontor, setValgtNavKontor]);

  useEffect(() => {
    document.cookie = `DEV-ROLLE=${devRolle}; path=/`;
    document.cookie = `DEV-BRUKER=${devBruker}; path=/`;
  }, [devRolle, devBruker]);

  if (process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE) {
    return (
      <Box background='raised' className='flex flex-col px-2'>
        <strong>Playwright Test</strong>
        <span>Bruker: {devBruker} </span>
        <span>Rolle: {rolleTilnavn(devRolle)}</span>
      </Box>
    );
  }

  return (
    <Box background='raised' className='flex gap-2 px-2'>
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
    </Box>
  );
};

export default DevDekoratør;
