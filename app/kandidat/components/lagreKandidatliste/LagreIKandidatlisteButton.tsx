import { UmamiEvent } from '../../../../util/umamiEvents';
import { leggTilKandidater } from '../../../api/kandidat-sok/leggTilKandidat';
import { useApplikasjonContext } from '../../../providers/ApplikasjonContext';
import { useKandidatSøkMarkerteContext } from '../../KandidatSøkMarkerteContext';
import LagreIKandidatlisteModal from './LagreIKandidatlisteModal';
import { useUmami } from '@/app/providers/UmamiContext';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import * as React from 'react';

interface LagreIKandidatlisteButtonProps {
  stillingsId?: string;
}

const LagreIKandidatlisteButton: React.FC<LagreIKandidatlisteButtonProps> = ({
  stillingsId,
}) => {
  const { track } = useUmami();

  const modalRef = React.useRef<HTMLDialogElement>(null!);
  const { visVarsel } = useApplikasjonContext();
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  return (
    <div>
      <Button
        variant='tertiary'
        onClick={() => {
          if (stillingsId) {
            lagreKandidater();
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

  async function lagreKandidater() {
    if (!markerteKandidater || markerteKandidater.length === 0) return;

    if (stillingsId) {
      track(UmamiEvent.Stilling.legg_til_markerte_kandidater, {
        antallKandidater: markerteKandidater?.length,
        kilde: 'Finn kandidater',
      });
      try {
        await leggTilKandidater(markerteKandidater, stillingsId);
        visVarsel({
          type: 'success',
          tekst: `${markerteKandidater.length}  kandidat${markerteKandidater.length > 1 ? 'er' : ''} lagret i kandiatliste`,
        });
        fjernMarkerteKandidater();
      } catch (error) {
        logger.error('Feil ved lagring av kandidater i kandidatliste', error);
        visVarsel({
          type: 'error',
          tekst: 'Feil ved lagring av kandidater i kandidatliste',
        });
      }
    }
  }
};

export default LagreIKandidatlisteButton;
