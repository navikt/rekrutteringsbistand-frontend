import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../components/tilgangskontroll/roller';
import { useStillingsSøkFilter } from '../StillingsSøkContext';
import { StillingsSøkPortefølje } from '../stillingssøk-typer';
import { Button, Switch } from '@navikt/ds-react';
import * as React from 'react';

const StillingsSøkNavigasjon: React.FC = () => {
  const { portefølje, setPortefølje, harKandidatliste, setHarKandidatliste } =
    useStillingsSøkFilter();
  return (
    <div className='flex gap-2'>
      <Button
        variant={
          portefølje === StillingsSøkPortefølje.INTERN ? 'primary' : 'tertiary'
        }
        onClick={() => setPortefølje(StillingsSøkPortefølje.INTERN)}
        size='small'
      >
        Alle interne
      </Button>
      <TilgangskontrollForInnhold
        skjulVarsel
        kreverEnAvRollene={[
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        ]}
      >
        <Button
          variant={
            portefølje === StillingsSøkPortefølje.VIS_MINE
              ? 'primary'
              : 'tertiary'
          }
          onClick={() => setPortefølje(StillingsSøkPortefølje.VIS_MINE)}
          size='small'
        >
          Mine
        </Button>
      </TilgangskontrollForInnhold>
      <Button
        variant={
          portefølje === StillingsSøkPortefølje.MITT_KONTOR
            ? 'primary'
            : 'tertiary'
        }
        onClick={() => setPortefølje(StillingsSøkPortefølje.MITT_KONTOR)}
        size='small'
      >
        Mitt kontor
      </Button>
      <div className='w-0 h-8  outline-1  outline-Border-Accent-Accent-Subtle' />
      <Button
        variant={
          portefølje === StillingsSøkPortefølje.ARBEIDSPLASSEN_NO
            ? 'primary'
            : 'tertiary'
        }
        onClick={() => setPortefølje(StillingsSøkPortefølje.ARBEIDSPLASSEN_NO)}
        size='small'
      >
        arbeidsplassen.no
      </Button>
      {portefølje === StillingsSøkPortefølje.ARBEIDSPLASSEN_NO && (
        <Switch
          value='sms'
          size='small'
          checked={harKandidatliste}
          onChange={(e) => setHarKandidatliste(e.target.checked)}
        >
          Har kandidatliste
        </Switch>
      )}
    </div>
  );
};

export default StillingsSøkNavigasjon;
