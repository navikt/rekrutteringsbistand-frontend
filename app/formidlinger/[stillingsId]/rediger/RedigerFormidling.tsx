import { Box, Heading, Stepper } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { oppdaterStilling } from '../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useVisVarsling } from '../../../components/varsling/Varsling';
import { useStillingsContext } from '../../../stilling/[stillingsId]/StillingsContext';
import { mapFormTilStilling } from '../../../stilling/[stillingsId]/rediger/mapStilling';
import { StillingsDataForm } from '../../../stilling/[stillingsId]/rediger/redigerFormType.zod';
import FormidlingLeggTilKandidat from './components/FormidlingLeggTilKandidat';

export interface RedigerFormidlingProps {
  children?: React.ReactNode | undefined;
}

enum RedigerFormidlingSteg {
  omKandidatene = 'om-kandidatene',
  omArbeidsgiveren = 'om-arbeidsgiveren',
  dinInkludering = 'din-inkludering',
  innspurt = 'innspurt',
}

const RedigerFormidling: React.FC<RedigerFormidlingProps> = ({ children }) => {
  const { getValues, setValue, watch } = useFormContext<StillingsDataForm>();
  const { stillingsData, refetch } = useStillingsContext();
  const [loading, setLoading] = useState(false);
  const visVarsling = useVisVarsling();
  const router = useRouter();

  const [aktivtSteg, setAktivtSteg] = useQueryState('steg', {
    defaultValue: RedigerFormidlingSteg.omKandidatene,
  });

  const stegNummer = (): number => {
    const steps = Object.values(RedigerFormidlingSteg);
    const index = steps.indexOf(aktivtSteg as RedigerFormidlingSteg);
    return index;
  };

  const lagreFormidling = async () => {
    setLoading(true);
    const nyStillingsData = mapFormTilStilling(getValues(), stillingsData);
    try {
      await oppdaterStilling(nyStillingsData);

      visVarsling({
        innhold: 'Formidling ble lagret, åpner formidling.',
        alertType: 'success',
      });
      refetch();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      router.push(`/stilling/${stillingsData.stilling.uuid}`);
    } catch (error) {
      visVarsling({
        innhold: 'Feil ved lagring av formidling',
        alertType: 'error',
      });
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box className='flex items-center gap-4 mb-8'>
        <div className='w-8 h-8'>{/* Your icon component */}</div>
        <Heading size='large'>Etterregistrer formidling</Heading>
      </Box>
      <div className='flex flex-row'>
        <div className='sticky top-4 self-start'>
          <Stepper
            activeStep={stegNummer() + 1}
            onStepChange={(step) => {
              setAktivtSteg(Object.values(RedigerFormidlingSteg)[step - 1]);
            }}
            orientation='vertical'
            className='mb-8'
          >
            <Stepper.Step completed>Om kandidatene</Stepper.Step>
            <Stepper.Step> Om arbeidsgiveren</Stepper.Step>
            <Stepper.Step>Din inkludering</Stepper.Step>
            <Stepper.Step>Innspurt</Stepper.Step>
          </Stepper>
        </div>
        <div className='flex-grow mx-12 px-12'>
          {aktivtSteg === RedigerFormidlingSteg.omKandidatene && (
            <FormidlingLeggTilKandidat />
          )}
        </div>
        <div> avslutt </div>
      </div>
    </Box>
  );
  // return (
  //   <div className='flex flex-col mx-12 px-12 gap-8 w-[80%]'>
  //     <Heading size='medium'>
  //       Etterregistrer formidling for{' '}
  //       {capitalizeEmployerName(stillingsData.stilling.businessName ?? '-')}(
  //       {stillingsData.stilling?.employer?.orgnr})
  //     </Heading>

  //     <VelgStillingTittel
  //       valgtJanzz={watch('omStillingen.janzz')}
  //       callBack={(val) => setValue('omStillingen.janzz', val)}
  //     />
  //     <div>
  //       <Heading size='medium'>Arbeidssted</Heading>
  //       <VelgArbeidssted />
  //     </div>
  //     <VelgSektor />
  //     <VelgAntallStillinger />
  //     <VelgAnsettelsesform />
  //     <VelgOppstartOgFrist skjulFrist />
  //     <VelgArbeidsTid />
  //     <Button onClick={lagreFormidling} loading={loading}>
  //       Etterregistrer formidling
  //     </Button>
  //   </div>
  // );
};

export default RedigerFormidling;
