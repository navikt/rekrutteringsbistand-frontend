'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Stillingskategori } from '../../stilling-typer';
import { useStillingsContext } from '../StillingsContext';
import RedigerFormidling from './components/formidling/RedigerFormidling';
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

  const erFormidling =
    stillingsData.stillingsinfo?.stillingskategori ===
    Stillingskategori.Formidling;

  return (
    <FormProvider {...registerForm}>
      {erFormidling ? <RedigerFormidling /> : <RedigerStilling />}
    </FormProvider>
  );
}
