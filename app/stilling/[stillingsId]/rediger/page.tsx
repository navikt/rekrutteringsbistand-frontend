'use client';

import RedigerStilling from './RedigerStilling';
import { mapStillingTilForm } from './mapStilling';
import {
  StillingsDataForm,
  StillingsDataFormSchema,
} from './redigerFormType.zod';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

export default function RedigerSide() {
  const { stillingsData } = useStillingsContext();

  const registerForm = useForm<StillingsDataForm>({
    // @ts-expect-error //TODO feil etter zod4 oppdatering
    resolver: zodResolver(StillingsDataFormSchema),
    defaultValues: mapStillingTilForm(stillingsData),
  });

  return (
    <FormProvider {...registerForm}>
      <RedigerStilling />
    </FormProvider>
  );
}
