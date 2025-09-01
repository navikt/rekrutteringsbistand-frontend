'use client';

import { navnSchema } from '@/app/api/kandidat-sok/useKandidatNavn';
import {
  StillingSchemaDTO,
  StillingsinfoSchema,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import FremdriftspanelRedigering from '@/app/stilling/_ui/stilling-admin/FremdriftspanelRedigering';
import { hentModulerForKategori } from '@/app/stilling/_ui/stilling-admin/StillingAdminModuler';
import EndreStillingStatus from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/EndreStillingStatus';
import {
  Stillingskategori,
  StillingsStatus,
} from '@/app/stilling/_ui/stilling-typer';
// import ViktigeDatoer from '@/app/stilling/rediger/_ui/ViktigeDatoer';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

export const StillingAdminSchema = z.object({
  stillingsinfo: StillingsinfoSchema.nullable().optional(),
  stilling: StillingSchemaDTO.nullable().optional(),
  formidlingKandidater: z.array(navnSchema).default([]).optional().nullable(),
});
export type StillingAdminDTO = z.infer<typeof StillingAdminSchema>;

export default function StillingAdmin() {
  const { forhåndsvisData, setForhåndsvisData, stillingsData } =
    useStillingsContext();
  const router = useRouter();
  const [forhåndsvis, setStateForhåndsvis] = useState<boolean>(false);

  const registerForm = useForm<StillingAdminDTO>({
    resolver: zodResolver(StillingAdminSchema),
    defaultValues: { ...stillingsData, formidlingKandidater: [] },
  });

  const setForhåndsvis = (val: boolean) => {
    if (val) {
      setForhåndsvisData(forhåndsvisData);
      setStateForhåndsvis(true);
    } else {
      setForhåndsvisData(null);
      setStateForhåndsvis(false);
    }
  };

  const knapperad = () => {
    if (stillingsData?.stilling?.uuid) {
      return (
        <EndreStillingStatus
          nyStatus={StillingsStatus.Slettet}
          knappNavn='Slett'
          knappIkon={<TrashIcon />}
          tekst={''}
        />
      );
    }
    return (
      <div className='flex gap-2'>
        <Button
          icon={<TrashIcon />}
          size='small'
          variant='tertiary'
          onClick={() => router.push('/stilling')}
        >
          Avbryt
        </Button>
      </div>
    );
  };

  const harId = registerForm.getValues('stilling.uuid');
  const stillingskategori = registerForm.getValues(
    'stillingsinfo.stillingskategori',
  );

  const moduler = hentModulerForKategori(stillingskategori);

  const headerTittel = () => {
    if (stillingskategori === Stillingskategori.Jobbmesse) {
      return harId ? 'Rediger jobbmesse' : 'Opprett jobbmesse';
    } else if (stillingskategori === Stillingskategori.Formidling) {
      return harId ? 'Rediger etterregistrering' : 'Opprett etterregistrering';
    } else if (stillingskategori === Stillingskategori.Stilling) {
      return harId ? 'Rediger stilling' : 'Opprett stilling';
    }
    return 'Ukjent type';
  };

  return (
    <FormProvider {...registerForm}>
      {forhåndsvis ? (
        <SideLayout>
          <PanelHeader>
            <Button onClick={() => setForhåndsvis(false)}>
              Avslutt forhåndsvisning
            </Button>
          </PanelHeader>
          <OmStillingen printRef={null} forhåndsvisData />
        </SideLayout>
      ) : (
        <SideLayout
          header={
            <PanelHeader>
              <PanelHeader.Section
                title={headerTittel()}
                back={{
                  fallbackPath: '/stilling',
                }}
                actionsRight={knapperad()}
              />
            </PanelHeader>
          }
          fremdriftspanel={
            <FremdriftspanelRedigering
              setForhåndsvis={() => setForhåndsvis(true)}
            />
          }
        >
          <div className='flex flex-col gap-4'>
            {moduler.map((m) => (
              <m.Component key={m.key} />
            ))}
          </div>
        </SideLayout>
      )}
    </FormProvider>
  );
}
