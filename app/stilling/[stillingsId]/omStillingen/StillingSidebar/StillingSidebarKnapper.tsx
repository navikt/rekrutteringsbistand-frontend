'use client';

import { useApplikasjonContext } from '../../../../ApplikasjonContext';
import { oppdaterStilling } from '../../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { setStillingsinfo } from '../../../../api/stilling/stillingsinfo/setStillingsinfo';
import { TilgangskontrollForInnhold } from '../../../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../../../components/tilgangskontroll/roller';
import { useStillingsContext } from '../../StillingsContext';
import StillingPrint from './StillingPrint';
import EierStillingVisning from './components/EierStillingVisning';
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
  const { brukerData } = useApplikasjonContext();

  const [loading, setLoading] = useState(false);

  const opprettStillingInfo = {
    stillingsid: stillingsData.stilling.uuid,
    eierNavident: brukerData.ident,
    eierNavn: brukerData.navn,
  };

  const kanOvertaStilling = !erFormidling && erDirektemeldt && !erEier;

  const harStillingsinfo = stillingsData.stillingsinfo !== null;
  const opprettetAvRekrutteringsbistand =
    stillingsData.stilling.createdBy === 'pam-rekrutteringsbistand';

  const kanOppretteKandidatliste =
    !harStillingsinfo &&
    !erEier &&
    !opprettetAvRekrutteringsbistand &&
    stillingsData.stilling.employer?.orgnr;

  const onOpprettKandidatliste = async () => {
    await setStillingsinfo(opprettStillingInfo).then(() =>
      window.location.reload(),
    );
  };

  const onOvertaStilling = async () => {
    setLoading(true);
    await oppdaterStilling({
      ...stillingsData,
      stillingsinfo: {
        ...stillingsData.stillingsinfo,
        eierNavident: brukerData.ident,
        eierNavn: brukerData.navn,
      },
      stilling: {
        ...stillingsData.stilling,
        administration: {
          ...stillingsData.stilling.administration,
          navIdent: brukerData.ident,
          reportee: brukerData.navn,
        },
      },
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

      {kanOppretteKandidatliste && (
        <Button
          loading={loading}
          variant='primary'
          size='small'
          className='my-2 h-5 w-full'
          onClick={onOpprettKandidatliste}
        >
          Opprett kandidatliste
        </Button>
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
