import { endreUtfallForUsynligKandidat } from '@/app/api/kandidat/endreKandidatUtfall';
import { usynligKandidaterSchemaDTO } from '@/app/api/kandidat/schema.zod';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import FjernFåttJobbenKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/FjernFåttJobbenKnapp';
import RegistrerFåttJobbenKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/RegistrerFåttJobbenKnapp';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { MenuElipsisVerticalIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { useState, type FC } from 'react';

export interface KandidatListeKortValgUsynligKandidatProps {
  kandidat: usynligKandidaterSchemaDTO;
  kandidatlisteId: string;
}

const KandidatListeKortValgUsynligKandidat: FC<
  KandidatListeKortValgUsynligKandidatProps
> = ({ kandidat, kandidatlisteId }) => {
  const { valgtNavKontor } = useApplikasjonContext();
  const { stillingsData } = useStillingsContext();
  const { reFetchKandidatliste, lukketKandidatliste } =
    useKandidatlisteContext();
  const [loading, setLoading] = useState<boolean>(false);

  const endreUtfallForKandidat = async (utfall: KandidatutfallTyper) => {
    setLoading(true);
    try {
      await endreUtfallForUsynligKandidat(
        kandidatlisteId,
        kandidat.id,
        utfall,
        valgtNavKontor?.navKontor ?? '',
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
            data-color='neutral'
            variant='tertiary'
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
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
    </>
  );
};

export default KandidatListeKortValgUsynligKandidat;
