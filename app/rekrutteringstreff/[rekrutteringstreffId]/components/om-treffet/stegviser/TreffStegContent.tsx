import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import AvslutteSteg from './steg/AvslutteSteg';
import FølgeOppSteg from './steg/FølgeOppSteg';
import InvitereSteg from './steg/InvitereSteg';
import PublisereSteg from './steg/PublisereSteg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { Box, Stepper } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import * as React from 'react';

interface Props {
  stepsForStepper: string[];
  setAlleSteg1Ok: (erOk: boolean) => void;
  setHarInvitert: (harInvitert: boolean) => void;
}

const commonBoxProps = {
  background: 'raised' as const,
  borderColor: 'neutral-subtleA' as const,
  borderWidth: '1' as const,
  padding: '6' as const,
};

const TreffStegContent: React.FC<Props> = ({
  stepsForStepper,
  setAlleSteg1Ok,
  setHarInvitert,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: rekrutteringstreffData } =
    useRekrutteringstreff(rekrutteringstreffId);

  const activeStep = React.useMemo(() => {
    const hendelser = rekrutteringstreffData?.hendelser;
    if (!hendelser) return 1;

    const harHendelse = (type: string) =>
      hendelser.some((h) => h.hendelsestype === type);

    if (harHendelse('AVSLUTT') || harHendelse('AVSLUTT_OPPFØLGING')) {
      return 4;
    }
    if (harHendelse('AVSLUTT_INVITASJON')) {
      return 3;
    }
    if (harHendelse('PUBLISER')) {
      return 2;
    }
    return 1;
  }, [rekrutteringstreffData]);

  const harAvsluttet = React.useMemo(
    () =>
      rekrutteringstreffData?.hendelser?.some(
        (h) => h.hendelsestype === 'AVSLUTT',
      ) ?? false,
    [rekrutteringstreffData],
  );

  const arrangementtidspunktHarPassert = React.useMemo(() => {
    if (!rekrutteringstreffData?.fraTid) return false;
    return (
      toZonedTime(parseISO(rekrutteringstreffData.fraTid), 'Europe/Oslo') <
      new Date()
    );
  }, [rekrutteringstreffData?.fraTid]);

  return (
    <Box.New
      {...commonBoxProps}
      className='rounded-b-xl border-t-0'
      role='region'
    >
      <div className='flex flex-row gap-16'>
        <Stepper
          activeStep={activeStep}
          orientation='vertical'
          interactive={false}
          className='w-40'
        >
          {stepsForStepper.map((label, i) => (
            <Stepper.Step key={i + 1} completed={i < activeStep - 1}>
              {label}
            </Stepper.Step>
          ))}
        </Stepper>
        {activeStep === 1 && (
          <PublisereSteg onAlleStegOkChange={setAlleSteg1Ok} />
        )}
        {activeStep === 2 && (
          <InvitereSteg
            erDatoPassert={arrangementtidspunktHarPassert}
            onHarInvitertChange={setHarInvitert}
          />
        )}
        {activeStep === 3 && <FølgeOppSteg />}
        {activeStep === 4 && <AvslutteSteg harAvsluttet={harAvsluttet} />}
      </div>
    </Box.New>
  );
};

export default TreffStegContent;
