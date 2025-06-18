import { RekbisError } from '../../../../../../util/rekbisError';
import { endreUtfallKandidat } from '../../../../../api/kandidat/endreKandidatUtfall';
import { useApplikasjonContext } from '../../../../../providers/ApplikasjonContext';
import { useStillingsContext } from '../../../StillingsContext';
import { KandidatutfallTyper } from '../../KandidatTyper';
import { useKandidatlisteContext } from '../../KandidatlisteContext';
import DelMedArbeidsgiver from '../DelMedArbeidsgiver/DelMedArbeidsgiver';
import DelMedKandidatModal from '../DelMedKandidat/DelMedKandidatModal';
import {
  EndreArkivertStatusKnapp,
  EndreArkivertStatusModal,
} from '../EndreArkivertStatusModal';
import FjernDelingMedArbeidsgiver from '../FjernDelingMedArbeidsgiver';
import FjernFåttJobbenKnapp from '../FjernFåttJobbenKnapp';
import KandidatHendelseTag, { SlettetTag } from '../KandidatHendelseTagVisning';
import { KandidatHendelseType } from '../KandidatHendelser/KandidatHendelseTag';
import KandidatHendelser from '../KandidatHendelser/KandidatHendelser';
import { KandidatVisningProps } from '../KandidatlisteFilter/useFiltrerteKandidater';
import RegistrerFåttJobbenKnapp from '../RegistrerFåttJobbenKnapp';
import SendSmsModal from '../SendSMS/SendSmsModal';
import VelgInternStatus from '../VelgInternStatus';
import { Accordion, Box } from '@navikt/ds-react';
import * as React from 'react';

export interface KandidatHandlingerForStillingProps {
  kandidat: KandidatVisningProps;
}

const KandidatHandlingerForStilling: React.FC<
  KandidatHandlingerForStillingProps
> = ({ kandidat }) => {
  const { valgtNavKontor } = useApplikasjonContext();
  const { stillingsData, kandidatlisteInfo } = useStillingsContext();
  const { reFetchKandidatliste, lukketKandidatliste, kandidatlisteId } =
    useKandidatlisteContext();
  const [loading, setLoading] = React.useState<boolean>(false);
  const modalRef = React.useRef<HTMLDialogElement>(null!);

  const cvDeltMedArbeidsgiver =
    kandidat.kandidatHendelser.utfallsendringer?.some(
      (endring) =>
        'sendtTilArbeidsgiversKandidatliste' in endring.raw &&
        endring.raw.sendtTilArbeidsgiversKandidatliste,
    );

  const fåttJobben = kandidat.utfall === KandidatutfallTyper.FATT_JOBBEN;

  const cvFjernetFraArbeidsgiver =
    kandidat.kandidatHendelser.utfallsendringer?.some(
      (cv) => cv.tekst === KandidatHendelseType.CV_slettet_hos_arbeidsgiver,
    );

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

  return (
    <Box.New
      borderColor='neutral-subtleA'
      borderWidth='1'
      padding='4'
      borderRadius='xlarge'
    >
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <div>
            <div className='mb-2'>{stillingsData.stilling.title}</div>
            {kandidat.arkivert ? (
              <SlettetTag kandidat={kandidat} />
            ) : (
              <KandidatHendelseTag
                sidebar
                kandidatHendelse={kandidat.kandidatHendelser.sisteHendelse}
              />
            )}
          </div>
          <div>
            {kandidatlisteInfo && (
              <VelgInternStatus
                lukketKandidatliste={
                  kandidatlisteInfo.kandidatlisteStatus === 'LUKKET'
                }
                kandidatnr={kandidat.kandidatnr}
                status={kandidat.status}
              />
            )}
          </div>
        </div>
        {!kandidat.arkivert &&
          !fåttJobben &&
          !cvDeltMedArbeidsgiver &&
          !cvFjernetFraArbeidsgiver && (
            <div className='grid grid-cols-2 gap-2'>
              <DelMedKandidatModal
                markerteKandidater={[kandidat]}
                fjernAllMarkering={() => {}}
                sidebar
              />

              <DelMedArbeidsgiver markerteKandidater={[kandidat]} sidebar />
            </div>
          )}

        {kandidat.arkivert ? (
          <EndreArkivertStatusKnapp
            lukketKandidatliste={lukketKandidatliste}
            slettet={kandidat.arkivert}
            modalRef={modalRef}
          />
        ) : (
          <div className='flex gap-2 border-t-2 pt-4'>
            <SendSmsModal
              markerteKandidater={[kandidat]}
              fjernAllMarkering={() => {}}
              sidebar
            />
            <div>
              {kandidat.utfall !== KandidatutfallTyper.FATT_JOBBEN ? (
                <RegistrerFåttJobbenKnapp
                  loading={loading}
                  endreUtfallForKandidat={endreUtfallForKandidat}
                  lukketKandidatliste={lukketKandidatliste}
                />
              ) : (
                <FjernFåttJobbenKnapp
                  loading={loading}
                  endreUtfallForKandidat={endreUtfallForKandidat}
                  lukketKandidatliste={lukketKandidatliste}
                />
              )}
            </div>
            {cvDeltMedArbeidsgiver && (
              <FjernDelingMedArbeidsgiver
                kandidatnummer={kandidat.kandidatnr}
                navKontor={valgtNavKontor?.navKontor ?? null}
              />
            )}
            <div className='flex flex-1 justify-end'>
              <EndreArkivertStatusKnapp
                lukketKandidatliste={lukketKandidatliste}
                slettet={kandidat.arkivert}
                modalRef={modalRef}
              />
            </div>
          </div>
        )}
        <EndreArkivertStatusModal
          modalRef={modalRef}
          kandidat={kandidat}
          kandidatlisteId={kandidatlisteId}
        />
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>Vis alle hendelser og varsler</Accordion.Header>
            <Accordion.Content>
              <KandidatHendelser
                kandidatHendelser={kandidat.kandidatHendelser}
              />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </Box.New>
  );
};

export default KandidatHandlingerForStilling;
