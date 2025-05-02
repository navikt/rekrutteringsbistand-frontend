import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { useKandidatliste } from '@/app/api/kandidat/useKandidatliste';
import { useVisVarsling } from '@/app/components/varsling/Varsling';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { useUmami } from '@/app/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { logger } from '@navikt/next-logger';

export const useLagreKandidaterIKandidatliste = (stillingsId?: string) => {
  const { track } = useUmami();
  useKandidatSøkMarkerteContext();

  const kandidatlisteHook = useKandidatliste(stillingsId);

  const visVarsel = useVisVarsling();

  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  return async ({
    selectedRows,
    closeModal,
    setLaster,
  }: {
    selectedRows: string[];
    closeModal: () => void;
    setLaster: (val: boolean) => void;
  }) => {
    if (!markerteKandidater || markerteKandidater.length === 0) return;

    setLaster(true);
    if (stillingsId) {
      track(UmamiEvent.Stilling.legg_til_markerte_kandidater, {
        antallKandidater: markerteKandidater?.length,
        kilde: 'Finn kandidater',
      });
      try {
        await leggTilKandidater(markerteKandidater, stillingsId);
        visVarsel({
          alertType: 'success',
          innhold: 'Kandidater lagret i kandidatliste',
        });
        fjernMarkerteKandidater();
        closeModal();
      } catch (error) {
        logger.error('Feil ved lagring av kandidater i kandidatliste', error);
        visVarsel({
          alertType: 'error',
          innhold: 'Feil ved lagring av kandidater i kandidatliste',
        });
      }
    } else if (selectedRows.length !== 0) {
      track(UmamiEvent.Stilling.legg_til_markerte_kandidater, {
        antallKandidater: markerteKandidater?.length,
        kilde: 'Kandidatsøk',
        antallStillinger: selectedRows.length,
      });
      const promises = selectedRows.map((stillingId) =>
        leggTilKandidater(markerteKandidater, stillingId),
      );
      try {
        await Promise.all(promises);
        visVarsel({
          alertType: 'success',
          innhold: 'Kandidater lagret i kandidatliste',
        });
        fjernMarkerteKandidater();
        closeModal();
      } catch (error) {
        logger.error('Feil ved lagring av kandidater i kandidatliste', error);
        visVarsel({
          alertType: 'error',
          innhold: 'Feil ved lagring av kandidater i kandidatliste',
        });
      }
    }
    kandidatlisteHook?.mutate();
    setLaster(false);
  };
};
