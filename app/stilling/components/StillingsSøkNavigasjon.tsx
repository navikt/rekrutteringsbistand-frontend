import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../components/tilgangskontroll/roller';
import { useStillingsSøkFilter } from '../StillingsSøkContext';
import { StillingsSøkPortefølje } from '../stillingssøk-typer';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

const StillingsSøkNavigasjon: React.FC = () => {
  const { portefølje, setPortefølje } = useStillingsSøkFilter();
  return (
    <div className='flex gap-2'>
      <Button
        variant={
          portefølje === StillingsSøkPortefølje.VIS_ALLE
            ? 'primary'
            : 'tertiary'
        }
        onClick={() => setPortefølje(StillingsSøkPortefølje.VIS_ALLE)}
        size='small'
      >
        Alle
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
    </div>
  );
};

export default StillingsSøkNavigasjon;
