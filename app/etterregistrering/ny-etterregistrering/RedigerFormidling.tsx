import { RedigerOmTilrettelegging } from '../../stilling/[stillingsId]/rediger/components/RedigerOmTilrettelegging';
import { OmTilretteleggingSchema } from '../../stilling/[stillingsId]/rediger/redigerFormType.zod';
import FormidlingInnspurt from './components/FormidlingInnspurt';
import FormidlingLeggTilKandidat from './components/FormidlingLeggTilKandidat';
import FormidlingOmStillingen from './components/RedigerOmFormidlingen';
import {
  FormidlingDataForm,
  OmFormidlingSchema,
  OmKandidateneSchema,
} from './redigerFormidlingFormType';
import { TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, Stepper } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

enum RedigerFormidlingSteg {
  omKandidatene = 'om-kandidatene',
  omFormidlingen = 'om-formidlingen',
  omTilrettelegging = 'om-tilrettelegging',
  innspurt = 'innspurt',
}

const RedigerFormidling: React.FC = () => {
  const { getValues } = useFormContext<FormidlingDataForm>();

  const router = useRouter();
  const [aktivtSteg, setAktivtSteg] = useQueryState('steg', {
    defaultValue: RedigerFormidlingSteg.omKandidatene,
    history: 'push',
  });

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [aktivtSteg]);

  const stegNummer = (): number => {
    const steps = Object.values(RedigerFormidlingSteg);
    const index = steps.indexOf(aktivtSteg as RedigerFormidlingSteg);
    return index;
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

  const validerOmKandidatene = () => {
    const valider = OmKandidateneSchema.safeParse(getValues().omKandidatene);
    return valider.success;
  };
  const validerOmFormidlingen = () => {
    const valider = OmFormidlingSchema.safeParse(getValues().omFormidlingen);
    return valider.success;
  };
  const validerOmTilrettelegging = () => {
    const valider = OmTilretteleggingSchema.safeParse(
      getValues().omTilrettelegging,
    );
    return valider.success;
  };

  return (
    <Box>
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
            <Stepper.Step
              completed={validerOmKandidatene()}
              interactive={validerOmKandidatene()}
            >
              Om kandidatene
            </Stepper.Step>
            <Stepper.Step
              completed={validerOmFormidlingen()}
              interactive={validerOmKandidatene()}
            >
              Om formidlingen
            </Stepper.Step>
            <Stepper.Step
              completed={validerOmTilrettelegging()}
              interactive={validerOmFormidlingen()}
            >
              Om inkludering
            </Stepper.Step>
            <Stepper.Step
              interactive={
                validerOmKandidatene() &&
                validerOmFormidlingen() &&
                validerOmTilrettelegging()
              }
            >
              Innspurt
            </Stepper.Step>
          </Stepper>
        </div>
        <div className='mx-12 flex-grow px-12'>
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
              omTilretteleggingFelt='omTilrettelegging'
              stegNummer={2}
              nextStep={nesteSteg}
              forrigeSteg={forrigeSteg}
            />
          )}
          {aktivtSteg === RedigerFormidlingSteg.innspurt && (
            <FormidlingInnspurt />
          )}
        </div>
        <div className='self-top sticky bottom-4'>
          <Button
            onClick={() => router.push('/etterregistrering')}
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
