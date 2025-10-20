import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import FinnKandidaterKnapp from '@/app/stilling/[stillingsId]/_ui/ActionLinks/FinnKandidaterKnapp';
import LeggTilKandidatTilStilling from '@/app/stilling/[stillingsId]/_ui/ActionLinks/LeggTilKandidatTilStilling';
import {
  VisningsStatus,
  visStillingsDataInfo,
} from '@/app/stilling/_util/stillingInfoUtil';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Loader } from '@navikt/ds-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function KandidatKnapper() {
  const { stillingsData, erEier } = useStillingsContext();
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

  const finnStillingAktiv = searchParams.get('finnStilling') !== null; // ?finnStilling (verdi kan være hva som helst)

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

  if (finnStillingAktiv && kandidatNrFraPath) {
    return (
      <Box.New
        background='neutral-softA'
        borderRadius='xlarge'
        paddingInline='space-16'
        paddingBlock='space-12'
        role='button'
        tabIndex={0}
        aria-label='Legg til jobbsøkere. Velg og legg til jobbsøkere i stillingen.'
        className='group flex items-start justify-between gap-4 cursor-pointer outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2'
        onClick={() =>
          !leggerTilKandidatLoading && leggTilKandidat(kandidatNrFraPath)
        }
        aria-busy={leggerTilKandidatLoading || undefined}
      >
        {leggerTilKandidatLoading ? (
          <Loader />
        ) : (
          <div className='flex gap-3 items-start'>
            <span className='text-xl leading-none mt-0.5'>➕</span>
            <div className='flex flex-col'>
              <BodyShort spacing className='m-0'>
                Legg jobbsøker til stillingen
              </BodyShort>
            </div>
          </div>
        )}
        <ArrowRightIcon
          aria-hidden
          className='transition-transform group-hover:translate-x-1 mt-1'
        />
      </Box.New>
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
      <div className='@container/kandidat-knapper contain-layout'>
        <div className='grid grid-cols-1 @3xl:grid-cols-2 gap-4 mb-6'>
          <FinnKandidaterKnapp stillingId={stillingsData.stilling.uuid} />
          <LeggTilKandidatTilStilling
            stillingsId={stillingsData.stilling.uuid}
            stillingsTittel={stillingsData.stilling.title}
          />
        </div>
      </div>
    </TilgangskontrollForInnhold>
  );
}
