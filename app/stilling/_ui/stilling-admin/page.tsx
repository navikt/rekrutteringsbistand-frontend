'use client';

// import ViktigeDatoer from '@/app/stilling/rediger/_ui/ViktigeDatoer';
import { KandidatKilde } from '@/app/api/kandidat-sok/useKandidatNavn';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import {
  fjernPrefyll,
  hentPrefyll,
} from '@/app/rekrutteringstreff/_utils/formidlingPrefyll';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import SlettOppdragModal from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/SlettOppdragModal';
import FremdriftspanelRedigering from '@/app/stilling/_ui/stilling-admin/FremdriftspanelRedigering';
import { hentModulerForKategori } from '@/app/stilling/_ui/stilling-admin/StillingAdminModuler';
import AutolagreStilling from '@/app/stilling/_ui/stilling-admin/admin_moduler/AutolagreStilling';
import { applyArbeidsgiverTilForm } from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/applyArbeidsgiver';
import { mapTilForm } from '@/app/stilling/_ui/stilling-admin/admin_moduler/mapVerdier';
import { StillingAdminSchema } from '@/app/stilling/_ui/stilling-admin/stilling-admin.schema';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { normaliserPropertiesTilStrenger } from '@/app/stilling/_util/normaliserStillingProperties';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { SidepanelTrigger } from '@/components/layout/SidepanelTrigger';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { MultiplyIcon, SidebarRightIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
        verdier.stilling?.properties,
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
  const erEtterregistrering =
    stillingskategori === Stillingskategori.Formidling;

  // Forhåndsfyll arbeidsgiver og kandidater når formidling opprettes fra et rekrutteringstreff.
  useEffect(() => {
    if (!erEtterregistrering || !harId) return;
    const prefyll = hentPrefyll(harId);
    if (!prefyll) return;
    applyArbeidsgiverTilForm(
      prefyll.arbeidsgiver,
      registerForm.getValues,
      registerForm.setValue,
    );
    registerForm.setValue(
      'formidlingKandidater',
      prefyll.kandidater.map((k) => ({
        fnr: k.fnr,
        fornavn: k.fornavn ?? '',
        etternavn: k.etternavn ?? '',
        kilde: KandidatKilde.PDL,
      })),
      { shouldDirty: true },
    );

    // Anvend felt brukeren fylte inn i wizarden (yrkestittel, sektor, omfang osv.)
    const formVerdier = prefyll.formVerdier;
    if (formVerdier) {
      const stillingFelt = formVerdier.stilling;
      if (stillingFelt?.categoryList && stillingFelt.categoryList.length > 0) {
        registerForm.setValue(
          'stilling.categoryList',
          stillingFelt.categoryList,
          { shouldDirty: true },
        );
      }
      if (stillingFelt?.locationList && stillingFelt.locationList.length > 0) {
        registerForm.setValue(
          'stilling.locationList',
          stillingFelt.locationList,
          { shouldDirty: true },
        );
      }
      const properties = stillingFelt?.properties;
      if (properties?.sector) {
        registerForm.setValue('stilling.properties.sector', properties.sector, {
          shouldDirty: true,
        });
      }
      if (properties?.engagementtype) {
        registerForm.setValue(
          'stilling.properties.engagementtype',
          properties.engagementtype,
          { shouldDirty: true },
        );
      }
      if (properties?.jobarrangement) {
        registerForm.setValue(
          'stilling.properties.jobarrangement',
          properties.jobarrangement,
          { shouldDirty: true },
        );
      }
      if (properties?.extent) {
        registerForm.setValue('stilling.properties.extent', properties.extent, {
          shouldDirty: true,
        });
      }
      if (properties?.jobpercentage) {
        registerForm.setValue(
          'stilling.properties.jobpercentage',
          properties.jobpercentage,
          { shouldDirty: true },
        );
      }
      if (properties?.tags) {
        registerForm.setValue('stilling.properties.tags', properties.tags, {
          shouldDirty: true,
        });
      }
    }

    fjernPrefyll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [erEtterregistrering, harId]);

  const knapperad = () => {
    if (forhåndsvis) return null;

    return (
      <div className='flex gap-2'>
        {!erEtterregistrering && (
          <AutolagreStilling stillingsData={stillingsData} />
        )}
        {!erEtterregistrering && (
          <Button
            icon={<MultiplyIcon />}
            size='small'
            variant='tertiary'
            onClick={() => {
              if (erEtterregistrering) {
                router.push(
                  harId ? `/etterregistrering/${harId}` : '/etterregistrering',
                );
              } else {
                router.push(harId ? `/stilling/${harId}` : '/stilling');
              }
            }}
          >
            Avbryt
          </Button>
        )}
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
    } else if (erEtterregistrering) {
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
          !forhåndsvis && (
            <FremdriftspanelRedigering
              setForhåndsvis={() => setForhåndsvis(true)}
            />
          )
        }
      >
        {forhåndsvis ? (
          <SideInnhold>
            <Heading size='large' className={'pb-5'}>
              {stillingsData.stilling.title ?? ''}
            </Heading>
            <OmStillingen />
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
