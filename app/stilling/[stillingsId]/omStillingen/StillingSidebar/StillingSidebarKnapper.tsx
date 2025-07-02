'use client';

import { oppdaterStilling } from '../../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { TilgangskontrollForInnhold } from '../../../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../../../components/tilgangskontroll/roller';
import { useApplikasjonContext } from '../../../../providers/ApplikasjonContext';
import { useStillingsContext } from '../../StillingsContext';
import StillingPrint from './StillingPrint';
import EierStillingVisning from './components/EierStillingVisning';
import OpprettRekrutteringsoppdrag from './components/OpprettRekrutteringsoppdrag';
import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';

interface StillingSidebarKnapperProps {
  printRef: React.RefObject<HTMLDivElement>;
}

const StillingSidebarKnapper: React.FC<StillingSidebarKnapperProps> = ({
  printRef,
}) => {
  const { erEier, erDirektemeldt, stillingsData, erFormidling, refetch } =
    useStillingsContext();
  const { brukerData, valgtNavKontor } = useApplikasjonContext();

  const [loading, setLoading] = useState(false);

  const kanOvertaStilling = !erFormidling && erDirektemeldt && !erEier;

  const harStillingsinfo = stillingsData.stillingsinfo !== null;

  const kanOvertaEksternStilling =
    harStillingsinfo &&
    !erEier &&
    !erDirektemeldt &&
    stillingsData.stilling.employer?.orgnr;

  const kanOppretteKandidatliste =
    !harStillingsinfo &&
    !erEier &&
    !erDirektemeldt &&
    stillingsData.stilling.employer?.orgnr;

  const onOvertaStilling = async () => {
    setLoading(true);
    await oppdaterStilling(stillingsData, {
      eierNavident: brukerData.ident,
      eierNavn: brukerData.navn,
      eierNavKontorEnhetId: valgtNavKontor?.navKontor,
    });
    refetch();
  };

  return (
    <>
      <div className='flex'>
        <StillingPrint printRef={printRef} />
      </div>
      {erDirektemeldt && erEier && (
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
          ]}
        >
          <EierStillingVisning />
        </TilgangskontrollForInnhold>
      )}

      {(kanOppretteKandidatliste || kanOvertaEksternStilling) && (
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
          ]}
        >
          {kanOvertaEksternStilling && (
            <Button
              loading={loading}
              variant='primary'
              size='small'
              className='my-2 h-5 w-full'
              onClick={onOvertaStilling}
            >
              Marker som min
            </Button>
          )}
          {kanOppretteKandidatliste && (
            <OpprettRekrutteringsoppdrag
              arbeidsgiver={
                stillingsData.stilling.employer?.name || 'Ukjent bedrift'
              }
              orgnr={stillingsData.stilling.employer?.orgnr}
              stillingstittel={stillingsData.stilling.title}
              stillingsId={stillingsData.stilling.uuid}
            />
          )}
        </TilgangskontrollForInnhold>
      )}

      {kanOvertaStilling && (
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
          ]}
        >
          <Button
            onClick={onOvertaStilling}
            loading={loading}
            variant='secondary'
            size='small'
            className='my-2 h-5 w-full'
          >
            Overta stillingen
          </Button>
        </TilgangskontrollForInnhold>
      )}
    </>
  );
};

export default StillingSidebarKnapper;
