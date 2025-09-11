import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useKandidatlisteInfo } from '@/app/api/kandidat/useKandidatlisteInfo';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

export interface LeggKandidatTilKandidatlisteProps {
  kandidatId: string;
  stillingId: string;
}

const LeggKandidatTilKandidatliste: React.FC<
  LeggKandidatTilKandidatlisteProps
> = ({ kandidatId, stillingId }) => {
  const { track } = useUmami();
  const { visVarsel } = useApplikasjonContext();
  const [leggTilKandidatLoading, setLeggerTilKandidatLoading] =
    React.useState(false);

  const stillingsContext = useNullableStillingsContext();

  const kandidatListeInfo = useKandidatlisteInfo(
    stillingsContext?.stillingsData?.stillingsinfo,
  );
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
        kandidatListeInfo?.mutate();
      }, 1000);
    }
  };

  return (
    <Button
      onClick={leggTilKandidat}
      loading={leggTilKandidatLoading}
      icon={<PlusIcon />}
    >
      Legg til i listen
    </Button>
  );
};

export default LeggKandidatTilKandidatliste;
