'use client';

import HovedInnholdKort from '../../components/layout/HovedInnholdKort';
import SideBanner from '../../components/layout/SideBanner';
import SideLayout from '../../components/layout/SideLayout';
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
      <SideLayout topBanner={<SideBanner tittel='Ny etterregistrering' />}>
        <FormProvider {...registerForm}>
          <RedigerFormidling />
        </FormProvider>
      </SideLayout>
    </HovedInnholdKort>
  );
}
