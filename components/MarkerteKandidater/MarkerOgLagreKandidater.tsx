import MarkerAllePåSiden from './MarkerAllePåSiden';
import Markeringsrad from './Markeringsrad';
import { useKandidatsøk } from '@/app/api/kandidat-sok/useKandidatsøk';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import LagreIKandidatlisteButton from '@/app/kandidat/_ui/lagreKandidatliste/LagreIKandidatlisteButton';
import { erKandidatLagtTil } from '@/app/kandidat/erKandidatLagtTil';
import LagreIRekrutteringstreffKnapp from '@/app/rekrutteringstreff/[rekrutteringstreffId]/finn-kandidater/_ui/lagre-i-rekrutteringstreff/LagreIRekrutteringstreffKnapp';
import SWRLaster from '@/components/SWRLaster';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';

export interface MarkerOgLagreKandidaterProps {
  kandidatsøkHook: ReturnType<typeof useKandidatsøk>;
  stillingsId?: string;
  rekrutteringstreffId?: string;
  alleredeLagtTil?: string[];
}

export default function MarkerOgLagreKandidater({
  kandidatsøkHook,
  stillingsId,
  rekrutteringstreffId,
  alleredeLagtTil,
}: MarkerOgLagreKandidaterProps) {
  const { markerteKandidater, setMarkertListe, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  return (
    <SWRLaster hooks={[kandidatsøkHook]}>
      {(kandidatData) => {
        if (!kandidatData) return null;

        const valgbareKandidater = kandidatData.kandidater.filter(
          (
            kandidat,
          ): kandidat is typeof kandidat & { arenaKandidatnr: string } =>
            Boolean(kandidat.arenaKandidatnr) &&
            !erKandidatLagtTil(kandidat, alleredeLagtTil),
        );

        const markerAlle = () => {
          const kandidaterPerId = new Map(
            markerteKandidater.map((k) => [k.arenaKandidatnr, k]),
          );
          for (const k of valgbareKandidater) {
            if (!kandidaterPerId.has(k.arenaKandidatnr)) {
              kandidaterPerId.set(k.arenaKandidatnr, {
                arenaKandidatnr: k.arenaKandidatnr,
                fodselsnummer: k.fodselsnummer ?? null,
                fornavn: k.fornavn ?? null,
                etternavn: k.etternavn ?? null,
              });
            }
          }
          setMarkertListe([...kandidaterPerId.values()]);
        };

        const leggTilITreff = (
          <LagreIRekrutteringstreffKnapp
            rekrutteringstreffId={rekrutteringstreffId}
          />
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
            <Markeringsrad>
              <MarkerAllePåSiden
                valgbareIder={valgbareKandidater.map((k) => k.arenaKandidatnr)}
                markerteIder={markerteKandidater.map((k) => k.arenaKandidatnr)}
                onMarkerAlle={markerAlle}
                onFjernAlle={fjernMarkerteKandidater}
              />
              {rekrutteringstreffId && leggTilITreff}
              {stillingsId && leggTilIKandidatliste}
              {!rekrutteringstreffId && !stillingsId && (
                <>
                  {leggTilIKandidatliste}
                  {leggTilITreff}
                </>
              )}
            </Markeringsrad>
          </TilgangskontrollForInnhold>
        );
      }}
    </SWRLaster>
  );
}
