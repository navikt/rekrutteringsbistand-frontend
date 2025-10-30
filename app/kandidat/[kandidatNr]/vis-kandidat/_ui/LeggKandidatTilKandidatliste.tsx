import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { FC, useState } from 'react';

export interface LeggKandidatTilKandidatlisteProps {
  kandidatId: string;
  stillingId: string;
}

const LeggKandidatTilKandidatliste: FC<LeggKandidatTilKandidatlisteProps> = ({
  kandidatId,
  stillingId,
}) => {
  const { track } = useUmami();
  const { visVarsel } = useApplikasjonContext();
  const [leggTilKandidatLoading, setLeggerTilKandidatLoading] = useState(false);

  const stillingsContext = useNullableStillingsContext();

  // bruker for å oppdatere eiers kandidatliste med nye kandidater
  const kandidatlisteForEierHook = useKandidatlisteForEier(
    stillingsContext?.stillingsData,
    stillingsContext?.erEier,
  );

  const leggTilKandidat = async () => {
    track(UmamiEvent.Stilling.legg_til_kandidat_i_kandidatliste);
    setLeggerTilKandidatLoading(true);
    try {
      await leggTilKandidater([kandidatId], stillingId);
      visVarsel({
        tekst: 'Kandidat er lagt til i kandidatliste',
        type: 'success',
      });
    } catch {
      visVarsel({
        tekst: 'Kandidat kunne ikke legges til i kandidatliste',
        type: 'error',
      });
    } finally {
      setLeggerTilKandidatLoading(false);
      setTimeout(() => {
        // Brukers her slik at eier får oppdatert listen
        kandidatlisteForEierHook.mutate();
        stillingsContext?.refetchKandidatliste?.();
      }, 1000);
    }
  };

  return (
    <Button
      size='small'
      onClick={leggTilKandidat}
      loading={leggTilKandidatLoading}
      icon={<PlusIcon />}
    >
      Legg til i stillingsoppdrag
    </Button>
  );
};

export default LeggKandidatTilKandidatliste;
