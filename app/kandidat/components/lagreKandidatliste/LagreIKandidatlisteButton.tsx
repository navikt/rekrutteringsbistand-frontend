import { UmamiEvent, UmamiEventObject } from '../../../../util/umamiEvents';
import { leggTilKandidater } from '../../../api/kandidat-sok/leggTilKandidat';
import {
  ApplikasjonsVarsel,
  useApplikasjonContext,
} from '../../../providers/ApplikasjonContext';
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
  const { visVarsel } = useApplikasjonContext();
  const { markerteKandidater } = useKandidatSøkMarkerteContext();

  const lagreIKandidatliste = useLagreKandidaterIKandidatliste(
    visVarsel,
    stillingsId,
  );

  return (
    <div>
      <Button
        variant='tertiary'
        onClick={() => {
          if (stillingsId) {
            lagreIKandidatliste();
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
  fjernMarkerteKandidater,
  closeModal,
  setLaster,
  logger,
  track,
  kandidatlisteHook,
  visVarsel,
}: {
  markerteKandidater: string[];
  stillingsId?: string;
  selectedRows: string[];
  fjernMarkerteKandidater: () => void;
  closeModal: () => void;
  setLaster: (val: boolean) => void;
  logger: any;
  track: (event: UmamiEventObject, eventData?: Record<string, any>) => void;
  kandidatlisteHook?: { mutate: () => void };
  visVarsel: (varsel: ApplikasjonsVarsel) => void;
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
        type: 'success',
        tekst: 'Kandidater lagret i kandidatliste',
      });
      fjernMarkerteKandidater();
      closeModal();
    } catch (error) {
      logger.error('Feil ved lagring av kandidater i kandidatliste', error);
      visVarsel({
        type: 'error',
        tekst: 'Feil ved lagring av kandidater i kandidatliste',
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
        type: 'success',
        tekst: 'Kandidater lagret i kandidatliste',
      });
      fjernMarkerteKandidater();
      closeModal();
    } catch (error) {
      logger.error('Feil ved lagring av kandidater i kandidatliste', error);
      visVarsel({
        type: 'error',
        tekst: 'Feil ved lagring av kandidater i kandidatliste',
      });
    }
  }
  kandidatlisteHook?.mutate();
  setLaster(false);
}
