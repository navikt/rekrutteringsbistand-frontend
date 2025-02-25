import { TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, Stepper } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { RedigerOmTilrettelegging } from '../../stilling/[stillingsId]/rediger/components/RedigerOmTilrettelegging';
import FormidlingInnspurt from './components/FormidlingInnspurt';
import FormidlingLeggTilKandidat from './components/FormidlingLeggTilKandidat';
import FormidlingOmStillingen from './components/RedigerOmFormidlingen';

enum RedigerFormidlingSteg {
  omKandidatene = 'om-kandidatene',
  omFormidlingen = 'om-formidlingen',
  omTilrettelegging = 'om-tilrettelegging',
  innspurt = 'innspurt',
}

const RedigerFormidling: React.FC = () => {
  const [aktivtSteg, setAktivtSteg] = useQueryState('steg', {
    defaultValue: RedigerFormidlingSteg.omKandidatene,
  });

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
