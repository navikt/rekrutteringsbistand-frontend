'use client';
import { EyeIcon, StopIcon, TrashIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button, Stepper } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import OmStillingen from '../omStillingen/OmStillingen';
import { useStillingsContext } from '../StillingsContext';
import { RedigerOmStillingen } from './components/RedigerOmStillingen';
import { RedigerOmTilrettelegging } from './components/RedigerOmTilrettelegging';
import { RedigerOmVirksomheten } from './components/RedigerOmVirksomheten';
import { RedigerPraktiskInfo } from './components/RedigerPraktiskInfo';
import { RedigerPublisering } from './components/RedigerPublisering';

enum RedigerSteg {
  omVirksomheten = 'om-virksomheten',
  omTilrettelegging = 'om-tilrettelegging',
  omStillingen = 'om-stillingen',
  praktiskInfo = 'praktisk-info',
  publisering = 'publisering',
}

const RedigerStilling: React.FC = () => {
  const [aktivtSteg, setAktivtSteg] = useQueryState('steg', {
    defaultValue: RedigerSteg.omVirksomheten,
  });

  const stegNummer = (): number => {
    const steps = Object.values(RedigerSteg);
    const index = steps.indexOf(aktivtSteg as RedigerSteg);
    return index;
  };
  const { stillingsData, setForhåndsvisData, forhåndsvisData } =
    useStillingsContext();
  const registerForm = useForm<StillingsDataDTO>({
    defaultValues: {
      stilling: {
        ...stillingsData.stilling,
        properties: {
          ...stillingsData.stilling.properties,
          // Lag array fra string
          tags: stillingsData.stilling.properties?.tags
            ? JSON.parse(stillingsData.stilling.properties.tags)
            : [],
        },
      },
      stillingsinfo: stillingsData.stillingsinfo,
    },
  });

  const nesteSteg = () => {
    const steps = Object.values(RedigerSteg);
    const currentIndex =
      steps.indexOf(aktivtSteg as RedigerSteg) ?? RedigerSteg.omVirksomheten;
    if (currentIndex < steps.length) {
      setAktivtSteg(steps[currentIndex + 1]);
    }
  };

  const forrigeSteg = () => {
    const steps = Object.values(RedigerSteg);
    const currentIndex =
      steps.indexOf(aktivtSteg as RedigerSteg) ?? RedigerSteg.omVirksomheten;
    if (currentIndex && currentIndex > 0) {
      setAktivtSteg(steps[currentIndex - 1]);
    }
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
              onStepChange={(step) => {
                setAktivtSteg(Object.values(RedigerSteg)[step - 1]);
              }}
              aria-labelledby='stepper-heading'
              activeStep={stegNummer() + 1}
            >
              <Stepper.Step>Om virksomheten</Stepper.Step>
              <Stepper.Step>Om tilrettelegging</Stepper.Step>
              <Stepper.Step>Om stillingen</Stepper.Step>
              <Stepper.Step>Praktisk info</Stepper.Step>
              <Stepper.Step>Publisering</Stepper.Step>
            </Stepper>
          </div>
          <div className='flex-grow mx-12 px-12'>
            {aktivtSteg === RedigerSteg.omVirksomheten && (
              <RedigerOmVirksomheten
                stegNummer={1}
                nextStep={nesteSteg}
                forrigeSteg={forrigeSteg}
              />
            )}
            {aktivtSteg === RedigerSteg.omTilrettelegging && (
              <RedigerOmTilrettelegging
                stegNummer={2}
                nextStep={nesteSteg}
                forrigeSteg={forrigeSteg}
              />
            )}
            {aktivtSteg === RedigerSteg.omStillingen && (
              <RedigerOmStillingen
                stegNummer={3}
                nextStep={nesteSteg}
                forrigeSteg={forrigeSteg}
              />
            )}
            {aktivtSteg === RedigerSteg.praktiskInfo && (
              <RedigerPraktiskInfo
                stegNummer={4}
                nextStep={nesteSteg}
                forrigeSteg={forrigeSteg}
              />
            )}
            {aktivtSteg === RedigerSteg.publisering && <RedigerPublisering />}
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
