import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import LeggTilIStillingsoppdragBanner from '@/app/stilling/[stillingsId]/_ui/LeggTilIStillingsoppdragBanner';
import {
  VisningsStatus,
  visStillingsDataInfo,
} from '@/app/stilling/_util/stillingInfoUtil';
import FinnJobbsøkereKnapp from '@/components/legg-til-jobbsøker/FinnJobbsøkereKnapp';
import LeggTilJobbsøker, {
  LeggTilJobbsøkerType,
} from '@/components/legg-til-jobbsøker/LeggTilJobbsøker';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function KandidatKnapper() {
  const { stillingsData, erEier, omStilling } = useStillingsContext();
  const { visVarsel } = useApplikasjonContext();
  const { track } = useUmami();
  const info = visStillingsDataInfo(stillingsData);
  const [leggerTilKandidatLoading, setLeggerTilKandidatLoading] =
    useState(false);
  // Sjekk om finnStillingForKandidater er aktivert, hvis det er det, hent kandidatnr fra url og bruk dette for å ikke vise knappene
  // Implementasjon: Når vi befinner oss i modus for å finne stilling for en kandidat (indikert av URL-parametret ?finnStilling)
  // og vi har et kandidatnummer (enten som del av path /kandidat/<arenaKandidatnr> eller query-param visKandidatnr),
  // så skal vi skjule knappene for å unngå at bruker legger kandidat til stilling fra denne konteksten.
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const finnStillingAktiv =
    (pathname?.includes('/finn-stilling') ?? false) ||
    searchParams?.get('finnStilling') !== null; // rute /finn-stilling eller ?finnStilling

  // Kandidatnummer kan komme i path (eks: /kandidat/kandidat-arenaKandidatnr-2) eller i query (?visKandidatnr=PAM012...)

  const kandidatNrFraPath = (() => {
    if (!pathname) return null;
    const segments = pathname.split('/').filter(Boolean);
    // Finn index til 'kandidat' og ta neste segment som kandidatnummer
    const kandidatIndex = segments.indexOf('kandidat');
    if (kandidatIndex !== -1 && segments.length > kandidatIndex + 1) {
      const kandidatSegment = segments[kandidatIndex + 1];
      return kandidatSegment || null;
    }
    return null;
  })();

  const kandidatNr =
    kandidatNrFraPath ?? searchParams?.get('visKandidatnr') ?? null;

  const leggTilKandidat = async (kandidatId: string) => {
    track(UmamiEvent.Stilling.forslag_til_stilling_legg_til_kandidat);
    setLeggerTilKandidatLoading(true);
    try {
      await leggTilKandidater([kandidatId], stillingsData.stilling.uuid);
      visVarsel({
        tekst: 'Kandidat er lagt til i kandidatliste',
        type: 'success',
      });
    } catch {
      visVarsel({
        tekst: 'Kandidat kunne ikke legges til i kandidatliste',
        type: 'error',
      });
    } finally {
      setLeggerTilKandidatLoading(false);
    }
  };

  if (finnStillingAktiv && kandidatNr) {
    return (
      <LeggTilIStillingsoppdragBanner
        kandidatNr={kandidatNr}
        laster={leggerTilKandidatLoading}
        onLeggTil={() => leggTilKandidat(kandidatNr)}
      />
    );
  }

  if (
    info.visningsStatus === VisningsStatus.Slettet ||
    info.visningsStatus === VisningsStatus.Fullfort ||
    info.visningsStatus === VisningsStatus.IkkePublisert
  ) {
    return null;
  }

  if (!erEier) {
    if (
      info.visningsStatus === VisningsStatus.StengtForSokere ||
      info.visningsStatus === VisningsStatus.UtloptStengtForSokere
    ) {
      return null;
    }
  }

  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <div className='grid grid-cols-1 gap-4 xl:grid-cols-2 print:hidden'>
        {!omStilling.erFormidling && (
          <FinnJobbsøkereKnapp stillingId={stillingsData.stilling.uuid} />
        )}
        <LeggTilJobbsøker type={LeggTilJobbsøkerType.Stilling} />
      </div>
    </TilgangskontrollForInnhold>
  );
}
