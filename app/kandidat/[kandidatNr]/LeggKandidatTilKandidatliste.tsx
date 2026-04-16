import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { mutateKandidlisteKandidater } from '@/app/api/kandidat/useKandidlisteKandidater';
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
        mutateKandidlisteKandidater(stillingId);
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
