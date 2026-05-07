'use client';

import Ansettelsesform from '@/app/stilling/_ui/stilling-admin/admin_moduler/Ansettelsesform';
import Arbeidstidsordning from '@/app/stilling/_ui/stilling-admin/admin_moduler/Arbeidstidsordning';
import Inkludering from '@/app/stilling/_ui/stilling-admin/admin_moduler/Inkludering';
import Omfang from '@/app/stilling/_ui/stilling-admin/admin_moduler/Omfang';
import Sektor from '@/app/stilling/_ui/stilling-admin/admin_moduler/Sektor';
import Sted from '@/app/stilling/_ui/stilling-admin/admin_moduler/Sted';
import Yrkestittel from '@/app/stilling/_ui/stilling-admin/admin_moduler/Yrkestittel';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';

export type OpprettEtterregistreringSteg3Handle = {
  hentVerdier: () => Partial<StillingAdminDTO>;
};

interface Props {
  onGyldigEndret?: (gyldig: boolean) => void;
}

export const erSteg3Gyldig = (verdier: Partial<StillingAdminDTO>): boolean => {
  const stilling = verdier.stilling;
  const props = stilling?.properties;
  const harYrkestittel = (stilling?.categoryList ?? []).length > 0;
  const harSektor = !!props?.sector;
  const harAnsettelsesform = !!props?.engagementtype;
  const harSted = (stilling?.locationList ?? []).length > 0;
  const extent = props?.extent;
  const harOmfang =
    extent === 'Heltid' ||
    (extent === 'Deltid' &&
      typeof props?.jobpercentage === 'string' &&
      props.jobpercentage.trim().length > 0);
  return (
    harYrkestittel && harSektor && harAnsettelsesform && harSted && harOmfang
  );
};

const tomDefaultStilling = (): DefaultValues<StillingAdminDTO> => ({
  stillingsinfo: {
    stillingskategori: Stillingskategori.Formidling,
  },
  stilling: {
    properties: {
      sector: null,
      engagementtype: null,
      jobarrangement: null,
      extent: null,
      jobpercentage: null,
      tags: null,
    },
    locationList: [],
    categoryList: [],
  },
  formidlingKandidater: [],
});

const OpprettEtterregistreringSteg3 = forwardRef<
  OpprettEtterregistreringSteg3Handle,
  Props
>(({ onGyldigEndret }, ref) => {
  const form = useForm<StillingAdminDTO>({
    // Bevisst uten zodResolver — dette er en mellomtilstand som lagres
    // som forhåndsfylt i sessionStorage, og valideres på rediger-siden.
    defaultValues: tomDefaultStilling(),
    shouldUnregister: false,
  });

  useImperativeHandle(ref, () => ({
    hentVerdier: () => form.getValues(),
  }));

  useEffect(() => {
    if (!onGyldigEndret) return;
    onGyldigEndret(erSteg3Gyldig(form.getValues()));
    const subscription = form.watch((verdier) => {
      onGyldigEndret(erSteg3Gyldig(verdier as Partial<StillingAdminDTO>));
    });
    return () => subscription.unsubscribe();
  }, [form, onGyldigEndret]);

  return (
    <FormProvider {...form}>
      <div className='flex flex-col gap-4'>
        <Yrkestittel />
        <Sektor />
        <Ansettelsesform />
        <Arbeidstidsordning />
        <Omfang />
        <Sted />
        <Inkludering />
      </div>
    </FormProvider>
  );
});

OpprettEtterregistreringSteg3.displayName = 'OpprettEtterregistreringSteg3';

export default OpprettEtterregistreringSteg3;
