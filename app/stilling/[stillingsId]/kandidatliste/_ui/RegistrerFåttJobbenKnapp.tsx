import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { ClipboardCheckmarkIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { FC } from 'react';

export interface RegistrerFåttJobbenKnappProps {
  lukketKandidatliste?: boolean;
  endreUtfallForKandidat: (utfall: KandidatutfallTyper) => void;
  loading?: boolean;
  actionMenu?: boolean;
  visFullførStillingModal?: (open: boolean) => void;
}

const RegistrerFåttJobbenKnapp: FC<RegistrerFåttJobbenKnappProps> = ({
  loading,
  lukketKandidatliste,
  endreUtfallForKandidat,
  actionMenu,
  visFullførStillingModal,
}) => {
  const { stillingsData, refetch, erEier } = useStillingsContext();
  const kandidatlisteForEier = useKandidatlisteForEier(stillingsData, erEier);

  const håndterKnappetrykk = async () => {
    endreUtfallForKandidat(KandidatutfallTyper.FATT_JOBBEN);

    await kandidatlisteForEier.mutate();
    refetch?.();

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
    const alleStillingerBesatt = antallStillinger ? antallKandidaterSomHarFåttJobb >= antallStillinger : false;

    if (visFullførStillingModal && alleStillingerBesatt) {
      visFullførStillingModal(true);
    }
  };

  if (actionMenu) {
    return (
      <>
        <ActionMenu.Item onSelect={() => håndterKnappetrykk()}>
          <ClipboardCheckmarkIcon /> Registrer fått jobben
        </ActionMenu.Item>
      </>
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
    </>
  );
};

export default RegistrerFåttJobbenKnapp;
