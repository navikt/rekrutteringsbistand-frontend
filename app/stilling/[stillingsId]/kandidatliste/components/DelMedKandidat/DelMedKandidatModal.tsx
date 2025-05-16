import { UmamiEvent } from '../../../../../../util/umamiEvents';
import { useForespurteOmDelingAvCv } from '../../../../../api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import {
  sendForespørselOmDelingAvCv,
  sendNyForespørselOmDelingAvCv,
} from '../../../../../api/foresporsel-om-deling-av-cv/foresporsler/forespørselOmDelingAvCv';
import { KandidatListeKandidatDTO } from '../../../../../api/kandidat/schema.zod';
import SWRLaster from '../../../../../components/SWRLaster';
import { useApplikasjonContext } from '../../../../../providers/ApplikasjonContext';
import { useUmami } from '../../../../../providers/UmamiContext';
import { useStillingsContext } from '../../../StillingsContext';
import { TilstandPåForespørsel } from '../../KandidatTyper';
import { useKandidatlisteContext } from '../../KandidatlisteContext';
import VelgSvarfrist from './VelgSvarfrist';
import { TasklistIcon } from '@navikt/aksel-icons';
import {
  Accordion,
  Alert,
  BodyShort,
  Button,
  Modal,
  Table,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { differenceInDays, format } from 'date-fns';
import * as React from 'react';

export interface DelMedKandidatModalProps {
  markerteKandidater: KandidatListeKandidatDTO[];
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
        <SWRLaster hooks={[forespurteKandidaterHook]}>
          {(forespurteKandidater) => {
            const harSvartNei = markerteKandidater.filter(
              (kandidat) =>
                kandidat.aktørid &&
                forespurteKandidater[kandidat.aktørid]?.[0]?.svar
                  ?.harSvartJa === false,
            );

            const fristUtløpt = markerteKandidater.filter((kandidat) => {
              const dagerTilSvarfrist =
                kandidat.aktørid &&
                forespurteKandidater[kandidat.aktørid]?.[0]?.svarfrist
                  ? differenceInDays(
                      new Date(
                        forespurteKandidater[kandidat.aktørid]?.[0]?.svarfrist,
                      ),
                      new Date(),
                    )
                  : null;

              return (
                kandidat.aktørid &&
                forespurteKandidater[kandidat.aktørid]?.[0]?.tilstand ===
                  TilstandPåForespørsel.AVBRUTT &&
                forespurteKandidater[kandidat.aktørid]?.[0]?.deltStatus ===
                  'SENDT' &&
                dagerTilSvarfrist !== null &&
                dagerTilSvarfrist < 0
              );
            });

            const harSvartNeiEllerUtløptFrist = markerteKandidater.filter(
              (k) =>
                harSvartNei.some((k2) => k2.aktørid === k.aktørid) ||
                fristUtløpt.some((k2) => k2.aktørid === k.aktørid),
            );

            const harIkkeBlittSpurtFør = markerteKandidater.filter(
              (k) =>
                !harSvartNeiEllerUtløptFrist.some(
                  (k2) => k2.aktørid === k.aktørid,
                ),
            );

            const harIkkeSvart = markerteKandidater.filter((kandidat) => {
              const dagerTilSvarfrist =
                kandidat.aktørid &&
                forespurteKandidater[kandidat.aktørid]?.[0]?.svarfrist
                  ? differenceInDays(
                      new Date(
                        forespurteKandidater[kandidat.aktørid]?.[0]?.svarfrist,
                      ),
                      new Date(),
                    )
                  : null;

              return (
                harSvartNeiEllerUtløptFrist.some(
                  (k2) => k2.aktørid !== kandidat.aktørid,
                ) &&
                dagerTilSvarfrist !== null &&
                dagerTilSvarfrist >= 0
              );
            });

            const sendForespørsel = async () => {
              if (svarfrist) {
                setLoading(true);
                try {
                  await sendForespørselOmDelingAvCv({
                    stillingsId: stillingsId,
                    svarfrist: format(
                      svarfrist,
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                    ),
                    aktorIder: harIkkeBlittSpurtFør
                      .filter((k) =>
                        harIkkeSvart.some((k2) => k2.aktørid === k.aktørid),
                      )
                      .map((kandidat) => kandidat.aktørid)
                      .filter((id): id is string => id !== null),
                    navKontor: valgtNavKontor?.navKontor ?? '',
                  });

                  track(UmamiEvent.Stilling.del_stilling_med_kandidat, {
                    antall: harIkkeBlittSpurtFør.length,
                  });

                  const nyeForespørslerPromises = harSvartNeiEllerUtløptFrist
                    .filter((kandidat) => kandidat.aktørid)
                    .map((kandidat) =>
                      sendNyForespørselOmDelingAvCv(kandidat.aktørid!, {
                        stillingsId: stillingsId,
                        svarfrist: format(
                          svarfrist,
                          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                        ),
                        navKontor: valgtNavKontor?.navKontor ?? '',
                      }),
                    );

                  track(UmamiEvent.Stilling.del_stilling_med_kandidat_påNytt, {
                    antall: harSvartNeiEllerUtløptFrist.length,
                  });

                  await Promise.all(nyeForespørslerPromises);

                  visVarsel({
                    tekst: 'Stillingen er delt med kandidatene',
                    type: 'info',
                  });
                } catch (error) {
                  logger.error('Feil ved deling av CV for kandidater', error);
                  visVarsel({
                    tekst:
                      'Det oppstod en feil ved deling av stilling til alle markerte kandidater',
                    type: 'error',
                  });
                } finally {
                  forespurteKandidaterHook.mutate();
                  setModalErÅpen(false);
                  fjernAllMarkering();
                  setLoading(false);
                  reFetchKandidatliste();
                }
              }
            };
            return (
              <>
                <Modal.Body>
                  {harIkkeSvart.length > 0 && (
                    <Alert variant='info' size='small'>
                      {harSvartNei.length}{' '}
                      {harSvartNei.length === 1 ? 'kandidat ' : 'kandidater'}
                      har ikke svart på forespørselen.
                    </Alert>
                  )}
                  {harSvartNei.length > 0 && (
                    <Alert variant='error' size='small'>
                      {harSvartNei.length}{' '}
                      {harSvartNei.length === 1 ? 'kandidat ' : 'kandidater'}
                      har tidliger svart nei til å dele CV-en.
                    </Alert>
                  )}
                  {fristUtløpt.length > 0 && (
                    <Alert variant='warning' size='small'>
                      {fristUtløpt.length}{' '}
                      {fristUtløpt.length === 1 ? 'kandidat ' : 'kandidater'}
                      har tidligere fått spørsmål, men ikke svart innen fristen.
                    </Alert>
                  )}
                  <Accordion size='small' headingSize='xsmall' className='my-4'>
                    <Accordion.Item>
                      <Accordion.Header>Vis kandidater</Accordion.Header>
                      <Accordion.Content>
                        <Table size='small'>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell scope='col'>
                                Navn
                              </Table.HeaderCell>
                              <Table.HeaderCell scope='col'>
                                Fødselsnr.
                              </Table.HeaderCell>
                              <Table.HeaderCell scope='col'>
                                Status
                              </Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {markerteKandidater?.map(
                              (
                                { fornavn, etternavn, fodselsnr, aktørid },
                                i,
                              ) => {
                                return (
                                  <Table.Row key={i}>
                                    <Table.HeaderCell scope='row'>
                                      {fornavn} {etternavn}
                                    </Table.HeaderCell>
                                    <Table.DataCell>{fodselsnr}</Table.DataCell>
                                    <Table.DataCell>
                                      {aktørid &&
                                      harSvartNei.some(
                                        (k) => k.aktørid === aktørid,
                                      )
                                        ? 'Har svart nei'
                                        : aktørid &&
                                            fristUtløpt.some(
                                              (k) => k.aktørid === aktørid,
                                            )
                                          ? 'Frist utløpt'
                                          : harIkkeSvart.some(
                                                (k) => k.aktørid === aktørid,
                                              )
                                            ? 'Ikke svart'
                                            : 'Ikke spurt'}
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
                    {`Det opprettes et stillingskort i Aktivitetsplanen. Kandidatene
                  vil bli varslet på SMS, og kan svare "ja" eller "nei" til at
                  CV-en skal bli delt med arbeidsgiver. Du vil se svaret i
                  kandidatlisten.`}
                  </BodyShort>

                  <VelgSvarfrist setValgtSvarfrist={setSvarfrist} />
                  <Alert variant='info' className={'mt-8'}>
                    Stillingsannonsen vil bli delt med kandidaten.
                    <br /> Det er viktig at annonseteksten er informativ og lett
                    å forstå.
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
              </>
            );
          }}
        </SWRLaster>
      </Modal>
    </>
  );
};
export default DelMedKandidatModal;
