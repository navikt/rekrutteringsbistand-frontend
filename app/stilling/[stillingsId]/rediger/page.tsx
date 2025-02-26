'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useStillingsContext } from '../StillingsContext';
import { mapStillingTilForm } from './mapStilling';
import { StillingsDataFormSchema } from './redigerFormType.zod';
import RedigerStilling from './RedigerStilling';

export default function RedigerSide() {
  const { stillingsData } = useStillingsContext();

  const defaultValues = mapStillingTilForm(stillingsData);
  const registerForm = useForm({
    resolver: zodResolver(StillingsDataFormSchema),
    defaultValues: defaultValues,
  });

  return (
    <FormProvider {...registerForm}>
      <RedigerStilling />
    </FormProvider>
  );
}
