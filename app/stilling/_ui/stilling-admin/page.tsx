'use client';

import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import FremdriftspanelRedigering from '@/app/stilling/_ui/stilling-admin/FremdriftspanelRedigering';
import { hentModulerForKategori } from '@/app/stilling/_ui/stilling-admin/StillingAdminModuler';
import AutolagreStilling from '@/app/stilling/_ui/stilling-admin/admin_moduler/AutolagreStilling';
import EndreStillingStatus from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/EndreStillingStatus';
import { mapTilForm } from '@/app/stilling/_ui/stilling-admin/admin_moduler/mapVerdier';
import { StillingAdminSchema } from '@/app/stilling/_ui/stilling-admin/stilling-admin.schema';
import {
  Stillingskategori,
  StillingsStatus,
} from '@/app/stilling/_ui/stilling-typer';
import { normaliserPropertiesTilStrenger } from '@/app/stilling/_util/normaliserStillingProperties';
// import ViktigeDatoer from '@/app/stilling/rediger/_ui/ViktigeDatoer';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { MultiplyIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

export type StillingAdminDTO = z.infer<typeof StillingAdminSchema>;

export default function StillingAdmin() {
  const { brukerData, valgtNavKontor } = useApplikasjonContext();
  const { setForhåndsvisData, stillingsData } = useStillingsContext();
  const router = useRouter();
  const [forhåndsvis, setStateForhåndsvis] = useState<boolean>(false);
  const fraArbeidsplassen = stillingsData.stilling.source !== 'DIR';
  const mappetVerdier = mapTilForm(stillingsData);
  const registerForm = useForm<StillingAdminDTO>({
    resolver: zodResolver(StillingAdminSchema),
    defaultValues: {
      ...mappetVerdier,
      brukerData,
      navKontorEnhet: valgtNavKontor?.navKontor || null,
    },
  });

  const setForhåndsvis = (val: boolean) => {
    if (val) {
      const verdier = registerForm.getValues();
      const properties = normaliserPropertiesTilStrenger(
        verdier.stilling?.properties as any,
      );
      setForhåndsvisData({
        stilling: {
          ...verdier.stilling,
          properties: properties ?? null,
        },
        stillingsinfo: verdier.stillingsinfo,
      } as StillingsDataDTO);
      setStateForhåndsvis(true);
    } else {
      setForhåndsvisData(null);
      setStateForhåndsvis(false);
    }
  };

  const harId = registerForm.getValues('stilling.uuid');
  const stillingskategori = registerForm.getValues(
    'stillingsinfo.stillingskategori',
  );

  const knapperad = () => {
    return (
      <div className='flex gap-2'>
        {stillingskategori !== Stillingskategori.Formidling && (
          <AutolagreStilling stillingsData={stillingsData} />
        )}
        <Button
          icon={<MultiplyIcon />}
          size='small'
          variant='tertiary'
          onClick={() => router.push('/stilling')}
        >
          Avbryt
        </Button>
        <EndreStillingStatus
          nyStatus={StillingsStatus.Slettet}
          knappNavn='Slett'
          knappIkon={<TrashIcon />}
          tekst={''}
        />
      </div>
    );
  };

  const moduler = hentModulerForKategori(stillingskategori);

  const headerTittel = () => {
    if (stillingskategori === Stillingskategori.Jobbmesse) {
      return harId ? 'Rediger jobbmesse' : 'Opprett jobbmesse';
    } else if (stillingskategori === Stillingskategori.Formidling) {
      return harId ? 'Rediger etterregistrering' : 'Opprett etterregistrering';
    } else if (stillingskategori === Stillingskategori.Stilling) {
      return harId ? 'Rediger stillingsoppdrag' : 'Opprett stillingoppdrag';
    }
    return 'Ukjent type';
  };

  if (fraArbeidsplassen) {
    return (
      <SideLayout>
        <Heading spacing size='large' level='3'>
          Kan ikke endre stilling fra arbeidsplassen.no
        </Heading>
        <Button onClick={() => router.back()}>Tilbake</Button>
      </SideLayout>
    );
  }

  return (
    <FormProvider {...registerForm}>
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
            {forhåndsvis && (
              <Button className='mt-4' onClick={() => setForhåndsvis(false)}>
                Avslutt forhåndsvisning
              </Button>
            )}
          </PanelHeader>
        }
        fremdriftspanel={
          <FremdriftspanelRedigering
            setForhåndsvis={() => setForhåndsvis(true)}
          />
        }
      >
        {forhåndsvis ? (
          <>
            <OmStillingen printRef={null} forhåndsvisData />
          </>
        ) : (
          <div className='flex flex-col gap-4'>
            {moduler.map((m) => (
              <m.Component key={m.key} />
            ))}
          </div>
        )}
      </SideLayout>
    </FormProvider>
  );
}
