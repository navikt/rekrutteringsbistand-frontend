import { useKandidatsøk } from '@/app/api/kandidat-sok/useKandidatsøk';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import LagreIKandidatlisteButton from '@/app/kandidat/_ui/lagreKandidatliste/LagreIKandidatlisteButton';
import RekrutteringstreffPilotTilgang from '@/app/rekrutteringstreff/RekrutteringstreffPilotTilgang';
import LagreIRekrutteringstreffKnapp from '@/app/rekrutteringstreff/[rekrutteringstreffId]/finn-kandidater/_ui/lagre-i-rekrutteringstreff/LagreIRekrutteringstreffKnapp';
import SWRLaster from '@/components/SWRLaster';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Checkbox } from '@navikt/ds-react';

export interface MarkerOgLagreKandidaterProps {
  kandidatsøkHook: ReturnType<typeof useKandidatsøk>;
  stillingsId?: string;
  rekrutteringstreffId?: string;
}

export default function MarkerOgLagreKandidater({
  kandidatsøkHook,
  stillingsId,
  rekrutteringstreffId,
}: MarkerOgLagreKandidaterProps) {
  const { markerteKandidater, setMarkertListe, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  return (
    <SWRLaster hooks={[kandidatsøkHook]}>
      {(kandidatData) => {
        if (!kandidatData) return null;

        // Sjekk om alle kandidater på denne siden er markert
        const kandidatnumrePåSiden = kandidatData.kandidater
          .map((kandidat) => kandidat.arenaKandidatnr)
          .filter(
            (nr): nr is string => nr !== null && nr !== undefined && nr !== '',
          );

        const alleKandidaterPåSidenErMarkert =
          kandidatnumrePåSiden.length > 0 &&
          kandidatnumrePåSiden.every((nr) =>
            markerteKandidater.some((k) => k.arenaKandidatnr === nr),
          );

        const markerAlle = () => {
          if (alleKandidaterPåSidenErMarkert) {
            fjernMarkerteKandidater();
          } else if (kandidatData.kandidater) {
            const eksisterendeNr = new Set(
              markerteKandidater.map((k) => k.arenaKandidatnr),
            );
            const nyeKandidater = kandidatData.kandidater
              .filter(
                (k) =>
                  k.arenaKandidatnr && !eksisterendeNr.has(k.arenaKandidatnr),
              )
              .map((k) => ({
                arenaKandidatnr: k.arenaKandidatnr!,
                fodselsnummer: k.fodselsnummer ?? null,
                fornavn: k.fornavn ?? null,
                etternavn: k.etternavn ?? null,
              }));
            setMarkertListe([...markerteKandidater, ...nyeKandidater]);
          }
        };

        const leggTilITreff = (
          <RekrutteringstreffPilotTilgang skjulInnhold>
            <LagreIRekrutteringstreffKnapp
              rekrutteringstreffId={rekrutteringstreffId}
            />
          </RekrutteringstreffPilotTilgang>
        );

        const leggTilIKandidatliste = (
          <LagreIKandidatlisteButton stillingsId={stillingsId} />
        );

        return (
          <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={
              stillingsId || rekrutteringstreffId
                ? [
                    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                  ]
                : [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]
            }
          >
            <div className='ml-5 flex flex-wrap items-center gap-x-2 gap-y-1'>
              <Checkbox
                checked={alleKandidaterPåSidenErMarkert}
                onClick={markerAlle}
              >
                {alleKandidaterPåSidenErMarkert
                  ? `Fjern markerte (${markerteKandidater.length})`
                  : 'Marker alle på siden' +
                    (markerteKandidater.length > 0
                      ? ` (${markerteKandidater.length} markert)`
                      : '')}
              </Checkbox>
              {rekrutteringstreffId && leggTilITreff}
              {stillingsId && leggTilIKandidatliste}
              {!rekrutteringstreffId && !stillingsId && (
                <RekrutteringstreffPilotTilgang skjulInnhold>
                  {leggTilIKandidatliste}
                  {leggTilITreff}
                </RekrutteringstreffPilotTilgang>
              )}
            </div>
          </TilgangskontrollForInnhold>
        );
      }}
    </SWRLaster>
  );
}
