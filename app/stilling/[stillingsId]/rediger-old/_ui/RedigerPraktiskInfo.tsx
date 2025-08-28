import OppsummerValidering from './OppsummerValidering';
import StegNavigering from './StegNavigering';
import VelgAnsettelsesform from './praktiskInfo/VelgAnsettelsesform';
import VelgAntallStillinger from './praktiskInfo/VelgAntallStillinger';
import VelgArbeidsTid from './praktiskInfo/VelgArbeidsTid';
import VelgArbeidstidsordning from './praktiskInfo/VelgArbeidstidsordning';
import VelgOmfang from './praktiskInfo/VelgOmfang';
import VelgOppstartOgFrist from './praktiskInfo/VelgOppstartOgFrist';
import VelgSektor from './praktiskInfo/VelgSektor';
import { StillingsDataForm } from '@/app/stilling/[stillingsId]/rediger-old/redigerFormType.zod';
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
        <div id={`praktiskInfo.sektor`} tabIndex={-1}>
          <VelgSektor sektorFelt='praktiskInfo.sektor' />
        </div>
        <div id={`praktiskInfo.antallStillinger`} tabIndex={-1}>
          <VelgAntallStillinger />
        </div>
        <div id={`praktiskInfo.omfangKode`} tabIndex={-1}>
          <VelgOmfang
            omfangFelt='praktiskInfo.omfangKode'
            omfangProsentFelt='praktiskInfo.omfangProsent'
          />
        </div>
        <div id={`praktiskInfo.ansettelsesform`} tabIndex={-1}>
          <VelgAnsettelsesform ansettelsesformFelt='praktiskInfo.ansettelsesform' />
        </div>
        <div id={`praktiskInfo.arbeidstidsordning`} tabIndex={-1}>
          <VelgArbeidstidsordning arbeidstidsordningFelt='praktiskInfo.arbeidstidsordning' />
        </div>
        <div id={`praktiskInfo.dager`} tabIndex={-1}>
          <div id={`praktiskInfo.tid`} tabIndex={-1}>
            <VelgArbeidsTid />
          </div>
        </div>
        <VelgOppstartOgFrist />
        {oppsummerValidering && <OppsummerValidering feltNavn='praktiskInfo' />}
        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </div>
    </form>
  );
};
