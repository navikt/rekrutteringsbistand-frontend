'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useStillingsContext } from '../StillingsContext';
import { StillingsDataFormSchema } from './redigerFormType.zod';
import RedigerStilling from './RedigerStilling';
import { mapStillingTilForm } from './redigerUtil';

export default function RedigerSide() {
  const { stillingsData } = useStillingsContext();

  const initialValues = mapStillingTilForm(stillingsData);
  const registerForm = useForm({
    resolver: zodResolver(StillingsDataFormSchema),
    defaultValues: initialValues,
  });
  return (
    <FormProvider {...registerForm}>
      <RedigerStilling />
    </FormProvider>
  );
}
