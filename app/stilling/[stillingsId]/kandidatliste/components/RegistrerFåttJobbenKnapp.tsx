import { KandidatutfallTyper } from '../KandidatTyper';
import { ClipboardCheckmarkIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import * as React from 'react';

export interface RegistrerFåttJobbenKnappProps {
  lukketKandidatliste?: boolean;
  endreUtfallForKandidat: (utfall: KandidatutfallTyper) => void;
  loading?: boolean;
  actionMenu?: boolean;
}

const RegistrerFåttJobbenKnapp: React.FC<RegistrerFåttJobbenKnappProps> = ({
  loading,
  lukketKandidatliste,
  endreUtfallForKandidat,
  actionMenu,
}) => {
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
    <Button
      size='small'
      variant='secondary'
      disabled={lukketKandidatliste}
      icon={<ClipboardCheckmarkIcon />}
      onClick={() => endreUtfallForKandidat(KandidatutfallTyper.FATT_JOBBEN)}
      loading={loading}
    >
      Registrer fått jobben
    </Button>
  );
};

export default RegistrerFåttJobbenKnapp;
