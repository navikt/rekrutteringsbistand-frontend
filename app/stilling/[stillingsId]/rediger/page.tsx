'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Stillingskategori } from '../../stilling-typer';
import { useStillingsContext } from '../StillingsContext';
import RedigerFormidling from './formidling/pages';
import { mapStillingTilForm } from './mapStilling';
import { StillingsDataFormSchema } from './redigerFormType.zod';
import RedigerStilling from './RedigerStilling';

export default function RedigerSide() {
  const { stillingsData } = useStillingsContext();

  const initialValues = mapStillingTilForm(stillingsData);
  const registerForm = useForm({
    resolver: zodResolver(StillingsDataFormSchema),
    defaultValues: initialValues,
  });

  if (
    stillingsData.stillingsinfo?.stillingskategori ===
    Stillingskategori.Formidling
  ) {
    return <RedigerFormidling />;
  }

  return (
    <FormProvider {...registerForm}>
      <RedigerStilling />
    </FormProvider>
  );
}
