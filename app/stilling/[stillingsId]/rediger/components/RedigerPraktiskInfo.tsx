import { BodyShort, Heading } from '@navikt/ds-react';
import { useFormContext } from 'react-hook-form';
import { StillingsDataForm } from '../redigerFormType.zod';
import StegNavigering from './StegNavigering';
import VelgAnsettelsesform from './praktiskInfo/VelgAnsettelsesform';
import VelgAntallStillinger from './praktiskInfo/VelgAntallStillinger';
import VelgArbeidsTid from './praktiskInfo/VelgArbeidsTid';
import VelgOmfang from './praktiskInfo/VelgOmfang';
import VelgOppstartOgFrist from './praktiskInfo/VelgOppstartOgFrist';
import VelgSektor from './praktiskInfo/VelgSektor';

export const RedigerPraktiskInfo: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const {
    register,
    setValue,
    watch,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<StillingsDataForm>();

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await trigger('praktiskInfo', { shouldFocus: true });
    console.log('🎺 isValid', isValid);
    console.log('🎺 getValue()', getValues());
    if (isValid) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleStepSubmit}>
      <div className='flex flex-col gap-y-8'>
        <Heading size='large'>Praktisk info</Heading>
        <BodyShort>Fyll inn praktiske detaljer om jobben.</BodyShort>
        <VelgSektor />
        <VelgAntallStillinger />
        <VelgOmfang />
        <VelgAnsettelsesform />

        <VelgArbeidsTid />
        <VelgOppstartOgFrist />
        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </div>
    </form>
  );
};
