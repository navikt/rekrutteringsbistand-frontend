'use client';

import { useStillingsContext } from '../StillingsContext';
import OmStillingen from '../omStillingen/OmStillingen';
import AksjonsknapperSiderbarStilling from './components/AksjonsknapperSiderbarStilling';
import { RedigerInnspurt } from './components/RedigerInnspurt';
import { RedigerOmStillingen } from './components/RedigerOmStillingen';
import { RedigerOmTilrettelegging } from './components/RedigerOmTilrettelegging';
import { RedigerOmVirksomheten } from './components/RedigerOmVirksomheten';
import { RedigerPraktiskInfo } from './components/RedigerPraktiskInfo';
import {
  InnspurtSchema,
  OmStillingenSchema,
  OmTilretteleggingSchema,
  OmVirksomhetenSchema,
  PraktiskInfoSchema,
  StillingsDataForm,
} from './redigerFormType.zod';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, Stepper } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

enum RedigerSteg {
  omVirksomheten = 'om-virksomheten',
  omTilrettelegging = 'om-tilrettelegging',
  omStillingen = 'om-stillingen',
  praktiskInfo = 'praktisk-info',
  innspurt = 'innspurt',
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
  const { setForhåndsvisData, forhåndsvisData } = useStillingsContext();

  const { getValues } = useFormContext<StillingsDataForm>();
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

  const validerOmVirksomheten = () => {
    const valider = OmVirksomhetenSchema.safeParse(getValues().omVirksomheten);
    return valider.success;
  };
  const validerOmTilrettelegging = () => {
    const valider = OmTilretteleggingSchema.safeParse(
      getValues().omTilrettelegging,
    );
    return valider.success;
  };
  const validerOmStillingen = () => {
    const valider = OmStillingenSchema.safeParse(getValues().omStillingen);
    return valider.success;
  };
  const validerPraktiskInfo = () => {
    const valider = PraktiskInfoSchema.safeParse(getValues().praktiskInfo);
    return valider.success;
  };
  const validerInnspurt = () => {
    const valider = InnspurtSchema.safeParse(getValues().innspurt);

    return valider.success;
  };

  validerOmVirksomheten();

  return (
    <>
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

          <OmStillingen forhåndsvisData={forhåndsvisData !== null} />
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
              <Stepper.Step
                completed={validerOmVirksomheten()}
                interactive={validerOmVirksomheten()}
              >
                Om virksomheten
              </Stepper.Step>
              <Stepper.Step
                completed={validerOmTilrettelegging()}
                interactive={
                  validerOmVirksomheten() && validerOmTilrettelegging()
                }
              >
                Om tilrettelegging
              </Stepper.Step>
              <Stepper.Step
                completed={validerOmStillingen()}
                interactive={
                  validerOmVirksomheten() &&
                  validerOmTilrettelegging() &&
                  validerOmStillingen()
                }
              >
                Om stillingen
              </Stepper.Step>
              <Stepper.Step
                completed={validerPraktiskInfo()}
                interactive={
                  validerOmVirksomheten() &&
                  validerOmTilrettelegging() &&
                  validerOmStillingen() &&
                  validerPraktiskInfo()
                }
              >
                Praktisk info
              </Stepper.Step>
              <Stepper.Step
                completed={validerInnspurt()}
                interactive={
                  validerOmVirksomheten() &&
                  validerOmTilrettelegging() &&
                  validerOmStillingen() &&
                  validerPraktiskInfo() &&
                  validerInnspurt()
                }
              >
                Publisering
              </Stepper.Step>
            </Stepper>
          </div>
          <div className='mx-12 flex-grow px-12'>
            {aktivtSteg === RedigerSteg.omVirksomheten && (
              <RedigerOmVirksomheten
                stegNummer={1}
                nextStep={nesteSteg}
                forrigeSteg={forrigeSteg}
              />
            )}
            {aktivtSteg === RedigerSteg.omTilrettelegging && (
              <RedigerOmTilrettelegging
                omTilretteleggingFelt='omTilrettelegging'
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
            {aktivtSteg === RedigerSteg.innspurt && (
              <RedigerInnspurt stegNummer={5} forrigeSteg={forrigeSteg} />
            )}
          </div>
          <AksjonsknapperSiderbarStilling formVerdier={getValues()} />
        </div>
      )}
    </>
  );
};

export default RedigerStilling;
