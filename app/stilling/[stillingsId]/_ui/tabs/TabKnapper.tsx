import FinnKandidaterKnapp from '@/app/_windows/finn-kandidater-window/FinnKandidaterKnapp';
import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import LeggTilKandidatTilStilling from '@/app/stilling/[stillingsId]/_ui/LeggTilKandidatTilStilling';
import StillingPrint from '@/app/stilling/[stillingsId]/_ui/om-stillingen/StillingSidebar/StillingPrint';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Alert } from '@navikt/ds-react';

export default function TabKnapper({
  printRef,
}: {
  printRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { stillingsData, kandidatlisteInfo, kandidatlisteLaster } =
    useStillingsContext();

  const kandidatlistenErLukket =
    kandidatlisteInfo?.kandidatlisteStatus === Kandidatlistestatus.Lukket;

  return (
    <div className='flex items-center'>
      {!kandidatlisteLaster && kandidatlisteInfo === null && (
        <Alert variant='warning'>
          Det er ikke opprettet kandidatliste for denne stillingen.
        </Alert>
      )}
      {kandidatlistenErLukket ? (
        <Alert variant={'info'}>
          Oppdraget er ferdigstilt og kandidatlisten er lukket
        </Alert>
      ) : (
        <>
          {kandidatlisteInfo?.kandidatlisteId && (
            <TilgangskontrollForInnhold
              skjulVarsel
              kreverEnAvRollene={[
                Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
              ]}
            >
              <div className='flex items-center justify-center gap-2'>
                <FinnKandidaterKnapp stillingId={stillingsData.stilling.uuid} />

                <LeggTilKandidatTilStilling
                  stillingsId={stillingsData.stilling.uuid}
                  stillingsTittel={stillingsData.stilling.title}
                />
              </div>
            </TilgangskontrollForInnhold>
          )}
        </>
      )}
      <StillingPrint printRef={printRef} />
    </div>
  );
}
