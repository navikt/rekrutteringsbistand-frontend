'use client';
import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import AapneSoekeforslagBanner from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/endre-søkeforslag/ÅpneSøkeforslagBanner';
import ForlengOppdragBanner from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/forleng-oppdrag/ForlengOppdragBanner';
import FullførEtterregistrering from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/fullfør-etterregistrering/FullførEtterregistrering';
import GjenåpneBanner from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/gjenåpne-oppdrag/GjenåpneBanner';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { VisningsStatus } from '@/app/stilling/_util/stillingInfoUtil';

export default function Stillingsbanner() {
  const { stillingsData, omStilling, kandidatlisteInfo } =
    useStillingsContext();
  const status = stillingsData?.stilling?.status;

  if (omStilling.erFormidling) {
    switch (status) {
      case StillingsStatus.Stoppet:
        return <GjenåpneBanner />;
      case StillingsStatus.Slettet:
        return null;
      default:
        return <FullførEtterregistrering />;
    }
  }

  // Stillinger som ikke er direktemeldt (DIR) eies av arbeidsplassen.no.
  // Vi skal aldri endre selve stillingen – vi styrer kun kandidatlisten.
  // Bannere som ville oppdatert stillingen (gjenåpne/åpne søkeforslag/forleng)
  // skjules derfor, og GjenåpneBanner vises kun når kandidatlisten faktisk
  // er lukket (det er da vi har noe å gjenåpne).
  if (!omStilling.erDirektemeldt) {
    if (
      omStilling.visningsStatus === VisningsStatus.Fullfort &&
      kandidatlisteInfo?.kandidatlisteStatus === Kandidatlistestatus.Lukket
    ) {
      return <GjenåpneBanner />;
    }
    return null;
  }

  switch (omStilling.visningsStatus) {
    case VisningsStatus.UtloptStengtForSokere:
      return <ForlengOppdragBanner />;
    case VisningsStatus.StengtForSokere:
      return <AapneSoekeforslagBanner />;
    case VisningsStatus.Fullfort:
      return <GjenåpneBanner />;
    case VisningsStatus.ApenForSokere: // Åpen for søkeforslag viser knapper
    case VisningsStatus.Slettet:
    case VisningsStatus.IkkePublisert:
    case VisningsStatus.Ukjent:
      return null;
    default:
      return null;
  }
}
