import { InternalHeader, Select, TextField } from '@navikt/ds-react';
import * as React from 'react';
import { useApplikasjonContext } from '../../ApplikasjonContext';
import { Roller } from '../tilgangskontroll/roller';

const DevDekoratør: React.FC = () => {
  const {
    brukerData: { ident, roller },
    valgtNavKontor,
    setValgtNavKontor,
  } = useApplikasjonContext();

  const [devRolle, setDevRolle] = React.useState<Roller>(
    (localStorage.getItem('DEV-ROLLE') as Roller) ||
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
  );
  const [devBruker, setDevBruker] = React.useState<string>(
    localStorage.getItem('DEV-BRUKER') || 'Z993141',
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

  return (
    <InternalHeader>
      <InternalHeader.Title as='h1'>
        Rekrutteringsbistand - Developer
      </InternalHeader.Title>

      <div className='flex justify-between items-center gap-4 ml-4'>
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
            <option
              value={Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET}
            >
              Jobbsøkerrettet
            </option>
            <option value={Roller.AD_GRUPPE_MODIA_GENERELL_TILGANG}>
              Modia generell
            </option>
          </Select>
        </div>
        <span>
          <strong>NAV Kontor:</strong> {valgtNavKontor?.navKontorNavn} -{' '}
          {valgtNavKontor?.navKontor}
        </span>
      </div>
    </InternalHeader>
  );
};

export default DevDekoratør;
