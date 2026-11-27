import VelgSvarfrist from './VelgSvarfrist';
import {
  sendForespørselOmDelingAvCv,
  sendNyForespørselOmDelingAvCv,
} from '@/app/api/foresporsel-om-deling-av-cv/foresporsler/forespørselOmDelingAvCv';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import {
  cvDelingStatus,
  CvDelingStatus,
} from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/hendelseUtil';
import { KandidatVisningProps } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatlisteFilter/useFiltrerteKandidater';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import { TasklistIcon } from '@navikt/aksel-icons';
import {
  Accordion,
  Alert,
  BodyLong,
  BodyShort,
  Button,
  Modal,
  Table,
} from '@navikt/ds-react';
import { endOfDay, format } from 'date-fns';
import { useState, type FC } from 'react';

export interface DelMedKandidatModalProps {
  markerteKandidater: KandidatVisningProps[];
  fjernAllMarkering: () => void;
  sidebar?: boolean;
}

const antallJobbsøkere = (antall: number) =>
  `${antall} ${antall === 1 ? 'jobbsøker' : 'jobbsøkere'}`;

const DelMedKandidatModal: FC<DelMedKandidatModalProps> = ({
  markerteKandidater,
  fjernAllMarkering,
}) => {
  const { track } = useUmami();
  const { stillingsId } = useStillingsContext();
  const [modalErÅpen, setModalErÅpen] = useState(false);
  const [svarfrist, setSvarfrist] = useState<Date | undefined>(undefined);
  const { valgtNavKontor, visVarsel } = useApplikasjonContext();
  const { reFetchKandidatliste } = useKandidatlisteContext();
  const [loading, setLoading] = useState(false);

  const kandidaterMedStatus = (status: CvDelingStatus) =>
    markerteKandidater.filter((k) => cvDelingStatus(k) === status);

  const kandidaterVenterPåSvar = kandidaterMedStatus(
    CvDelingStatus.VENTER_PÅ_SVAR,
  );
  const kandidaterSvartNei = kandidaterMedStatus(CvDelingStatus.SVART_NEI);
  const kandidaterFristUtløpt = kandidaterMedStatus(
    CvDelingStatus.FRIST_UTLØPT,
  );
  const kandidaterSvartJa = kandidaterMedStatus(CvDelingStatus.SVART_JA);

  const aktørIder = (kandidater: KandidatVisningProps[]) =>
    kandidater.map((k) => k.aktørid).filter((id): id is string => id !== null);

  const delFørsteGang = aktørIder(
    kandidaterMedStatus(CvDelingStatus.IKKE_SPURT),
  );
  const delPåNytt = aktørIder([
    ...kandidaterSvartNei,
    ...kandidaterFristUtløpt,
  ]);

  const sendForespørsel = async () => {
    if (!svarfrist || loading) {
      return;
    }
    const formatertSvarfrist = format(
      endOfDay(svarfrist),
      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
    );
    const navKontor = valgtNavKontor?.navKontor ?? '';

    setLoading(true);
    try {
      if (delFørsteGang.length > 0) {
        await sendForespørselOmDelingAvCv({
          stillingsId,
          svarfrist: formatertSvarfrist,
          aktorIder: delFørsteGang,
          navKontor,
        });
        track(UmamiEvent.Stilling.del_stilling_med_kandidat, {
          antall: delFørsteGang.length,
        });
      }

      if (delPåNytt.length > 0) {
        track(UmamiEvent.Stilling.del_stilling_med_kandidat_påNytt, {
          antall: delPåNytt.length,
        });
        await Promise.all(
          delPåNytt.map((aktørId) =>
            sendNyForespørselOmDelingAvCv(aktørId, {
              stillingsId,
              svarfrist: formatertSvarfrist,
              navKontor,
            }),
          ),
        );
      }

      visVarsel({
        tekst: 'Stillingen er delt med kandidatene',
        type: 'info',
      });
    } catch (error) {
      if (error instanceof RekbisError && error.statuskode === 409) {
        visVarsel({
          tekst: 'Forespørselen om deling av CV er allerede sendt',
          type: 'info',
        });
        return;
      }
      new RekbisError({
        message: 'Feil ved deling av CV for kandidater',
        error,
      });
      visVarsel({
        tekst:
          'Det oppstod en feil ved deling av stilling til alle markerte kandidater',
        type: 'error',
      });
    } finally {
      fjernAllMarkering();
      setModalErÅpen(false);
      setLoading(false);
      setTimeout(() => {
        reFetchKandidatliste();
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  };

  const statusTekst: Record<CvDelingStatus, string> = {
    [CvDelingStatus.SVART_JA]: 'Har allerede svart ja',
    [CvDelingStatus.VENTER_PÅ_SVAR]: 'Venter på svar',
    [CvDelingStatus.SVART_NEI]: 'Har tidligere svart nei',
    [CvDelingStatus.FRIST_UTLØPT]: 'Frist utløpt',
    [CvDelingStatus.IKKE_SPURT]: 'Ikke spurt',
  };

  const tabellStatus = (kandidat: KandidatVisningProps): string =>
    kandidat.aktørid === null
      ? 'Kan ikke spørre'
      : statusTekst[cvDelingStatus(kandidat)];
  return (
    <>
      <Button
        disabled={markerteKandidater.length === 0}
        onClick={() => setModalErÅpen(true)}
        size='xsmall'
        variant='primary'
        icon={<TasklistIcon title='Del med jobbsøker' />}
      >
        <span className='hidden lg:inline'>Spør om å dele CV</span>
      </Button>
      <Modal
        open={modalErÅpen}
        aria-label='Del stillingen med de markerte jobbsøkere'
        onClose={() => setModalErÅpen(false)}
        header={{
          heading: `Del med ${antallJobbsøkere(markerteKandidater.length)} i aktivitetsplanen`,
        }}
      >
        <Modal.Body>
          {kandidaterVenterPåSvar.length > 0 && (
            <Alert variant='info' size='small' className='mb-1'>
              {antallJobbsøkere(kandidaterVenterPåSvar.length)} har ikke svart
              på forespørselen.
            </Alert>
          )}
          {kandidaterSvartNei.length > 0 && (
            <Alert variant='error' size='small' className='mb-1'>
              {antallJobbsøkere(kandidaterSvartNei.length)} har tidligere svart
              nei til å dele CV-en.
            </Alert>
          )}
          {kandidaterFristUtløpt.length > 0 && (
            <Alert variant='warning' size='small' className='mb-1'>
              {antallJobbsøkere(kandidaterFristUtløpt.length)} har tidligere
              fått spørsmål, men ikke svart innen fristen.
            </Alert>
          )}
          {kandidaterSvartJa.length > 0 && (
            <Alert variant='success' size='small' className='mb-1'>
              {antallJobbsøkere(kandidaterSvartJa.length)} har allerede svart
              ja.
            </Alert>
          )}
          <Accordion size='small' className='my-4'>
            <Accordion.Item>
              <Accordion.Header>Vis jobbsøkere</Accordion.Header>
              <Accordion.Content>
                <Table size='small'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell scope='col'>Navn</Table.HeaderCell>
                      <Table.HeaderCell scope='col'>
                        Fødselsnr.
                      </Table.HeaderCell>
                      <Table.HeaderCell scope='col'>Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {markerteKandidater.map((kandidat, i) => (
                      <Table.Row key={i}>
                        <Table.HeaderCell scope='row'>
                          {kandidat.fornavn} {kandidat.etternavn}
                        </Table.HeaderCell>
                        <Table.DataCell>{kandidat.fodselsnr}</Table.DataCell>
                        <Table.DataCell>
                          {tabellStatus(kandidat)}
                        </Table.DataCell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>

          <BodyShort className='my-8'>
            {delFørsteGang.length > 0 &&
              `Deler for første gang stillingen med ${antallJobbsøkere(delFørsteGang.length)}.`}
            {delPåNytt.length > 0 && (
              <>
                <br />
                {`Spør om deling på nytt for ${antallJobbsøkere(delPåNytt.length)}.`}
              </>
            )}
          </BodyShort>
          <BodyLong className='my-8'>
            {`Det opprettes et stillingskort i Aktivitetsplanen. Jobbsøkere
                  vil bli varslet på SMS, og kan svare "ja" eller "nei" til at
                  CV-en skal bli delt med arbeidsgiver. Du vil se svaret i
                  kandidatlisten.`}
          </BodyLong>

          <VelgSvarfrist setValgtSvarfrist={setSvarfrist} />
          <Alert variant='info' className={'mt-8'}>
            Stillingsoppdraget vil bli delt med jobbsøker.
            <br /> Det er viktig at annonseteksten er informativ og lett å
            forstå.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={
              !svarfrist || delFørsteGang.length + delPåNytt.length === 0
            }
            onClick={sendForespørsel}
            variant='primary'
            loading={loading}
          >
            Del stilling
          </Button>
          <Button
            disabled={loading}
            variant='secondary'
            onClick={() => setModalErÅpen(false)}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DelMedKandidatModal;
