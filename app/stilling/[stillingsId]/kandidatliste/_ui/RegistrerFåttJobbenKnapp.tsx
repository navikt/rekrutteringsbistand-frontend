import {
  mutateKandidlisteKandidater,
  useKandidlisteKandidater,
} from '@/app/api/kandidat/useKandidlisteKandidater';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { CheckmarkCircleIcon } from '@navikt/aksel-icons';
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
  const { stillingsData, refetch, erEier, omStilling } = useStillingsContext();
  const kandidatlisteForEier = useKandidlisteKandidater(stillingsData, erEier, {
    antallPerSide: 500,
  });

  const håndterKnappetrykk = async () => {
    endreUtfallForKandidat(KandidatutfallTyper.FATT_JOBBEN);

    await mutateKandidlisteKandidater(stillingsData.stilling.uuid);
    refetch?.();

    const ikkeArkiverteKandidater =
      kandidatlisteForEier.data?.kandidatPersoner
        ?.map((p) => p.kandidat)
        .filter((k) => !k.arkivert) ?? [];
    const antallKandidaterSomHarFåttJobb =
      ikkeArkiverteKandidater.filter(
        (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
      ).length +
      (kandidatlisteForEier.data?.kandidatPersoner
        ?.map((p) => p.formidlingerAvUsynligKandidat)
        .filter((f): f is NonNullable<typeof f> => f !== null)
        .filter((k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN)?.length ||
        0);
    const antallStillinger = omStilling.antallStillinger;
    const alleStillingerBesatt = antallStillinger
      ? antallKandidaterSomHarFåttJobb >= antallStillinger
      : false;

    if (visFullførStillingModal && alleStillingerBesatt) {
      visFullførStillingModal(true);
    }
  };

  if (actionMenu) {
    return (
      <>
        <ActionMenu.Item onSelect={() => håndterKnappetrykk()}>
          <CheckmarkCircleIcon /> Registrer fått jobben
        </ActionMenu.Item>
      </>
    );
  }

  return (
    <Button
      size='small'
      variant='secondary'
      disabled={lukketKandidatliste}
      icon={<CheckmarkCircleIcon />}
      onClick={() => håndterKnappetrykk()}
      loading={loading}
    >
      Registrer fått jobben
    </Button>
  );
};

export default RegistrerFåttJobbenKnapp;
