'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import RedigerFormidling from './RedigerFormidling';

import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';
import { FormidlingFormSchema } from './redigerFormidlingFormType';

export default function RedigerFormidlingSide() {
  const registerForm = useForm({
    resolver: zodResolver(FormidlingFormSchema),
    defaultValues: {
      omKandidatene: [],
      omFormidlingen: {
        stillingsId: '',
      },
    },
  });

  return (
    <SideLayout banner={<SideTopBanner tittel='Ny etterregistrering' />}>
      <FormProvider {...registerForm}>
        <RedigerFormidling />
      </FormProvider>
    </SideLayout>
  );
}
