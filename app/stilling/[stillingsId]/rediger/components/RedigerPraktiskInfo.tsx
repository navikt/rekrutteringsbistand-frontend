import { StillingsDataForm } from '../redigerFormType.zod';
import OppsummerValidering from './OppsummerValidering';
import StegNavigering from './StegNavigering';
import VelgAnsettelsesform from './praktiskInfo/VelgAnsettelsesform';
import VelgAntallStillinger from './praktiskInfo/VelgAntallStillinger';
import VelgArbeidsTid from './praktiskInfo/VelgArbeidsTid';
import VelgArbeidstidsordning from './praktiskInfo/VelgArbeidstidsordning';
import VelgOmfang from './praktiskInfo/VelgOmfang';
import VelgOppstartOgFrist from './praktiskInfo/VelgOppstartOgFrist';
import VelgSektor from './praktiskInfo/VelgSektor';
import { BodyShort, Heading } from '@navikt/ds-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const RedigerPraktiskInfo: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { trigger } = useFormContext<StillingsDataForm>();
  const [oppsummerValidering, setOppsummerValidering] =
    useState<boolean>(false);

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await trigger('praktiskInfo', { shouldFocus: true });
    setOppsummerValidering(!isValid);
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
        {oppsummerValidering && (
          <OppsummerValidering feltNavn='omVirksomheten' />
        )}
        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </div>
    </form>
  );
};
