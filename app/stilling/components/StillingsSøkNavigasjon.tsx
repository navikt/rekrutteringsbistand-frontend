import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../components/tilgangskontroll/roller';
import { useStillingsSøkFilter } from '../StillingsSøkContext';
import { StillingsSøkPortefølje } from '../stillingssøk-typer';
import { Button, Chips } from '@navikt/ds-react';
import * as React from 'react';

const StillingsSøkNavigasjon: React.FC = () => {
  const {
    portefølje,
    setPortefølje,
    utenOppdrag,
    setUtenOppdrag,
    formidlinger,
  } = useStillingsSøkFilter();
  return (
    <div className='flex gap-2 items-center'>
      <Button
        variant={
          portefølje === StillingsSøkPortefølje.INTERN ? 'primary' : 'tertiary'
        }
        onClick={() => setPortefølje(StillingsSøkPortefølje.INTERN)}
        size='xsmall'
      >
        Alle oppdrag
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
          size='xsmall'
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
        size='xsmall'
      >
        Mitt kontor
      </Button>
      {!formidlinger && (
        <>
          <div className='w-0 h-4  outline-1 outline-offset-[-0.50px] outline-Border-Accent-Accent-Subtle'></div>
          <Button
            variant={
              portefølje === StillingsSøkPortefølje.ARBEIDSPLASSEN_NO
                ? 'primary'
                : 'tertiary'
            }
            onClick={() =>
              setPortefølje(StillingsSøkPortefølje.ARBEIDSPLASSEN_NO)
            }
            size='xsmall'
          >
            arbeidsplassen.no
          </Button>
          {portefølje === StillingsSøkPortefølje.ARBEIDSPLASSEN_NO && (
            <Chips size='small'>
              <Chips.Toggle
                key='harKandidatliste'
                selected={!utenOppdrag}
                onClick={() => setUtenOppdrag(!utenOppdrag)}
              >
                Med oppdrag
              </Chips.Toggle>
            </Chips>
          )}
        </>
      )}
    </div>
  );
};

export default StillingsSøkNavigasjon;
