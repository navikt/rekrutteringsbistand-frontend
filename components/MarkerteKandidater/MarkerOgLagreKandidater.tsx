import {
  KandidatsokKandidat,
  useKandidatsøk,
} from '@/app/api/kandidat-sok/useKandidatsøk';
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
          kandidatnumrePåSiden.every((nr) => markerteKandidater?.includes(nr));

        const markerAlle = () => {
          if (alleKandidaterPåSidenErMarkert) {
            fjernMarkerteKandidater();
          } else if (kandidatData.kandidater) {
            // Legg til kandidatene på denne siden til eksisterende markerte
            const eksisterende = markerteKandidater ?? [];
            const nyeKandidater = kandidatnumrePåSiden.filter(
              (nr) => !eksisterende.includes(nr),
            );
            setMarkertListe([...eksisterende, ...nyeKandidater]);
          }
        };

        const leggTilITreff = (
          <RekrutteringstreffPilotTilgang skjulInnhold>
            <LagreIRekrutteringstreffKnapp
              rekrutteringstreffId={rekrutteringstreffId}
              kandidatsokKandidater={
                kandidatData.kandidater as KandidatsokKandidat[]
              }
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
            <div className='ml-5 flex items-center'>
              {' '}
              <Checkbox
                checked={alleKandidaterPåSidenErMarkert}
                onClick={markerAlle}
              >
                {alleKandidaterPåSidenErMarkert
                  ? `Fjern markerte (${markerteKandidater?.length ?? 0})`
                  : 'Marker alle på siden' +
                    (markerteKandidater?.length && markerteKandidater.length > 0
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
