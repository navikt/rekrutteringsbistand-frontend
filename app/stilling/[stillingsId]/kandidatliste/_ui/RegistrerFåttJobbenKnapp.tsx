import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import FullførStillingModal from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/FullførStillingModal';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { ClipboardCheckmarkIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { FC, useState } from 'react';


export interface RegistrerFåttJobbenKnappProps {
  lukketKandidatliste?: boolean;
  endreUtfallForKandidat: (utfall: KandidatutfallTyper) => void;
  loading?: boolean;
  actionMenu?: boolean;
}

const RegistrerFåttJobbenKnapp: FC<RegistrerFåttJobbenKnappProps> = ({
  loading,
  lukketKandidatliste,
  endreUtfallForKandidat,
  actionMenu,
}) => {
  const [visFullførStillingModal, setVisFullførStillingModal] = useState(false);
  const stillingsContext = useNullableStillingsContext();
  const kandidatlisteForEier = useKandidatlisteForEier(
    stillingsContext?.stillingsData,
    stillingsContext?.erEier,
  );

  const håndterKnappetrykk = async () => {
    endreUtfallForKandidat(KandidatutfallTyper.FATT_JOBBEN);

    await kandidatlisteForEier.mutate();
    stillingsContext?.refetchKandidatliste?.();

    const ikkeArkiverteKandidater =
      kandidatlisteForEier.data?.kandidater?.filter((k) => !k.arkivert) ?? [];

    const antallKandidaterSomHarFåttJobb =
    ikkeArkiverteKandidater.filter(
      (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
    ).length +
    (kandidatlisteForEier.data?.formidlingerAvUsynligKandidat?.filter(
      (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
    )?.length || 0);

    const antallStillinger = kandidatlisteForEier.data?.antallStillinger;

    setVisFullførStillingModal(antallStillinger === antallKandidaterSomHarFåttJobb);
  };

  if (actionMenu) {
    return (
      <ActionMenu.Item
        onSelect={() => endreUtfallForKandidat(KandidatutfallTyper.FATT_JOBBEN)}
      >
        <ClipboardCheckmarkIcon /> Registrer fått jobben
      </ActionMenu.Item>
    );
  }
  return (
    <>
      <Button
        size='small'
        variant='secondary'
        disabled={lukketKandidatliste}
        icon={<ClipboardCheckmarkIcon />}
        onClick={() => håndterKnappetrykk()}
        loading={loading}
      >
        Registrer fått jobben
      </Button>
      {visFullførStillingModal && <FullførStillingModal setVisModal={setVisFullførStillingModal}/>}
    </>
  );
};

export default RegistrerFåttJobbenKnapp;
