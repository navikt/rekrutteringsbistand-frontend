import { UmamiEvent, UmamiEventObject } from '../../../../util/umamiEvents';
import { leggTilKandidater } from '../../../api/kandidat-sok/leggTilKandidat';
import { AlertType } from '../../../components/varsling/Varsling';
import { useKandidatSøkMarkerteContext } from '../../KandidatSøkMarkerteContext';
import LagreIKandidatlisteModal from './LagreIKandidatlisteModal';
import { useLagreKandidaterIKandidatliste } from './useLagreIKandidatliste';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

interface LagreIKandidatlisteButtonProps {
  stillingsId?: string;
}

const LagreIKandidatlisteButton: React.FC<LagreIKandidatlisteButtonProps> = ({
  stillingsId,
}) => {
  const modalRef = React.useRef<HTMLDialogElement>(null!);

  const { markerteKandidater } = useKandidatSøkMarkerteContext();

  const lagreIKandidatliste = useLagreKandidaterIKandidatliste(stillingsId);

  return (
    <div>
      <Button
        variant='tertiary'
        onClick={() => {
          if (stillingsId) {
            lagreIKandidatliste(undefined);
          } else {
            modalRef.current?.showModal();
          }
        }}
        icon={<PersonPlusIcon aria-hidden />}
        disabled={markerteKandidater?.length === 0}
      >
        {stillingsId ? 'Legg til markerte kandidater' : 'Lagre i kandidatliste'}
      </Button>
      <LagreIKandidatlisteModal stillingsId={stillingsId} ref={modalRef} />
    </div>
  );
};

export default LagreIKandidatlisteButton;

export async function lagreKandidaterIKandidatliste({
  markerteKandidater,
  stillingsId,
  selectedRows,
  visVarsel,
  fjernMarkerteKandidater,
  closeModal,
  setLaster,
  logger,
  track,
  kandidatlisteHook,
}: {
  markerteKandidater: string[];
  stillingsId?: string;
  selectedRows: string[];
  visVarsel: (args: { alertType: AlertType; innhold: string }) => void;
  fjernMarkerteKandidater: () => void;
  closeModal: () => void;
  setLaster: (val: boolean) => void;
  logger: any;
  track: (event: UmamiEventObject, eventData?: Record<string, any>) => void;
  kandidatlisteHook?: { mutate: () => void };
}) {
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
}
