'use client';
import { EyeIcon, StopIcon, TrashIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button, Stepper } from '@navikt/ds-react';
import { useParams, useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { StillingsDataDTO } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import OmStillingen from '../omStillingen/OmStillingen';
import { useStillingsContext } from '../StillingsContext';
import { RedigerInnspurt } from './components/RedigerInnspurt';
import { RedigerOmStillingen } from './components/RedigerOmStillingen';
import { RedigerOmTilrettelegging } from './components/RedigerOmTilrettelegging';
import { RedigerOmVirksomheten } from './components/RedigerOmVirksomheten';
import { RedigerPraktiskInfo } from './components/RedigerPraktiskInfo';

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

  const { getValues } = useFormContext<StillingsDataDTO>();

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

  const validerOmVirksomheten = (): boolean => {
    const verdier = getValues();
    const kontaktliste =
      verdier?.stilling?.contactList &&
      verdier?.stilling?.contactList?.length > 0;
    return !!kontaktliste;
  };

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
              onClick={() => setForhåndsvisData(getValues())}
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
    </>
  );
};

export default RedigerStilling;
