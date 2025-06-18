import { RekbisError } from '../../../../../../../util/rekbisError';
import { endreUtfallKandidat } from '../../../../../../api/kandidat/endreKandidatUtfall';
import { KandidatListeKandidatDTO } from '../../../../../../api/kandidat/schema.zod';
import { useApplikasjonContext } from '../../../../../../providers/ApplikasjonContext';
import { KandidatutfallTyper } from '../../../KandidatTyper';
import { useKandidatlisteContext } from '../../../KandidatlisteContext';
import {
  EndreArkivertStatusKnapp,
  EndreArkivertStatusModal,
} from '../../EndreArkivertStatusModal';
import FjernFåttJobbenKnapp from '../../FjernFåttJobbenKnapp';
import RegistrerFåttJobbenKnapp from '../../RegistrerFåttJobbenKnapp';
import { MenuElipsisVerticalIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatListeKortValgProps {
  kandidat: KandidatListeKandidatDTO;
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
  const modalRef = React.useRef<HTMLDialogElement>(null!);

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
      new RekbisError({ error });
    }
    setLoading(false);
  };

  if (lukketKandidatliste) {
    return null;
  }
  return (
    <>
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

            <EndreArkivertStatusKnapp
              actionMenu
              lukketKandidatliste={lukketKandidatliste}
              slettet={kandidat.arkivert}
              modalRef={modalRef}
            />
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
      <EndreArkivertStatusModal
        modalRef={modalRef}
        kandidat={kandidat}
        kandidatlisteId={kandidatlisteId}
      />
    </>
  );
};

export default KandidatListeKortValg;
