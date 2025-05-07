import { endreUtfallKandidat } from '../../../../../../api/kandidat/endreKandidatUtfall';
import { kandidaterSchemaDTO } from '../../../../../../api/kandidat/schema.zod';
import { useApplikasjonContext } from '../../../../../../providers/ApplikasjonContext';
import { KandidatutfallTyper } from '../../../KandidatTyper';
import { useKandidatlisteContext } from '../../../KandidatlisteContext';
import EndreArkivertStatusModal from '../../EndreArkivertStatusModal';
import FjernFåttJobbenKnapp from '../../FjernFåttJobbenKnapp';
import RegistrerFåttJobbenKnapp from '../../RegistrerFåttJobbenKnapp';
import { MenuElipsisVerticalIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import * as React from 'react';

export interface KandidatListeKortValgProps {
  kandidat: kandidaterSchemaDTO;
  kandidatlisteId: string;
}

const KandidatListeKortValg: React.FC<KandidatListeKortValgProps> = ({
  kandidat,
  kandidatlisteId,
}) => {
  const { valgtNavKontor } = useApplikasjonContext();
  const { reFetchKandidatliste, lukketKandidatliste } =
    useKandidatlisteContext();
  const [loading, setLoading] = React.useState<boolean>(false);

  const endreUtfallForKandidat = async (utfall: KandidatutfallTyper) => {
    setLoading(true);
    try {
      await endreUtfallKandidat(
        utfall,
        valgtNavKontor?.navKontor ?? '',
        kandidatlisteId,
        kandidat.kandidatnr,
      );
      reFetchKandidatliste();
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  if (lukketKandidatliste) {
    return null;
  }
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          variant='tertiary-neutral'
          icon={<MenuElipsisVerticalIcon title='Saksmeny' />}
          size='small'
        />
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label={''}>
          {kandidat.utfall !== KandidatutfallTyper.FATT_JOBBEN ? (
            <RegistrerFåttJobbenKnapp
              actionMenu
              loading={loading}
              endreUtfallForKandidat={endreUtfallForKandidat}
              lukketKandidatliste={lukketKandidatliste}
            />
          ) : (
            <FjernFåttJobbenKnapp
              actionMenu
              loading={loading}
              endreUtfallForKandidat={endreUtfallForKandidat}
              lukketKandidatliste={lukketKandidatliste}
            />
          )}

          <ActionMenu.Divider />

          <EndreArkivertStatusModal
            actionMenu
            kandidat={kandidat}
            kandidatlisteId={kandidatlisteId}
            lukketKandidatliste={lukketKandidatliste}
          />
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

export default KandidatListeKortValg;
