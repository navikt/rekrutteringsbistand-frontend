'use client';

import { isLocal } from '../../util/env';
import HovedInnholdKort from '../components/layout/HovedInnholdKort';
import { Roller } from '../components/tilgangskontroll/roller';
import { Heading, Select, TextField } from '@navikt/ds-react';
import * as React from 'react';

const DevPage: React.FC = () => {
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

  if (!isLocal) {
    return null;
  }

  return (
    <HovedInnholdKort>
      <div className='ml-4 flex flex-col items-center gap-4'>
        <Heading size='large'>Rekrutteringsbistand - Developer</Heading>
        <div>
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
        <div>
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
      </div>
    </HovedInnholdKort>
  );
};

export default DevPage;
