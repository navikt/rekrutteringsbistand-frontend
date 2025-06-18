import { RekbisError } from '../../../../../../util/rekbisError';
import { UmamiEvent } from '../../../../../../util/umamiEvents';
import { useForespurteOmDelingAvCv } from '../../../../../api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import {
  sendForespørselOmDelingAvCv,
  sendNyForespørselOmDelingAvCv,
} from '../../../../../api/foresporsel-om-deling-av-cv/foresporsler/forespørselOmDelingAvCv';
import { useApplikasjonContext } from '../../../../../providers/ApplikasjonContext';
import { useUmami } from '../../../../../providers/UmamiContext';
import { useStillingsContext } from '../../../StillingsContext';
import { useKandidatlisteContext } from '../../KandidatlisteContext';
import {
  CVAlleredeForespurtDeling,
  CVkandidaterMedUtløptFrist_IkkeSpurtPåNytt,
  CVKandidaterSvartJa,
  CVKandidaterSvartNei_IkkeSpurtPåNytt,
} from '../KandidatHendelser/hendelseUtil';
import { KandidatVisningProps } from '../KandidatlisteFilter/useFiltrerteKandidater';
import VelgSvarfrist from './VelgSvarfrist';
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
import { format } from 'date-fns';
import * as React from 'react';

export interface DelMedKandidatModalProps {
  markerteKandidater: KandidatVisningProps[];
  fjernAllMarkering: () => void;
  sidebar?: boolean;
}

