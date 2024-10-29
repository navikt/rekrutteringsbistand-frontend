'use client';
import { EyeIcon, StopIcon, TrashIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button, Stepper } from '@navikt/ds-react';
import { useParams, useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { StillingsStatus } from '../../stilling-typer';
import OmStillingen from '../omStillingen/OmStillingen';
import { useStillingsContext } from '../StillingsContext';
import EndreStillingStatus from './components/EndreStillingStatus';
import {
  InnspurtSchema,
  OmStillingenSchema,
  OmTilretteleggingSchema,
  OmVirksomhetenSchema,
  PraktiskInfoSchema,
  StillingsDataForm,
} from './redigerFormType.zod';
import { RedigerInnspurt } from './RedigerInnspurt';
import { RedigerOmStillingen } from './RedigerOmStillingen';
import { RedigerOmTilrettelegging } from './RedigerOmTilrettelegging';
import { RedigerOmVirksomheten } from './RedigerOmVirksomheten';
import { RedigerPraktiskInfo } from './RedigerPraktiskInfo';
import { mapFormTilStilling } from './redigerUtil';

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
  const { stillingsData } = useStillingsContext();
  const router = useRouter();
  const params = useParams();

  const onLukk = () => {
    const newPath = `/stilling/${params.slug}`;
    router.push(newPath);
  };

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
    console.log(valider);
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
              <Stepper.Step completed={validerOmVirksomheten()}>
                Om virksomheten
              </Stepper.Step>
              <Stepper.Step completed={validerOmTilrettelegging()}>
                Om tilrettelegging
              </Stepper.Step>
              <Stepper.Step completed={validerOmStillingen()}>
                Om stillingen
              </Stepper.Step>
              <Stepper.Step completed={validerPraktiskInfo()}>
                Praktisk info
              </Stepper.Step>
              <Stepper.Step completed={validerInnspurt()}>
                Publisering
              </Stepper.Step>
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
            {aktivtSteg === RedigerSteg.innspurt && (
              <RedigerInnspurt stegNummer={5} forrigeSteg={forrigeSteg} />
            )}
          </div>
          <div className='sticky top-4 self-start flex flex-col gap-2 items-start'>
            <Button icon={<XMarkIcon />} variant='tertiary' onClick={onLukk}>
              Lukk
            </Button>
            <Button
              icon={<EyeIcon />}
              onClick={() =>
                setForhåndsvisData(
                  mapFormTilStilling(getValues(), stillingsData),
                )
              }
              variant='tertiary'
            >
              Forhåndsvis
            </Button>
            <EndreStillingStatus
              nyStatus={StillingsStatus.Stoppet}
              knappNavn='Stopp'
              knappIkon={<StopIcon />}
              tekst='Er du sikker på at du vil STOPPE stillingen?'
            />
            <EndreStillingStatus
              nyStatus={StillingsStatus.Slettet}
              knappNavn='Slett'
              knappIkon={<TrashIcon />}
              tekst='Er du sikker på at du vil SLETTE stillingen?'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RedigerStilling;
