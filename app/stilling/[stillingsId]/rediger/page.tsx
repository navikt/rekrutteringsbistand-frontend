'use client';

import {
  StillingDataSchema,
  StillingsDataDTO,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import OmJobben from '@/app/stilling/[stillingsId]/rediger/_ui/OmJobben';
import OmStillingsoppdraget from '@/app/stilling/[stillingsId]/rediger/_ui/OmStillingsoppdraget';
import OmVirksomheten from '@/app/stilling/[stillingsId]/rediger/_ui/OmVirksomheten';
import PraktiskeForhold from '@/app/stilling/[stillingsId]/rediger/_ui/PraktiskeForhold';
import Sted from '@/app/stilling/[stillingsId]/rediger/_ui/Sted';
import Stillingstittel from '@/app/stilling/[stillingsId]/rediger/_ui/Stillingstittel';
import ViktigeDatoer from '@/app/stilling/[stillingsId]/rediger/_ui/ViktigeDatoer';
import Fremdriftspanel from '@/components/Fremdriftspanel';
import PanelHeader from '@/components/layout/PanelHeader';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

export default function StillingAdmin() {
  const nullableStillingsData = useNullableStillingsContext();

  const registerForm = useForm<StillingsDataDTO>({
    resolver: zodResolver(StillingDataSchema),
    defaultValues: nullableStillingsData?.stillingsData,
  });

  return (
    <FormProvider {...registerForm}>
      <PanelHeader>
        <PanelHeader.Section
          title={'Nytt stillingsoppdrag'}
          back={{
            fallbackPath: '/stilling',
          }}
        />
      </PanelHeader>
      <div className='flex flex-col  md:flex-row'>
        <div className='w-full flex flex-col gap-5 m-5'>
          {/* <RedigerBoks tittel='Navn på stillingsannonsen'>tbd</RedigerBoks> */}
          <OmJobben />
          <Stillingstittel />
          <PraktiskeForhold />
          <OmVirksomheten />
          <Sted />
          <ViktigeDatoer />
          <OmStillingsoppdraget />
        </div>
        <Fremdriftspanel>e</Fremdriftspanel>
      </div>
    </FormProvider>
  );
}
