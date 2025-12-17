'use client';

import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import SlettOppdragModal from '@/app/stilling/[stillingsId]/_ui/tabs/SlettOppdragModal';
import FremdriftspanelRedigering from '@/app/stilling/_ui/stilling-admin/FremdriftspanelRedigering';
import { hentModulerForKategori } from '@/app/stilling/_ui/stilling-admin/StillingAdminModuler';
import {
  mapSendStillingOppdatering,
  mapTilForm,
} from '@/app/stilling/_ui/stilling-admin/admin_moduler/mapVerdier';
import { StillingAdminSchema } from '@/app/stilling/_ui/stilling-admin/stilling-admin.schema';
import {
  Stillingskategori,
  StillingsStatus,
} from '@/app/stilling/_ui/stilling-typer';
import { normaliserPropertiesTilStrenger } from '@/app/stilling/_util/normaliserStillingProperties';
// import ViktigeDatoer from '@/app/stilling/rediger/_ui/ViktigeDatoer';
import AutoLagre from '@/components/autolagre/AutoLagre';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { SidepanelTrigger } from '@/components/layout/SidepanelTrigger';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FloppydiskIcon,
  MultiplyIcon,
  SidebarRightIcon,
  TrashIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Button, Heading } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

export type StillingAdminDTO = z.infer<typeof StillingAdminSchema>;

export default function StillingAdmin() {
  const { brukerData, valgtNavKontor } = useApplikasjonContext();
  const { setForhåndsvisData, stillingsData } = useStillingsContext();
  const router = useRouter();
  const [forhåndsvis, setStateForhåndsvis] = useState<boolean>(false);
  const [visSlettModal, setVisSlettModal] = useState(false);
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
  const erPublisert = stillingsData.stilling.status === StillingsStatus.Aktiv;
  const erStillingsOppdrag = stillingskategori === Stillingskategori.Stilling;
  const erEtterregistrering =
    stillingskategori === Stillingskategori.Formidling;
  const skalViseAutoLagre = erStillingsOppdrag || erEtterregistrering;
  const kanAutoLagre = Boolean(skalViseAutoLagre && !erPublisert && harId);
  const sisteLagretInitialt = stillingsData.stilling.updated
    ? new Date(stillingsData.stilling.updated)
    : stillingsData.stilling.created
      ? new Date(stillingsData.stilling.created)
      : null;

  const lagreStilling = useCallback(
    async (verdier: StillingAdminDTO) => {
      if (!kanAutoLagre) {
        return;
      }

      if (!verdier.stilling) {
        return;
      }

      const mappedValues = mapSendStillingOppdatering({
        stilling: verdier.stilling,
        stillingsinfo: verdier.stillingsinfo ?? undefined,
      });

      const oppdatert = await oppdaterStilling(mappedValues, {
        eierNavident: brukerData.ident,
        eierNavn: brukerData.navn,
        eierNavKontorEnhetId: valgtNavKontor?.navKontor,
      });

      if (oppdatert?.stilling?.versjon) {
        registerForm.setValue('stilling.versjon', oppdatert.stilling.versjon, {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
        });
      }
    },
    [
      kanAutoLagre,
      brukerData.ident,
      brukerData.navn,
      valgtNavKontor?.navKontor,
      registerForm,
    ],
  );

  const knapperad = () => {
    return (
      <div className='flex gap-2'>
        <AutoLagre
          form={registerForm}
          onLagre={lagreStilling}
          autoLagringAktiv={kanAutoLagre}
          sisteLagretInitialt={sisteLagretInitialt}
        >
          {({ statusTekst, lagreNaa, lagrer, venterPåLagring }) => (
            <BodyShort size='small' className='flex items-center gap-1'>
              {!kanAutoLagre ? (
                statusTekst
              ) : (
                <Button
                  type='button'
                  icon={<FloppydiskIcon />}
                  size='xsmall'
                  variant='tertiary'
                  onClick={lagreNaa}
                  disabled={lagrer || venterPåLagring}
                >
                  {statusTekst}
                </Button>
              )}
            </BodyShort>
          )}
        </AutoLagre>
        <Button
          icon={<MultiplyIcon />}
          size='small'
          variant='tertiary'
          onClick={() => router.push('/stilling')}
        >
          Avbryt
        </Button>
        <Button
          icon={<TrashIcon />}
          variant='tertiary'
          onClick={() => setVisSlettModal(true)}
        >
          Slett
        </Button>
        {visSlettModal && <SlettOppdragModal setVisModal={setVisSlettModal} />}
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
              actionsRight={knapperad()}
            />
            {forhåndsvis && (
              <Button className='mt-4' onClick={() => setForhåndsvis(false)}>
                Avslutt forhåndsvisning
              </Button>
            )}
            <SidepanelTrigger icon={<SidebarRightIcon />} className='ml-auto'>
              Vis sidepanel
            </SidepanelTrigger>
          </PanelHeader>
        }
        sidepanel={
          <FremdriftspanelRedigering
            setForhåndsvis={() => setForhåndsvis(true)}
          />
        }
      >
        {forhåndsvis ? (
          <SideInnhold>
            <Heading size='large' className={'pb-5'}>
              {stillingsData.stilling.title ?? ''}
            </Heading>
            <OmStillingen printRef={null} forhåndsvisData />
          </SideInnhold>
        ) : (
          <SideInnhold>
            <div className='flex flex-col gap-4'>
              {moduler.map((m) => (
                <m.Component key={m.key} />
              ))}
            </div>
          </SideInnhold>
        )}
      </SideLayout>
    </FormProvider>
  );
}
