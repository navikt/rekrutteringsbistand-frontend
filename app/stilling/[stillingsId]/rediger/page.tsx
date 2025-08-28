'use client';

import {
  StillingDataSchema,
  StillingsDataDTO,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import FremdriftspanelRedigering from '@/app/stilling/[stillingsId]/rediger/_ui/FremdriftspanelRedigering';
import OmJobben from '@/app/stilling/[stillingsId]/rediger/_ui/OmJobben';
import OmStillingsoppdraget from '@/app/stilling/[stillingsId]/rediger/_ui/OmStillingsoppdraget';
import OmTilrettelegging from '@/app/stilling/[stillingsId]/rediger/_ui/OmTilrettelegging';
import OmVirksomheten from '@/app/stilling/[stillingsId]/rediger/_ui/OmVirksomheten';
import PraktiskeForhold from '@/app/stilling/[stillingsId]/rediger/_ui/PraktiskeForhold';
import Sted from '@/app/stilling/[stillingsId]/rediger/_ui/Sted';
import Stillingstittel from '@/app/stilling/[stillingsId]/rediger/_ui/Stillingstittel';
import ViktigeDatoer from '@/app/stilling/[stillingsId]/rediger/_ui/ViktigeDatoer';
// import ViktigeDatoer from '@/app/stilling/[stillingsId]/rediger/_ui/ViktigeDatoer';
import PanelHeader from '@/components/layout/PanelHeader';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@navikt/ds-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function StillingAdmin() {
  const nullableStillingsData = useNullableStillingsContext();

  const [forhåndsvis, setStateForhåndsvis] = useState<boolean>(false);

  const registerForm = useForm<StillingsDataDTO>({
    resolver: zodResolver(StillingDataSchema),
    defaultValues: nullableStillingsData?.stillingsData,
  });

  const setForhåndsvis = (val: boolean) => {
    if (val) {
      nullableStillingsData?.setForhåndsvisData(registerForm.watch());
      setStateForhåndsvis(true);
    } else {
      nullableStillingsData?.setForhåndsvisData(null);
      setStateForhåndsvis(false);
    }
  };

  return (
    <FormProvider {...registerForm}>
      {forhåndsvis ? (
        <>
          <PanelHeader>
            <Button onClick={() => setForhåndsvis(false)}>
              Avslutt forhåndsvisning
            </Button>
          </PanelHeader>
          <OmStillingen printRef={null} forhåndsvisData />
        </>
      ) : (
        <>
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
              <Stillingstittel />
              <OmJobben />
              <PraktiskeForhold />
              <OmVirksomheten />
              <Sted />
              <ViktigeDatoer />
              <OmTilrettelegging />
              <OmStillingsoppdraget />
            </div>

            <FremdriftspanelRedigering
              setForhåndsvis={() => setForhåndsvis(true)}
            />
          </div>
        </>
      )}
    </FormProvider>
  );
}
