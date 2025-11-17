import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { StillingsSøkPortefølje } from '@/app/stilling/_util/stillingssøk-typer';
import { useStillingssokTotalData } from '@/app/stilling/store/stillingssokTotalData';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Button, Chips } from '@navikt/ds-react';
import { FC } from 'react';

const StillingsSøkNavigasjon: FC = () => {
  const {
    portefølje,
    setPortefølje,
    utenOppdrag,
    setUtenOppdrag,
    formidlinger,
  } = useStillingsSøkFilter();

  useStillingssokTotalData(); // behold hook-kall hvis senere utvidelser
  return (
    <div className='flex items-center gap-2'>
      <Button
        variant={
          portefølje === StillingsSøkPortefølje.INTERN ? 'primary' : 'tertiary'
        }
        onClick={() => setPortefølje(StillingsSøkPortefølje.INTERN)}
        size='xsmall'
      >
        Alle
      </Button>
      <TilgangskontrollForInnhold
        skjulVarsel
        kreverEnAvRollene={
          formidlinger
            ? [
                Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
              ]
            : [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]
        }
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
          <div className='outline-Border-Accent-Accent-Subtle h-4 w-0 outline-1 outline-offset-[-0.50px]'></div>
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
