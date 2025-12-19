'use client';

import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { mapSendStillingOppdatering } from '@/app/stilling/_ui/stilling-admin/admin_moduler/mapVerdier';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import AutoLagre from '@/components/autolagre/AutoLagre';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

interface AutolagreStillingProps {
  stillingsData: StillingAdminDTO;
}

export default function AutolagreStilling({
  stillingsData,
}: AutolagreStillingProps) {
  const form = useFormContext<StillingAdminDTO>();
  const { brukerData, valgtNavKontor } = useApplikasjonContext();

  const erPublisert = stillingsData?.stilling?.status === StillingsStatus.Aktiv;
  const harEksisterendeStilling =
    !!stillingsData?.stilling && !!stillingsData?.stilling?.uuid;
  const autoLagringAktiv = harEksisterendeStilling && !erPublisert;

  const lagreStilling = useCallback(
    async (verdier: StillingAdminDTO) => {
      if (!autoLagringAktiv || !verdier.stilling) {
        return;
      }

      const dataForLagring = mapSendStillingOppdatering({
        stilling: verdier.stilling,
        stillingsinfo: verdier.stillingsinfo ?? null,
      } as StillingsDataDTO);

      const respons = await oppdaterStilling(dataForLagring, {
        eierNavident: brukerData.ident,
        eierNavn: brukerData.navn,
        eierNavKontorEnhetId: valgtNavKontor?.navKontor,
      });

      if (respons?.stilling?.versjon !== undefined) {
        form.setValue('stilling.versjon', respons.stilling.versjon ?? null, {
          shouldDirty: false,
        });
      }
    },
    [
      autoLagringAktiv,
      brukerData.ident,
      brukerData.navn,
      form,
      valgtNavKontor?.navKontor,
    ],
  );

  if (!harEksisterendeStilling) {
    return (
      <span
        className='text-xs text-[var(--ax-text-neutral-subtle)]'
        aria-live='polite'
      >
        Autolagring: ingen eksisterende stilling ennå
      </span>
    );
  }

  return (
    <AutoLagre<StillingAdminDTO>
      form={form}
      onLagre={lagreStilling}
      autoLagringAktiv={autoLagringAktiv}
      sisteLagretInitialt={stillingsData?.stilling?.updated ?? null}
    />
  );
}
