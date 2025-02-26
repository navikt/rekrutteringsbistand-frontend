import { ErrorMessage, Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import VelgAnsettelsesform from '../../../stilling/[stillingsId]/rediger/components/praktiskInfo/VelgAnsettelsesform';
import VelgArbeidstidsordning from '../../../stilling/[stillingsId]/rediger/components/praktiskInfo/VelgArbeidstidsordning';
import VelgOmfang from '../../../stilling/[stillingsId]/rediger/components/praktiskInfo/VelgOmfang';
import VelgSektor from '../../../stilling/[stillingsId]/rediger/components/praktiskInfo/VelgSektor';
import StegNavigering from '../../../stilling/[stillingsId]/rediger/components/StegNavigering';
import VelgArbeidssted from '../../../stilling/[stillingsId]/rediger/components/VelgArbeidssted';
import VelgStillingTittel from '../../../stilling/[stillingsId]/rediger/components/VelgStillingTittel';
import VelgArbeidsgiver from '../../../stilling/ny-stilling/components/VelgArbeidsgiver';
import { FormidlingDataForm } from '../redigerFormidlingFormType';

export interface RedigerOmFormidlingenProps {
  nesteSteg: () => void;
  forrigeSteg: () => void;
}

const RedigerOmFormidlingen: React.FC<RedigerOmFormidlingenProps> = ({
  nesteSteg,
  forrigeSteg,
}) => {
  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<FormidlingDataForm>();

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger('omFormidlingen', { shouldFocus: true });

    console.log(errors);
    if (isValid) {
      nesteSteg();
    }
  };

  return (
    <form onSubmit={handleStepSubmit}>
      <div className='space-y-8'>
        <Heading size='large'>Om arbeidsgiver</Heading>
        <VelgArbeidsgiver
          arbeidsgiverCallback={(val) =>
            setValue('omFormidlingen.organisasjon', val)
          }
        />
        {errors.omFormidlingen?.organisasjon && (
          <ErrorMessage>
            {errors.omFormidlingen?.organisasjon?.message}
          </ErrorMessage>
        )}
        <Heading size='large'>Om stillingen</Heading>
        <VelgStillingTittel
          categoryList={watch('omFormidlingen.categoryList')}
          callBack={(val) => setValue('omFormidlingen.categoryList', val)}
          error={errors.omFormidlingen?.categoryList?.message}
        />

        <VelgSektor sektorFelt='omFormidlingen.sektor' />
        <div className='flex flex-row gap-x-8'>
          <VelgAnsettelsesform ansettelsesformFelt='omFormidlingen.ansettelsesform' />
          <VelgArbeidstidsordning arbeidstidsordningFelt='omFormidlingen.arbeidstidsordning' />
        </div>
        <VelgOmfang
          omfangFelt='omFormidlingen.omfangKode'
          omfangProsentFelt='omFormidlingen.omfangProsent'
        />
        <VelgArbeidssted feltNavn='omFormidlingen' />
        {errors.omFormidlingen?.adresser && (
          <ErrorMessage>
            {errors.omFormidlingen?.adresser?.message}
          </ErrorMessage>
        )}
        <StegNavigering stegNummer={2} forrigeSteg={forrigeSteg} />
      </div>
    </form>
  );
};

export default RedigerOmFormidlingen;
