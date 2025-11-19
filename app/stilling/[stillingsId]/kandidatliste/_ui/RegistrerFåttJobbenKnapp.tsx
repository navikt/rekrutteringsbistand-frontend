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
}

const RegistrerFåttJobbenKnapp: FC<RegistrerFåttJobbenKnappProps> = ({
  loading,
  lukketKandidatliste,
  endreUtfallForKandidat,
  actionMenu,
}) => {
  const { stillingsData, refetch, erEier } = useStillingsContext();
  const kandidatlisteForEier = useKandidatlisteForEier(stillingsData, erEier);

  const håndterKnappetrykk = async () => {
    endreUtfallForKandidat(KandidatutfallTyper.FATT_JOBBEN);

    await kandidatlisteForEier.mutate();
    refetch?.();
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
