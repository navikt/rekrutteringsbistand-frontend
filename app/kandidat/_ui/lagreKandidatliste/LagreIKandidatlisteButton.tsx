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
  kandidatId?: string;
}

const LagreIKandidatlisteMedStillingsId: FC<
  LagreIKandidatlisteMedStillingsIdProps
> = ({ stillingsId, kandidatId }) => {
  const { track } = useUmami();
  const { erEier, stillingsData, refetchKandidatliste } = useStillingsContext();

  // Brukes for å oppdatere eiers kandidatliste med nye kandidater
  const kandidatlisteForEierHook = useKandidatlisteForEier(
    stillingsData,
    erEier,
  );
  const { visVarsel } = useApplikasjonContext();
  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  async function lagreKandidater(kandidater: string[]) {
    if (stillingsId) {
      track(UmamiEvent.Stilling.legg_til_markerte_kandidater, {
        antallKandidater: kandidater?.length,
        kilde: 'Finn kandidater',
      });
      try {
        await leggTilKandidater(kandidater, stillingsId);
        visVarsel({
          type: 'success',
          tekst: `${kandidater.length}  kandidat${kandidater.length > 1 ? 'er' : ''} lagret i kandiatliste`,
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

  async function lagreMarkerteKandidater() {
    if (!markerteKandidater || markerteKandidater.length === 0) return;

    return lagreKandidater(markerteKandidater);
  }

  async function lagreKandidatId(kandidatId: string) {
    return lagreKandidater([kandidatId]);
  }

  if (kandidatId) {
    return (
      <Button
        variant='tertiary'
        onClick={() => {
          lagreKandidatId(kandidatId);
          setTimeout(() => {
            // Brukers her slik at eier får oppdatert listen
            kandidatlisteForEierHook?.mutate();
            refetchKandidatliste?.();
          }, 1000);
        }}
        icon={<PersonPlusIcon aria-hidden />}
      >
        Legg til jobbsøker i kandidatliste
      </Button>
    );
  }

  return (
    <Button
      variant='tertiary'
      onClick={() => {
        lagreMarkerteKandidater();
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
  kandidatId?: string;
}

const LagreIKandidatlisteButton: FC<LagreIKandidatlisteButtonProps> = ({
  stillingsId,
  kandidatId,
}) => {
  const { markerteKandidater } = useKandidatSøkMarkerteContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (stillingsId) {
    return (
      <LagreIKandidatlisteMedStillingsId
        stillingsId={stillingsId}
        kandidatId={kandidatId}
      />
    );
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
