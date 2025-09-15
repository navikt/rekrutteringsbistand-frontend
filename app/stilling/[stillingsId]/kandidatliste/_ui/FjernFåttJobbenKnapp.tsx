import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { MinusCircleIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { FC } from 'react';

export interface FjernFåttJobbenKnappProps {
  endreUtfallForKandidat: (utfall: KandidatutfallTyper) => void;
  loading: boolean;
  lukketKandidatliste?: boolean;
  actionMenu?: boolean;
}

const FjernFåttJobbenKnapp: FC<FjernFåttJobbenKnappProps> = ({
  endreUtfallForKandidat,
  loading,
  lukketKandidatliste,
  actionMenu,
}) => {
  if (actionMenu) {
    if (actionMenu) {
      return (
        <ActionMenu.Item
          onSelect={() =>
            endreUtfallForKandidat(KandidatutfallTyper.PRESENTERT)
          }
        >
          <MinusCircleIcon /> Fjern registrer fått jobben
        </ActionMenu.Item>
      );
    }
  }

  return (
    <Button
      disabled={lukketKandidatliste}
      icon={<MinusCircleIcon />}
      variant='tertiary'
      size='small'
      className='self-center'
      loading={loading}
      onClick={() => endreUtfallForKandidat(KandidatutfallTyper.PRESENTERT)}
    >
      Fjern fått jobben registreringen
    </Button>
  );
};

export default FjernFåttJobbenKnapp;
