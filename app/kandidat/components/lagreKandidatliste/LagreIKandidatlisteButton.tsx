import { RekbisError } from '../../../../util/rekbisError';
import { UmamiEvent } from '../../../../util/umamiEvents';
import { leggTilKandidater } from '../../../api/kandidat-sok/leggTilKandidat';
import { useKandidatlisteForEier } from '../../../api/kandidat/useKandidatlisteForEier';
import { useKandidatlisteInfo } from '../../../api/kandidat/useKandidatlisteInfo';
import { useApplikasjonContext } from '../../../providers/ApplikasjonContext';
import { useStillingsContext } from '../../../stilling/[stillingsId]/StillingsContext';
import { useKandidatSøkMarkerteContext } from '../../KandidatSøkMarkerteContext';
import LagreIKandidatlisteModal from './LagreIKandidatlisteModal';
import { useUmami } from '@/app/providers/UmamiContext';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface LagreIKandidatlisteMedStillingsIdProps {
  stillingsId: string;
}

const LagreIKandidatlisteMedStillingsId: React.FC<
  LagreIKandidatlisteMedStillingsIdProps
> = ({ stillingsId }) => {
  const { track } = useUmami();
  const { erEier, stillingsData } = useStillingsContext();

  // bruker for å oppdatere eiers kandidatliste med nye kandidater
  const kandidatlisteForEierHook = useKandidatlisteForEier(
    stillingsData,
    erEier,
  );

  const kandidatListeInfo = useKandidatlisteInfo(stillingsData.stillingsinfo);
  const { visVarsel } = useApplikasjonContext();
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

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
        new RekbisError({
          message: 'Feil ved lagring av kandidater i kandidatliste',
          error,
        });
        visVarsel({
          type: 'error',
          tekst: 'Feil ved lagring av kandidater i kandidatliste',
        });
      }
    }
  }

  return (
    <Button
      variant='tertiary'
      onClick={() => {
        lagreKandidater();
        setTimeout(() => {
          // Brukers her slik at eier får oppdatert listen
          kandidatlisteForEierHook.mutate();
          kandidatListeInfo?.mutate();
        }, 1000);
      }}
      icon={<PersonPlusIcon aria-hidden />}
      disabled={markerteKandidater?.length === 0}
    >
      Legg til markerte kandidater
    </Button>
  );
};

interface LagreIKandidatlisteButtonProps {
  stillingsId?: string;
}

const LagreIKandidatlisteButton: React.FC<LagreIKandidatlisteButtonProps> = ({
  stillingsId,
}) => {
  const modalRef = React.useRef<HTMLDialogElement>(null!);
  const { markerteKandidater } = useKandidatSøkMarkerteContext();

  if (stillingsId) {
    return <LagreIKandidatlisteMedStillingsId stillingsId={stillingsId} />;
  }

  return (
    <div>
      <Button
        variant='tertiary'
        onClick={() => {
          modalRef.current?.showModal();
        }}
        icon={<PersonPlusIcon aria-hidden />}
        disabled={markerteKandidater?.length === 0}
      >
        Lagre i kandidatliste
      </Button>
      <LagreIKandidatlisteModal ref={modalRef} />
    </div>
  );
};

export default LagreIKandidatlisteButton;
