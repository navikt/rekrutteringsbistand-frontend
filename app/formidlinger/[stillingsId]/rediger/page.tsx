'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import RedigerFormidling from '../../../formidlinger/[stillingsId]/rediger/RedigerFormidling';

import { useStillingsContext } from '../../../stilling/[stillingsId]/StillingsContext';
import { mapStillingTilForm } from '../../../stilling/[stillingsId]/rediger/mapStilling';
import { FormidlingFormSchema } from './redigerFormidlingFormType';

export default function RedigerFormidlingSide() {
  const { stillingsData } = useStillingsContext();

  const initialValues = mapStillingTilForm(stillingsData);
  const registerForm = useForm({
    resolver: zodResolver(FormidlingFormSchema),
    defaultValues: initialValues,
  });

  return (
    <FormProvider {...registerForm}>
      <RedigerFormidling />
    </FormProvider>
  );
}
