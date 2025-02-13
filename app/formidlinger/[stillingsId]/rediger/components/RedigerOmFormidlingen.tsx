import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import VelgAnsettelsesform from '../../../../stilling/[stillingsId]/rediger/components/praktiskInfo/VelgAnsettelsesform';
import VelgArbeidstidsordning from '../../../../stilling/[stillingsId]/rediger/components/praktiskInfo/VelgArbeidstidsordning';
import VelgOmfang from '../../../../stilling/[stillingsId]/rediger/components/praktiskInfo/VelgOmfang';
import VelgSektor from '../../../../stilling/[stillingsId]/rediger/components/praktiskInfo/VelgSektor';
import StegNavigering from '../../../../stilling/[stillingsId]/rediger/components/StegNavigering';
import VelgArbeidssted from '../../../../stilling/[stillingsId]/rediger/components/VelgArbeidssted';
import VelgStillingTittel from '../../../../stilling/[stillingsId]/rediger/components/VelgStillingTittel';
import { FormidlingDataForm } from '../redigerFormidlingFormType';

export interface RedigerOmFormidlingenProps {
  nesteSteg: () => void;
  forrigeSteg: () => void;
}

const RedigerOmFormidlingen: React.FC<RedigerOmFormidlingenProps> = ({
  nesteSteg,
  forrigeSteg,
}) => {
  const { setValue, watch, trigger, formState } =
    useFormContext<FormidlingDataForm>();

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await trigger('omFormidling', { shouldFocus: true });

    if (isValid) {
      nesteSteg();
    }
  };

  return (
    <form onSubmit={handleStepSubmit}>
      <div className='space-y-8'>
        <Heading size='large'>Om stillingen</Heading>
        <VelgStillingTittel
          categoryList={watch('omFormidling.categoryList')}
          callBack={(val) => setValue('omFormidling.categoryList', val)}
          error={formState.errors.omFormidling?.categoryList?.message}
        />

        <VelgSektor sektorFelt='omFormidling.sektor' />
        <div className='flex flex-row gap-x-8'>
          <VelgAnsettelsesform ansettelsesformFelt='omFormidling.ansettelsesform' />
          <VelgArbeidstidsordning arbeidstidsordningFelt='omFormidling.arbeidstidsordning' />
        </div>
        <VelgOmfang
          omfangFelt='omFormidling.omfangKode'
          omfangProsentFelt='omFormidling.omfangProsent'
        />
        <VelgArbeidssted
          lokasjonsFelt='omFormidling.lokasjoner'
          adresseFelt='omFormidling.adresseLokasjoner'
        />

        <StegNavigering stegNummer={2} forrigeSteg={forrigeSteg} />
      </div>
    </form>
  );
};

export default RedigerOmFormidlingen;
