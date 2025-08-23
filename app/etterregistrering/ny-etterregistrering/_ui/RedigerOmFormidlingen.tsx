import { FormidlingDataForm } from '@/app/etterregistrering/ny-etterregistrering/redigerFormidlingFormType';
import OppsummerValidering from '@/app/stilling/[stillingsId]/rediger/_ui/OppsummerValidering';
import StegNavigering from '@/app/stilling/[stillingsId]/rediger/_ui/StegNavigering';
import VelgArbeidssted from '@/app/stilling/[stillingsId]/rediger/_ui/VelgArbeidssted';
import VelgStillingTittel from '@/app/stilling/[stillingsId]/rediger/_ui/VelgStillingTittel';
import VelgAnsettelsesform from '@/app/stilling/[stillingsId]/rediger/_ui/praktiskInfo/VelgAnsettelsesform';
import VelgArbeidstidsordning from '@/app/stilling/[stillingsId]/rediger/_ui/praktiskInfo/VelgArbeidstidsordning';
import VelgOmfang from '@/app/stilling/[stillingsId]/rediger/_ui/praktiskInfo/VelgOmfang';
import VelgSektor from '@/app/stilling/[stillingsId]/rediger/_ui/praktiskInfo/VelgSektor';
import VelgArbeidsgiver from '@/app/stilling/ny-stilling/_ui/VelgArbeidsgiver';
import { arbeidsgiverLokasjonTilLokasjon } from '@/app/stilling/stilling.util';
import { ErrorMessage, Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

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
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<FormidlingDataForm>();

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger('omFormidlingen', { shouldFocus: true });

    if (isValid) {
      nesteSteg();
    }
  };

  return (
    <form onSubmit={handleStepSubmit}>
      <div className='space-y-8'>
        <Heading size='large'>Om arbeidsgiver</Heading>
        <div id='omFormidlingen.organisasjon' tabIndex={-1}>
          <VelgArbeidsgiver
            valgtArbeidsgiver={getValues('omFormidlingen.organisasjon')}
            arbeidsgiverCallback={(val) => {
              setValue('omFormidlingen.organisasjon', val);
              if (getValues('omFormidlingen.adresser')?.length === 0) {
                const mapLokasjon = arbeidsgiverLokasjonTilLokasjon(
                  val.adresse,
                );
                const lokasjoner = getValues('omFormidlingen.lokasjoner') ?? [];
                setValue('omFormidlingen.adresser', [
                  mapLokasjon,
                  ...lokasjoner,
                ]);
              }
            }}
          />
        </div>
        {errors.omFormidlingen?.organisasjon && (
          <ErrorMessage>
            {errors.omFormidlingen?.organisasjon?.message}
          </ErrorMessage>
        )}

        <Heading size='large'>Om stillingen</Heading>
        <div id='omFormidlingen.categoryList' tabIndex={-1}>
          <VelgStillingTittel
            categoryList={watch('omFormidlingen.categoryList')}
            callBack={(val) => setValue('omFormidlingen.categoryList', val)}
            error={errors.omFormidlingen?.categoryList?.message}
          />
        </div>

        <div id='omFormidlingen.sektor' tabIndex={-1}>
          <VelgSektor sektorFelt='omFormidlingen.sektor' />
        </div>

        <div className='flex flex-row gap-x-8'>
          <div id='omFormidlingen.ansettelsesform' tabIndex={-1}>
            <VelgAnsettelsesform ansettelsesformFelt='omFormidlingen.ansettelsesform' />
          </div>
          <div id='omFormidlingen.arbeidstidsordning' tabIndex={-1}>
            <VelgArbeidstidsordning arbeidstidsordningFelt='omFormidlingen.arbeidstidsordning' />
          </div>
        </div>

        {/* Ankre for begge feltene i VelgOmfang */}
        <div id='omFormidlingen.omfangKode' tabIndex={-1} />
        <div id='omFormidlingen.omfangProsent' tabIndex={-1} />
        <VelgOmfang
          omfangFelt='omFormidlingen.omfangKode'
          omfangProsentFelt='omFormidlingen.omfangProsent'
        />

        {/* Ankre for arbeidssted-seksjonen */}
        <div id='omFormidlingen.adresser' tabIndex={-1}>
          <VelgArbeidssted feltNavn='omFormidlingen' />
        </div>

        <OppsummerValidering feltNavn='omFormidlingen' />
        <StegNavigering stegNummer={2} forrigeSteg={forrigeSteg} />
      </div>
    </form>
  );
};

export default RedigerOmFormidlingen;
