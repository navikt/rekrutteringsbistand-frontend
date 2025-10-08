import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import AktivStilling from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/AktivStilling';
import FullførtStilling from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/FullførtStilling';
import RedigerStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/RedigerStillingKnapp';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import SWRLaster from '@/components/SWRLaster';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';

export interface FremdriftspanelStillingProps {
  dropDown?: boolean;
}

export default function FremdriftspanelStilling({
  dropDown,
}: FremdriftspanelStillingProps) {
  const { stillingsData, erEier } = useStillingsContext();
  const kandidatlisteHook = useKandidatlisteForEier(stillingsData, erEier);

  // Håndter 404-feil eller andre feil hvor kandidatliste ikke finnes
  const kandidatlisteFeil = kandidatlisteHook.error;
  const er404Feil =
    kandidatlisteFeil?.status === 404 ||
    kandidatlisteFeil?.message?.includes('404');

  // Hvis kandidatliste er slettet (404), vis bare redigeringsknapp
  if (er404Feil || (kandidatlisteFeil && !kandidatlisteHook.isLoading)) {
    return (
      <TilgangskontrollForInnhold
        skjulVarsel
        kreverEnAvRollene={[
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        ]}
      >
        <RedigerStillingKnapp />
      </TilgangskontrollForInnhold>
    );
  }

  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
    >
      {stillingsData.stilling.publishedByAdmin === null ? (
        <RedigerStillingKnapp />
      ) : (
        <SWRLaster hooks={[kandidatlisteHook]}>
          {(kandidatliste) => {
            const erFullført =
              kandidatliste.status === Kandidatlistestatus.Lukket &&
              stillingsData.stilling.status === StillingsStatus.Stoppet;
            const totalStillinger =
              (stillingsData.stilling?.properties?.positioncount &&
                Number(stillingsData.stilling?.properties?.positioncount)) ||
              1;

            const antallDelt =
              kandidatliste?.kandidater.filter((k) =>
                k.utfallsendringer.some(
                  (k) => k.sendtTilArbeidsgiversKandidatliste === true,
                ),
              ).length ?? 0;

            const antallFåttJobbenKandidatliste =
              kandidatliste?.kandidater.filter(
                (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
              ).length ?? 0;

            const antallFåttJobbenUsynlig =
              kandidatliste.formidlingerAvUsynligKandidat.filter(
                (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
              ).length ?? 0;

            const antallFåttJobben =
              antallFåttJobbenKandidatliste + antallFåttJobbenUsynlig;

            if (erFullført) {
              return (
                <FullførtStilling
                  dropDown={dropDown}
                  totalStillinger={totalStillinger}
                  antallFåttJobben={antallFåttJobben}
                />
              );
            }

            return (
              <AktivStilling
                antallFåttJobben={antallFåttJobben}
                antallDelt={antallDelt}
                totalStillinger={totalStillinger}
                dropDown={dropDown}
              />
            );
          }}
        </SWRLaster>
      )}
    </TilgangskontrollForInnhold>
  );
}
