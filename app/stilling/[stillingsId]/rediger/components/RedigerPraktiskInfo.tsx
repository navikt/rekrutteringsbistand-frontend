import { BodyShort, Heading } from '@navikt/ds-react';
import { useFormContext } from 'react-hook-form';
import { StillingsDataForm } from '../redigerFormType.zod';
import StegNavigering from './StegNavigering';
import VelgAnsettelsesform from './praktiskInfo/VelgAnsettelsesform';
import VelgAntallStillinger from './praktiskInfo/VelgAntallStillinger';
import VelgArbeidsTid from './praktiskInfo/VelgArbeidsTid';
import VelgArbeidstidsordning from './praktiskInfo/VelgArbeidstidsordning';
import VelgOmfang from './praktiskInfo/VelgOmfang';
import VelgOppstartOgFrist from './praktiskInfo/VelgOppstartOgFrist';
import VelgSektor from './praktiskInfo/VelgSektor';

export const RedigerPraktiskInfo: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const {
    trigger,
    watch,
    formState: { errors },
  } = useFormContext<StillingsDataForm>();

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Log current form state and errors
    console.log('Current form state:', watch());
    console.log('Current errors:', errors);

    const isValid = await trigger('praktiskInfo', { shouldFocus: true });

    if (!isValid) {
      console.log('Validation failed. Errors:', errors.praktiskInfo);
    }

    if (isValid) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleStepSubmit}>
      <div className='flex flex-col gap-y-8'>
        <Heading size='large'>Praktisk info</Heading>
        <BodyShort>Fyll inn praktiske detaljer om jobben.</BodyShort>
        <VelgSektor sektorFelt='praktiskInfo.sektor' />
        <VelgAntallStillinger />
        <VelgOmfang
          omfangFelt='praktiskInfo.omfangKode'
          omfangProsentFelt='praktiskInfo.omfangProsent'
        />
        <VelgAnsettelsesform ansettelsesformFelt='praktiskInfo.ansettelsesform' />
        <VelgArbeidstidsordning arbeidstidsordningFelt='praktiskInfo.arbeidstidsordning' />
        <VelgArbeidsTid />
        <VelgOppstartOgFrist />
        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </div>
    </form>
  );
};
