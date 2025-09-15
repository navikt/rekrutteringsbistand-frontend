import { endreUtfallKandidat } from '@/app/api/kandidat/endreKandidatUtfall';
import { KandidatListeKandidatDTO } from '@/app/api/kandidat/schema.zod';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import {
  EndreArkivertStatusKnapp,
  EndreArkivertStatusModal,
} from '@/app/stilling/[stillingsId]/kandidatliste/_ui/EndreArkivertStatusModal';
import FjernFåttJobbenKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/FjernFåttJobbenKnapp';
import RegistrerFåttJobbenKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/RegistrerFåttJobbenKnapp';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { MenuElipsisVerticalIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { useRef, useState, type FC } from 'react';

export interface KandidatListeKortValgProps {
  kandidat: KandidatListeKandidatDTO;
  kandidatlisteId: string;
}

const KandidatListeKortValg: FC<KandidatListeKortValgProps> = ({
  kandidat,
  kandidatlisteId,
}) => {
  const { valgtNavKontor } = useApplikasjonContext();
  const { stillingsData } = useStillingsContext();
  const { reFetchKandidatliste, lukketKandidatliste } =
    useKandidatlisteContext();
  const [loading, setLoading] = useState<boolean>(false);
  const modalRef = useRef<HTMLDialogElement>(null!);

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
      new RekbisError({ message: 'Feil ved endring av utfall', error });
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
            {stillingsData.stillingsinfo?.stillingskategori !==
              Stillingskategori.Jobbmesse && (
              <>
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
              </>
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
