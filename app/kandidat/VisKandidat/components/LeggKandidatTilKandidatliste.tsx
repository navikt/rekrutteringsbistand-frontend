import { UmamiEvent } from '../../../../util/umamiEvents';
import { leggTilKandidater } from '../../../api/kandidat-sok/leggTilKandidat';
import { useApplikasjonContext } from '../../../providers/ApplikasjonContext';
import { useUmami } from '../../../providers/UmamiContext';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

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
