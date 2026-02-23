import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { format } from 'date-fns';

export const oppdaterEtterregistrering = async (data: StillingAdminDTO) => {
  const datoIDag = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");

  const stillingsData = {
    stillingsinfo: {
      ...data.stillingsinfo,
      eierNavident: data.brukerData?.ident ?? null,
      eierNavn: `${data.brukerData?.fornavn} ${data.brukerData?.etternavn}`,
      eierNavKontorEnhetId: data.navKontorEnhet ?? null,
    },
    stilling: {
      ...data.stilling,
      properties: {
        ...data.stilling?.properties,
        starttime: datoIDag,
        applicationdue: datoIDag,
      },
      administration: {
        ...data.stilling?.administration,
        status: 'DONE',
      },
      status: StillingsStatus.Stoppet,
      firstPublished: true,
      published: datoIDag,
      expires: datoIDag,
    },
  } as StillingsDataDTO;

  return await oppdaterStilling(stillingsData, {
    eierNavident: data.brukerData?.ident,
    eierNavn: `${data.brukerData?.fornavn} ${data.brukerData?.etternavn}`,
    eierNavKontorEnhetId: data.navKontorEnhet ?? undefined,
  });
};
