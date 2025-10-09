import LagreIKandidatlisteModal from './LagreIKandidatlisteModal';
import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { FC, useState } from 'react';

export interface LagreIKandidatlisteMedStillingsIdProps {
  stillingsId: string;
}

const LagreIKandidatlisteMedStillingsId: FC<
  LagreIKandidatlisteMedStillingsIdProps
> = ({ stillingsId }) => {
  const { track } = useUmami();
  const { erEier, stillingsData, refetchKandidatliste } = useStillingsContext();

  // bruker for å oppdatere eiers kandidatliste med nye kandidater
  const kandidatlisteForEierHook = useKandidatlisteForEier(
    stillingsData,
    erEier,
  );
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
          refetchKandidatliste?.();
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

const LagreIKandidatlisteButton: FC<LagreIKandidatlisteButtonProps> = ({
  stillingsId,
}) => {
  const { markerteKandidater } = useKandidatSøkMarkerteContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (stillingsId) {
    return <LagreIKandidatlisteMedStillingsId stillingsId={stillingsId} />;
  }

  return (
    <div className='flex'>
      <Button
        variant='tertiary'
        onClick={() => setIsModalOpen(true)}
        icon={<PersonPlusIcon aria-hidden />}
        disabled={markerteKandidater?.length === 0}
      >
        Lagre i kandidatliste
      </Button>
      {isModalOpen && (
        <LagreIKandidatlisteModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default LagreIKandidatlisteButton;
