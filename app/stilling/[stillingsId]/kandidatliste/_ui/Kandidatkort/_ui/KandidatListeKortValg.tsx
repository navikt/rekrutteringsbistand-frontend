import { endreUtfallKandidat } from '@/app/api/kandidat/endreKandidatUtfall';
import NavigerTilAktivitetsplanenKnapp from '@/app/kandidat/_ui/ActionLinks/NavigerTilAktivitetsplanenKnapp';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import FullførStillingModal from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/fullfør-oppdrag/FullførStillingModal';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { EndreArkivertStatusKnapp } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/EndreArkivertStatusModal';
import FjernFåttJobbenKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/FjernFåttJobbenKnapp';
import { KandidatVisningProps } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatlisteFilter/useFiltrerteKandidater';
import RegistrerFåttJobbenKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/RegistrerFåttJobbenKnapp';
import SendSmsKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/SendSMS/SendSmsKnapp';
import SendSmsModal from '@/app/stilling/[stillingsId]/kandidatliste/_ui/SendSMS/SendSmsModal';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { MenuElipsisVerticalIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { useState, type FC } from 'react';

export interface KandidatListeKortValgProps {
  kandidat: KandidatVisningProps;
  kandidatlisteId: string;
}

const KandidatListeKortValg: FC<KandidatListeKortValgProps> = ({
  kandidat,
  kandidatlisteId,
}) => {
  const { valgtNavKontor } = useApplikasjonContext();
  const { stillingsData } = useStillingsContext();
  const { reFetchKandidatliste, lukketKandidatliste, visArkiveringsmodal } =
    useKandidatlisteContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [visFullførStillingModal, setVisFullførStillingModal] = useState(false);
  const [visSendSmsModal, setVisSendSmsModal] = useState(false);

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

  const erKandidatSlettet = kandidat.arkivert;

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
            <NavigerTilAktivitetsplanenKnapp
              actionMenu
              fnr={kandidat.fodselsnr}
            />
          </ActionMenu.Group>
          <ActionMenu.Group label={''}>
            {stillingsData.stillingsinfo?.stillingskategori !==
              Stillingskategori.Jobbmesse &&
              !erKandidatSlettet && (
                <>
                  {kandidat.utfall !== KandidatutfallTyper.FATT_JOBBEN ? (
                    <RegistrerFåttJobbenKnapp
                      actionMenu
                      loading={loading}
                      endreUtfallForKandidat={endreUtfallForKandidat}
                      lukketKandidatliste={lukketKandidatliste}
                      visFullførStillingModal={setVisFullførStillingModal}
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
            {kandidat.fodselsnr != null && !erKandidatSlettet && (
              <>
                <SendSmsKnapp
                  markerteKandidater={[kandidat]}
                  actionMenu
                  setVisSendSmsModal={setVisSendSmsModal}
                />
                <ActionMenu.Divider />
              </>
            )}

            <EndreArkivertStatusKnapp
              actionMenu
              lukketKandidatliste={lukketKandidatliste}
              slettet={kandidat.arkivert}
              onClick={() => visArkiveringsmodal(kandidat)}
            />
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
      {visFullførStillingModal && (
        <FullførStillingModal
          setVisModal={() => setVisFullførStillingModal(false)}
        />
      )}
      {visSendSmsModal && (
        <SendSmsModal
          markerteKandidater={[kandidat]}
          fjernAllMarkering={() => {}}
          setVisSendSmsModal={() => setVisSendSmsModal(false)}
        />
      )}
    </>
  );
};

export default KandidatListeKortValg;