const DelMedKandidatModal: React.FC<DelMedKandidatModalProps> = ({
  markerteKandidater,
  fjernAllMarkering,
  sidebar,
}) => {
  const { track } = useUmami();
  const { stillingsId } = useStillingsContext();
  const [modalErÅpen, setModalErÅpen] = React.useState(false);
  const [svarfrist, setSvarfrist] = React.useState<Date | undefined>(undefined);
  const { valgtNavKontor, visVarsel } = useApplikasjonContext();
  const { reFetchKandidatliste } = useKandidatlisteContext();
  const [loading, setLoading] = React.useState(false);

  const forespurteKandidaterHook = useForespurteOmDelingAvCv(stillingsId);

  const kandidaterSvartNei =
    CVKandidaterSvartNei_IkkeSpurtPåNytt(markerteKandidater);
  const kandidatFristUtløpt =
    CVkandidaterMedUtløptFrist_IkkeSpurtPåNytt(markerteKandidater);
  const kandidaterVenterPåSvar = CVAlleredeForespurtDeling(markerteKandidater);
  const harSvartJa = CVKandidaterSvartJa(markerteKandidater);

  const delCVpåNytt = [...kandidaterSvartNei, ...kandidatFristUtløpt].filter(
    (kandidat) => !harSvartJa.some((k) => k.aktørid === kandidat.aktørid),
  );

  const delFørsteGang = markerteKandidater.filter(
    (kandidat) =>
      !harSvartJa.some((k) => k.aktørid === kandidat.aktørid) &&
      !kandidaterSvartNei.some((k) => k.aktørid === kandidat.aktørid) &&
      !kandidatFristUtløpt.some((k) => k.aktørid === kandidat.aktørid) &&
      !kandidaterVenterPåSvar.some((k) => k.aktørid === kandidat.aktørid),
  );

  const sendForespørsel = async () => {
    const vanlgiDeling = delFørsteGang
      .map((kandidat) => kandidat.aktørid)
      .filter((id): id is string => id !== null);

    const delingPåNytt = delCVpåNytt.filter((kandidat) => kandidat.aktørid);
    if (svarfrist) {
      setLoading(true);
      try {
        if (vanlgiDeling.length > 0) {
          await sendForespørselOmDelingAvCv({
            stillingsId: stillingsId,
            svarfrist: format(svarfrist, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
            aktorIder: vanlgiDeling,
            navKontor: valgtNavKontor?.navKontor ?? '',
          });

          track(UmamiEvent.Stilling.del_stilling_med_kandidat, {
            antall: vanlgiDeling.length,
          });
        }

        if (delingPåNytt.length > 0) {
          const nyeForespørslerPromises = delingPåNytt.map((kandidat) =>
            sendNyForespørselOmDelingAvCv(kandidat.aktørid!, {
              stillingsId: stillingsId,
              svarfrist: format(svarfrist, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
              navKontor: valgtNavKontor?.navKontor ?? '',
            }),
          );

          track(UmamiEvent.Stilling.del_stilling_med_kandidat_påNytt, {
            antall: delingPåNytt.length,
          });

          await Promise.all(nyeForespørslerPromises);
        }

        visVarsel({
          tekst: 'Stillingen er delt med kandidatene',
          type: 'info',
        });
      } catch (error) {
        new RekbisError({
          beskrivelse: 'Feil ved deling av CV for kandidater',
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
          forespurteKandidaterHook.mutate();
          reFetchKandidatliste();
        }, 5000); // 5000 milliseconds = 5 seconds
      }
    }
  };

  const tabellStatus = (aktørId: string | null): string => {
    if (aktørId === null) {
      return 'Kan ikke spørre';
    }
    switch (true) {
      case harSvartJa.some((k) => k.aktørid === aktørId):
        return 'Har allerede svart ja';
      case kandidaterVenterPåSvar.some((k) => k.aktørid === aktørId):
        return 'Venter på svar';
      case kandidaterSvartNei.some((k) => k.aktørid === aktørId):
        return 'Har tidligere svart nei';
      case kandidatFristUtløpt.some((k) => k.aktørid === aktørId):
        return 'Frist utløpt';

      default:
        return 'Ikke spurt';
    }
  };
  return (
    <>
      <Button
        disabled={markerteKandidater.length === 0}
        onClick={() => setModalErÅpen(true)}
        variant={sidebar ? 'primary' : 'tertiary'}
        icon={<TasklistIcon title='Del med kandidat' />}
      >
        Spør om å dele CV
      </Button>
      <Modal
        open={modalErÅpen}
        aria-label='Del stillingen med de markerte kandidatene2'
        onClose={() => setModalErÅpen(false)}
        header={{
          heading: `Del med ${markerteKandidater.length} ${
            markerteKandidater.length === 1 ? 'kandidat' : 'kandidater'
          } i aktivitetsplanen`,
        }}
      >
        <Modal.Body>
          {kandidaterVenterPåSvar.length > 0 && (
            <Alert variant='info' size='small' className='mb-1'>
              {kandidaterVenterPåSvar.length}{' '}
              {kandidaterVenterPåSvar.length === 1 ? 'kandidat ' : 'kandidater'}
              har ikke svart på forespørselen.
            </Alert>
          )}
          {kandidaterSvartNei.length > 0 && (
            <Alert variant='error' size='small' className='mb-1'>
              {kandidaterSvartNei.length}{' '}
              {kandidaterSvartNei.length === 1 ? 'kandidat ' : 'kandidater'}
              har tidliger svart nei til å dele CV-en.
            </Alert>
          )}
          {kandidatFristUtløpt.length > 0 && (
            <Alert variant='warning' size='small' className='mb-1'>
              {kandidatFristUtløpt.length}{' '}
              {kandidatFristUtløpt.length === 1 ? 'kandidat ' : 'kandidater'}
              har tidligere fått spørsmål, men ikke svart innen fristen.
            </Alert>
          )}
          {harSvartJa.length > 0 && (
            <Alert variant='success' size='small' className='mb-1'>
              {harSvartJa.length}{' '}
              {harSvartJa.length === 1 ? 'kandidat ' : 'kandidater'}
              har allerede svart ja.
            </Alert>
          )}
          <Accordion size='small' headingSize='xsmall' className='my-4'>
            <Accordion.Item>
              <Accordion.Header>Vis kandidater</Accordion.Header>
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
                    {markerteKandidater?.map(
                      ({ fornavn, etternavn, fodselsnr, aktørid }, i) => {
                        return (
                          <Table.Row key={i}>
                            <Table.HeaderCell scope='row'>
                              {fornavn} {etternavn}
                            </Table.HeaderCell>
                            <Table.DataCell>{fodselsnr}</Table.DataCell>
                            <Table.DataCell>
                              {tabellStatus(aktørid)}
                            </Table.DataCell>
                          </Table.Row>
                        );
                      },
                    )}
                  </Table.Body>
                </Table>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>

          <BodyShort className='my-8'>
            <>
              {delFørsteGang.length > 0 &&
                `Deler for første gang stillingen med ${delFørsteGang.length} ${
                  delFørsteGang.length === 1 ? 'kandidat' : 'kandidater'
                }.`}
              {delCVpåNytt.length > 0 && (
                <>
                  <br />
                  {`Spør om deling på nytt for ${delCVpåNytt.length} ${
                    delCVpåNytt.length === 1 ? 'kandidat' : 'kandidater'
                  }.`}
                </>
              )}
            </>
          </BodyShort>
          <BodyLong className='my-8'>
            {`Det opprettes et stillingskort i Aktivitetsplanen. Kandidatene
                  vil bli varslet på SMS, og kan svare "ja" eller "nei" til at
                  CV-en skal bli delt med arbeidsgiver. Du vil se svaret i
                  kandidatlisten.`}
          </BodyLong>

          <VelgSvarfrist setValgtSvarfrist={setSvarfrist} />
          <Alert variant='info' className={'mt-8'}>
            Stillingsannonsen vil bli delt med kandidaten.
            <br /> Det er viktig at annonseteksten er informativ og lett å
            forstå.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!svarfrist || markerteKandidater.length === 0}
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
