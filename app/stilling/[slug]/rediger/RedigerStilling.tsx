'use client';
import { EyeIcon, StopIcon, TrashIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button, Stepper } from '@navikt/ds-react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { stillingsDataDTO } from '../../stilling-typer';
import OmStillingen from '../omStillingen/OmStillingen';
import { useStillingsContext } from '../StillingsContext';
import { RedigerOmStillingen } from './components/RedigerOmStillingen';
import { RedigerOmTilrettelegging } from './components/RedigerOmTilrettelegging';
import { RedigerOmVirksomheten } from './components/RedigerOmVirksomheten';
import { RedigerPraktiskInfo } from './components/RedigerPraktiskInfo';
import { RedigerPublisering } from './components/RedigerPublisering';

enum Steg {
  omVirksomheten = 1,
  omTilrettelegging = 2,
  omStillingen = 3,
  praktiskInfo = 4,
  publisering = 5,
}

const stegTitler: Record<Steg, string> = {
  [Steg.omVirksomheten]: 'Om virksomheten',
  [Steg.omTilrettelegging]: 'Om tilrettelegging',
  [Steg.omStillingen]: 'Om stillingen',
  [Steg.praktiskInfo]: 'Praktisk info',
  [Steg.publisering]: 'Publisering',
};

const RedigerStilling: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(Steg.omVirksomheten);
  const { stillingsData, setForhåndsvisData, forhåndsvisData } =
    useStillingsContext();
  const registerForm = useForm<stillingsDataDTO>({
    defaultValues: stillingsData,
  });

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };
  const forrigeSteg = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <FormProvider {...registerForm}>
      {forhåndsvisData ? (
        <>
          <Button
            className='w-full'
            icon={<XMarkIcon />}
            onClick={() => setForhåndsvisData(null)}
            variant='primary'
          >
            Avslutt forhåndsvisning
          </Button>

          <OmStillingen />
        </>
      ) : (
        <div className='flex flex-row'>
          <div className='sticky top-4 self-start'>
            <Stepper
              onStepChange={setActiveStep}
              aria-labelledby='stepper-heading'
              activeStep={activeStep}
            >
              {Object.values(Steg)
                .filter((step): step is Steg => typeof step === 'number')
                .map((step) => (
                  <Stepper.Step
                    key={step}
                    interactive={registerForm.formState.isValid}
                  >
                    {stegTitler[step]}
                  </Stepper.Step>
                ))}
            </Stepper>
          </div>

          <div className='flex-grow mx-12 px-12'>
            {activeStep === Steg.omVirksomheten && (
              <RedigerOmVirksomheten
                stegNummer={Steg.omVirksomheten}
                nextStep={nextStep}
                forrigeSteg={forrigeSteg}
              />
            )}
            {activeStep === Steg.omTilrettelegging && (
              <RedigerOmTilrettelegging
                stegNummer={Steg.omTilrettelegging}
                nextStep={nextStep}
                forrigeSteg={forrigeSteg}
              />
            )}
            {activeStep === Steg.omStillingen && (
              <RedigerOmStillingen
                stegNummer={Steg.omStillingen}
                nextStep={nextStep}
                forrigeSteg={forrigeSteg}
              />
            )}
            {activeStep === Steg.praktiskInfo && (
              <RedigerPraktiskInfo
                stegNummer={Steg.praktiskInfo}
                nextStep={nextStep}
                forrigeSteg={forrigeSteg}
              />
            )}
            {activeStep === Steg.publisering && <RedigerPublisering />}
          </div>
          <div className='sticky top-4 self-start flex flex-col gap-2 items-start'>
            <Button icon={<XMarkIcon />} variant='tertiary' disabled>
              Avbryt
            </Button>
            <Button
              icon={<EyeIcon />}
              onClick={() => setForhåndsvisData(registerForm.getValues())}
              variant='tertiary'
            >
              Forhåndsvis
            </Button>
            <Button icon={<StopIcon />} variant='tertiary' disabled>
              Stopp
            </Button>
            <Button icon={<TrashIcon />} variant='tertiary' disabled>
              Slett
            </Button>
          </div>
        </div>
      )}
    </FormProvider>
  );
};

export default RedigerStilling;
