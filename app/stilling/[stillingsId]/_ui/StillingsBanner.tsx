'use client';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import AapneSoekeforslagBanner from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/endre-søkeforslag/ÅpneSøkeforslagBanner';
import ForlengOppdragBanner from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/forleng-oppdrag/ForlengOppdragBanner';
import GjenåpneBanner from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/gjenåpne-oppdrag/FullførtBanner';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';

export default function StillingsBanner() {
  const { stillingsData, omStilling } = useStillingsContext();
  const status = stillingsData?.stilling?.status;

  const sisteVisningsdatoPassert = stillingsData?.stilling?.expires
    ? new Date(stillingsData.stilling.expires) < new Date()
    : false;

  if (omStilling.erFormidling) {
    return null;
  }

  switch (status) {
    case StillingsStatus.Inaktiv:
      if (!omStilling.erUtkast) {
        if (sisteVisningsdatoPassert) {
          return <ForlengOppdragBanner />;
        }
        return <AapneSoekeforslagBanner />;
      }
    case StillingsStatus.Stoppet:
      return <GjenåpneBanner />;
    default:
      return null;
  }
}
