import { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
import {
  leggtilNyeJobbsøkere,
  LeggTilNyJobbsøkereDTO,
} from '@/app/api/rekrutteringstreff/ny-jobbsøker/leggTilNyjobbsøker';
import { useVisVarsling } from '@/app/components/varsling/Varsling';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { logger } from '@navikt/next-logger';

export const useLagreKandidaterIRekrutteringstreff = (
  rekrutteringstreffId?: string,
) => {
  const visVarsel = useVisVarsling();
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  return async ({
    kandidatsokKandidater,
    selectedRows,
    closeModal,
    setLaster,
  }: {
    kandidatsokKandidater: KandidatsokKandidat[];
    selectedRows: string[];
    closeModal: () => void;
    setLaster: (val: boolean) => void;
  }) => {
    if (!markerteKandidater || markerteKandidater.length === 0) return;

    setLaster(true);
    const feil: string[] = [];
    const dto: LeggTilNyJobbsøkereDTO = markerteKandidater
      .map((kandidatnummer) => {
        const kandidat = kandidatsokKandidater.find(
          (k) => k.arenaKandidatnr === kandidatnummer,
        );
        if (!kandidat) {
          feil.push(`Fant ikke kandidat med kandidatnummer: ${kandidatnummer}`);
          return null;
        }
        if (!kandidat.fodselsnummer) {
          feil.push(`Kandidat mangler fødselsnummer (${kandidatnummer})`);
        }
        return {
          fødselsnummer: kandidat.fodselsnummer,
          fornavn: kandidat.fornavn ?? null,
          etternavn: kandidat.etternavn ?? null,
          kandidatnummer: kandidat.arenaKandidatnr ?? null,
          navkontor: kandidat.navkontor ?? null,
          veilederNavn: kandidat.veilederVisningsnavn ?? 'UKJENT',
          veilederNavIdent: kandidat.veilederIdent ?? 'UKJENT',
        };
      })
      .filter(
        (kandidat) => kandidat && kandidat.fødselsnummer,
      ) as LeggTilNyJobbsøkereDTO;

    try {
      if (rekrutteringstreffId) {
        await leggtilNyeJobbsøkere(dto, rekrutteringstreffId);
      } else if (selectedRows.length !== 0) {
        await Promise.all(
          selectedRows.map((id) => leggtilNyeJobbsøkere(dto, id)),
        );
      } else {
        visVarsel({
          alertType: 'info',
          innhold: 'Velg minst ett rekrutteringstreff',
        });
        setLaster(false);
        return;
      }
      visVarsel({
        alertType: 'success',
        innhold: 'Kandidater lagret i rekrutteringstreff',
      });
      fjernMarkerteKandidater();
      closeModal();
    } catch (error) {
      logger.error(
        'Feil ved lagring av kandidater i rekrutteringstreff',
        error,
      );
      visVarsel({
        alertType: 'error',
        innhold: 'Feil ved lagring av kandidater i rekrutteringstreff',
      });
    }
    setLaster(false);
  };
};
