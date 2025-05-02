import { useApplikasjonContext } from '../../../../providers/ApplikasjonContext';
import { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
import {
  leggtilNyeJobbsøkere,
  LeggTilNyJobbsøkereDTO,
} from '@/app/api/rekrutteringstreff/ny-jobbsøker/leggTilNyjobbsøker';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { logger } from '@navikt/next-logger';

export const useLagreKandidaterIRekrutteringstreff = (
  kandidatsokKandidater: KandidatsokKandidat[],
  rekrutteringstreffId?: string,
) => {
  const { visVarsel } = useApplikasjonContext();
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  return async (modalparametere?: {
    selectedRows: string[];
    closeModal: () => void;
    setLaster: (val: boolean) => void;
  }) => {
    if (!markerteKandidater || markerteKandidater.length === 0) return;

    modalparametere?.setLaster(true);
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
      } else if (modalparametere && modalparametere.selectedRows.length !== 0) {
        await Promise.all(
          modalparametere.selectedRows.map((id) =>
            leggtilNyeJobbsøkere(dto, id),
          ),
        );
      } else {
        visVarsel({
          type: 'info',
          tekst: 'Velg minst ett rekrutteringstreff',
        });
        modalparametere?.setLaster(false);
        return;
      }
      visVarsel({
        type: 'success',
        tekst: 'Kandidater lagret i rekrutteringstreff',
      });
      fjernMarkerteKandidater();
      modalparametere?.closeModal();
    } catch (error) {
      logger.error(
        'Feil ved lagring av kandidater i rekrutteringstreff',
        error,
      );
      visVarsel({
        type: 'error',
        tekst: 'Feil ved lagring av kandidater i rekrutteringstreff',
      });
    }
    modalparametere?.setLaster(false);
  };
};
