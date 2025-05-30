'use client';

import HovedInnholdKort from '../../components/layout/HovedInnholdKort';
import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';
import RedigerFormidling from './RedigerFormidling';
import { FormidlingFormSchema } from './redigerFormidlingFormType';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

export default function RedigerFormidlingSide() {
  const registerForm = useForm({
    resolver: zodResolver(FormidlingFormSchema),
  });

  return (
    <HovedInnholdKort>
      <SideLayout banner={<SideTopBanner tittel='Ny etterregistrering' />}>
        <FormProvider {...registerForm}>
          <RedigerFormidling />
        </FormProvider>
      </SideLayout>
    </HovedInnholdKort>
  );
}
