import { ApplikasjonsVarsel } from '../../../providers/ApplikasjonContext';
import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { useKandidatliste } from '@/app/api/kandidat/useKandidatliste';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { useUmami } from '@/app/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { logger } from '@navikt/next-logger';

export const useLagreKandidaterIKandidatliste = (
  visVarsel: (varsel: ApplikasjonsVarsel) => void,
  stillingsId?: string,
) => {
  const { track } = useUmami();
  useKandidatSøkMarkerteContext();

  const kandidatlisteHook = useKandidatliste(stillingsId);

  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  return async (modalparametere?: {
    selectedRows: string[];
    closeModal: () => void;
    setLaster: (val: boolean) => void;
  }) => {
    if (!markerteKandidater || markerteKandidater.length === 0) return;

    modalparametere?.setLaster(true);
    if (stillingsId) {
      track(UmamiEvent.Stilling.legg_til_markerte_kandidater, {
        antallKandidater: markerteKandidater?.length,
        kilde: 'Finn kandidater',
      });
      try {
        await leggTilKandidater(markerteKandidater, stillingsId);
        visVarsel({
          type: 'success',
          tekst: 'Kandidater lagret i kandidatliste',
        });
        fjernMarkerteKandidater();
        modalparametere?.closeModal();
      } catch (error) {
        logger.error('Feil ved lagring av kandidater i kandidatliste', error);
        visVarsel({
          type: 'error',
          tekst: 'Feil ved lagring av kandidater i kandidatliste',
        });
      }
    } else if (modalparametere && modalparametere.selectedRows.length !== 0) {
      track(UmamiEvent.Stilling.legg_til_markerte_kandidater, {
        antallKandidater: markerteKandidater?.length,
        kilde: 'Kandidatsøk',
        antallStillinger: modalparametere
          ? modalparametere.selectedRows.length
          : 1,
      });
      const promises = modalparametere.selectedRows.map((stillingId) =>
        leggTilKandidater(markerteKandidater, stillingId),
      );
      try {
        await Promise.all(promises);
        visVarsel({
          type: 'success',
          tekst: 'Kandidater lagret i kandidatliste',
        });
        fjernMarkerteKandidater();
        modalparametere.closeModal();
      } catch (error) {
        logger.error('Feil ved lagring av kandidater i kandidatliste', error);
        visVarsel({
          type: 'error',
          tekst: 'Feil ved lagring av kandidater i kandidatliste',
        });
      }
    }
    kandidatlisteHook?.mutate();
    modalparametere?.setLaster(false);
  };
};
