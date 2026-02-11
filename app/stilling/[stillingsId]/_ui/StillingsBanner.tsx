'use client';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import PauseSøkeforslag from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/endre-søkeforslag/PauseSøkeforslag';
import AapneSoekeforslagBanner from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/endre-søkeforslag/ÅpneSøkeforslagBanner';
import ForlengOppdragBanner from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/forleng-oppdrag/ForlengOppdragBanner';
import FullførEtterregistrering from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/fullfør-etterregistrering/FullførEtterregistrering';
import GjenåpneBanner from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/gjenåpne-oppdrag/GjenåpneBanner';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { VisningsStatus } from '@/app/stilling/_util/stillingInfoUtil';

export default function StillingsBanner() {
  const { stillingsData, omStilling } = useStillingsContext();
  const status = stillingsData?.stilling?.status;

  if (omStilling.erFormidling) {
    if (status === StillingsStatus.Stoppet) {
      return <GjenåpneBanner />;
    }
    return <FullførEtterregistrering />;
  }

  switch (omStilling.visningsStatus) {
    case VisningsStatus.UtloptStengtForSokere:
      return <ForlengOppdragBanner />;
    case VisningsStatus.StengtForSokere:
      return <AapneSoekeforslagBanner />;
    case VisningsStatus.Fullfort:
      return <GjenåpneBanner />;
    case VisningsStatus.ApenForSokere:
      return <PauseSøkeforslag />;

    case VisningsStatus.Slettet:
    case VisningsStatus.IkkePublisert:
    case VisningsStatus.Ukjent:
      return null;
    default:
      return null;
  }
}
