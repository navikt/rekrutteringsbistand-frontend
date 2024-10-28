'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { useStillingsContext } from '../StillingsContext';
import RedigerStilling from './RedigerStilling';
import { mapStillingTilForm, StillingsDataForm } from './redigerUtil';

export default function RedigerSide() {
  const { stillingsData } = useStillingsContext();

  const initialValues = mapStillingTilForm(stillingsData);
  const registerForm = useForm<StillingsDataForm>({
    defaultValues: initialValues,
  });
  return (
    <FormProvider {...registerForm}>
      <RedigerStilling />
    </FormProvider>
  );
}
