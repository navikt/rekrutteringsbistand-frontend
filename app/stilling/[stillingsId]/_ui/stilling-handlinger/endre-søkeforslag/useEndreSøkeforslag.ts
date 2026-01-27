'use client';
import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import {
  AdminStatus,
  StillingsStatus,
} from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useRouter } from 'next/navigation';

export interface EndreSøkeforslagParams {
  status: StillingsStatus;
  adminStatus: AdminStatus;
  publiserArbeidsplassen: boolean;
}

export function useEndreSøkeforslag() {
  const router = useRouter();
  const { stillingsData, refetch } = useStillingsContext();
  const { valgtNavKontor, brukerData, visVarsel } = useApplikasjonContext();

  const endreSøkeforslag = async ({
    status,
    adminStatus,
    publiserArbeidsplassen,
  }: EndreSøkeforslagParams) => {
    try {
      const response = await oppdaterStilling(
        {
          ...stillingsData,
          stilling: {
            ...stillingsData.stilling,
            status: status,
            privacy: publiserArbeidsplassen ? 'SHOW_ALL' : 'INTERNAL_NOT_SHOWN',
            administration: {
              ...stillingsData.stilling.administration,
              status: adminStatus,
            },
          },
        },
        {
          eierNavident: brukerData.ident,
          eierNavn: brukerData.navn,
          eierNavKontorEnhetId: valgtNavKontor?.navKontor,
        },
      );

      if (response.stilling.uuid) {
        refetch?.();
        router.push(`/stilling/${response.stilling.uuid}`);
      }
    } catch {
      visVarsel({
        tekst: 'Noe gikk galt ved oppdatering av søkeforslagstatus',
        type: 'error',
      });
      throw new Error('Kunne ikke endre søkeforslag');
    }
  };

  return { endreSøkeforslag };
}
