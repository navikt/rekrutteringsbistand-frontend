'use client';

import { StillingsContextMedData } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingAdmin, {
  StillingAdminDTO,
} from '@/app/stilling/_ui/stilling-admin/page';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';

export default function NyStilling() {
  const nyStilling: StillingAdminDTO = {
    stillingsinfo: {
      stillingskategori: Stillingskategori.Stilling,
    },
  };

  return (
    <StillingsContextMedData
      //@ts-expect-error ikke komplett stillingsdata objekt ved opprettelse
      stillingsData={nyStilling}
    >
      <StillingAdmin />
    </StillingsContextMedData>
  );
}
