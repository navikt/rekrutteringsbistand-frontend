import { endreUtfallKandidat } from '../../../../../api/kandidat/endreKandidatUtfall';
import { useApplikasjonContext } from '../../../../../providers/ApplikasjonContext';
import { useStillingsContext } from '../../../StillingsContext';
import { KandidatutfallTyper } from '../../KandidatTyper';
import { useKandidatlisteContext } from '../../KandidatlisteContext';
import DelMedArbeidsgiver from '../DelMedArbeidsgiver/DelMedArbeidsgiver';
import DelMedKandidatModal from '../DelMedKandidat/DelMedKandidatModal';
import FjernFåttJobbenKnapp from '../FjernFåttJobbenKnapp';
import KandidatHendelseTag from '../KandidatHendelseTag';
import KandidatHendelser from '../KandidatHendelser/KandidatHendelser';
import { KandidatVisningProps } from '../KandidatlisteFilter/useFiltrerteKandidater';
import RegistrerFåttJobbenKnapp from '../RegistrerFåttJobbenKnapp';
import SendSmsModal from '../SendSMS/SendSmsModal';
import SletteKandidatKnapp from '../SlettKandidatModal';
import VelgInternStatus from '../VelgInternStatus';
import { Accordion, Box } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
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
      // setFeilDialog(
      //   error instanceof Error ? error.message : 'En ukjent feil oppstod',
      // );
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
            <KandidatHendelseTag
              sidebar
              kandidatHendelse={kandidat.kandidatHendelser.sisteAktivitet}
            />
          </div>
          <div>
            {kandidatlisteInfo && (
              <VelgInternStatus
                lukketKandidatliste={
                  kandidatlisteInfo.kandidatlisteStatus === 'LUKKET'
                }
                kandidatlisteId={kandidatlisteInfo?.kandidatlisteId}
                kandidatnr={kandidat.kandidatnr}
                status={kandidat.status}
              />
            )}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <DelMedKandidatModal
            markerteKandidater={[kandidat]}
            fjernAllMarkering={() => {}}
            sidebar
          />

          <DelMedArbeidsgiver markerteKandidater={[kandidat]} sidebar />
        </div>

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
          <div className='flex flex-1 justify-end'>
            <SletteKandidatKnapp
              tittel={'Slett'}
              kandidat={kandidat}
              kandidatlisteId={kandidatlisteId}
              lukketKandidatliste={lukketKandidatliste}
            />
          </div>
        </div>

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
