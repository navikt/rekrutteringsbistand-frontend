import { TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, Stepper } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { oppdaterStilling } from '../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useVisVarsling } from '../../../components/varsling/Varsling';
import { useStillingsContext } from '../../../stilling/[stillingsId]/StillingsContext';
import { RedigerOmTilrettelegging } from '../../../stilling/[stillingsId]/rediger/components/RedigerOmTilrettelegging';
import { mapFormTilStilling } from '../../../stilling/[stillingsId]/rediger/mapStilling';
import { StillingsDataForm } from '../../../stilling/[stillingsId]/rediger/redigerFormType.zod';
import FormidlingInnspurt from './components/FormidlingInnspurt';
import FormidlingLeggTilKandidat from './components/FormidlingLeggTilKandidat';
import FormidlingOmStillingen from './components/RedigerOmFormidlingen';

export interface RedigerFormidlingProps {
  children?: React.ReactNode | undefined;
}

enum RedigerFormidlingSteg {
  omKandidatene = 'om-kandidatene',
  omFormidlingen = 'om-formidlingen',
  omTilrettelegging = 'om-tilrettelegging',
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

  const nesteSteg = () => {
    const steps = Object.values(RedigerFormidlingSteg);
    const currentIndex =
      steps.indexOf(aktivtSteg as RedigerFormidlingSteg) ??
      RedigerFormidlingSteg.omKandidatene;
    if (currentIndex < steps.length) {
      setAktivtSteg(steps[currentIndex + 1]);
    }
  };

  const forrigeSteg = () => {
    const steps = Object.values(RedigerFormidlingSteg);
    const currentIndex =
      steps.indexOf(aktivtSteg as RedigerFormidlingSteg) ??
      RedigerFormidlingSteg.omKandidatene;
    if (currentIndex && currentIndex > 0) {
      setAktivtSteg(steps[currentIndex - 1]);
    }
  };

  return (
    <Box>
      {/* Header */}

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
            <Stepper.Step>Om kandidatene</Stepper.Step>
            <Stepper.Step> Om formidlingen</Stepper.Step>
            <Stepper.Step>Om inkludering</Stepper.Step>
            <Stepper.Step>Innspurt</Stepper.Step>
          </Stepper>
        </div>
        <div className='flex-grow mx-12 px-12'>
          {aktivtSteg === RedigerFormidlingSteg.omKandidatene && (
            <FormidlingLeggTilKandidat
              nesteSteg={nesteSteg}
              forrigeSteg={forrigeSteg}
            />
          )}
          {aktivtSteg === RedigerFormidlingSteg.omFormidlingen && (
            <FormidlingOmStillingen
              nesteSteg={nesteSteg}
              forrigeSteg={forrigeSteg}
            />
          )}
          {aktivtSteg === RedigerFormidlingSteg.omTilrettelegging && (
            <RedigerOmTilrettelegging
              omTilretteleggingFelt='omStillingen.omTilrettelegging'
              stegNummer={2}
              nextStep={nesteSteg}
              forrigeSteg={forrigeSteg}
            />
          )}
          {aktivtSteg === RedigerFormidlingSteg.innspurt && (
            <FormidlingInnspurt />
          )}
        </div>
        <div className='sticky bottom-4 self-top'>
          <Button
            disabled
            variant='tertiary'
            icon={<TrashIcon aria-hidden />}
            iconPosition='left'
            size='small'
          >
            Avbryt og slett
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default RedigerFormidling;
