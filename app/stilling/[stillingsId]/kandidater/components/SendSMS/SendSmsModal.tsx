import {
  Accordion,
  Alert,
  BodyShort,
  Button,
  Label,
  Modal,
  Select,
  Table,
} from '@navikt/ds-react';

import { MobileIcon } from '@navikt/aksel-icons';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { kandidaterSchemaDTO } from '../../../../../api/kandidat/schema.zod';
import {
  MeldingsmalerDTO,
  useHentMeldingsmaler,
} from '../../../../../api/kandidatvarsel/hentMeldingsmaler';
import {
  Meldingsmal,
  usePostSmsTilKandidater,
  useSmserForStilling,
} from '../../../../../api/kandidatvarsel/kandidatvarsel';
import { useVisVarsling } from '../../../../../components/varsling/Varsling';
import { Stillingskategori } from '../../../../stilling-typer';
import css from './SendSmsModal.module.css';

type Props = {
  markerteKandidater: kandidaterSchemaDTO[];
  fjernAllMarkering: () => void;
  stillingId: string;
  stillingskategori: string | null;
};

const SendSmsModal: FunctionComponent<Props> = (props) => {
  const {
    stillingId,
    stillingskategori,
    fjernAllMarkering,
    markerteKandidater,
  } = props;
  const visVarsling = useVisVarsling();

  const [vis, setVis] = useState(false);
  const { data: smser = {} } = useSmserForStilling(
    stillingskategori === 'FORMIDLING' ? null : stillingId,
  );

  const postSmsTilKandidater = usePostSmsTilKandidater();
  const [sendSmsLoading, setSendSmsLoading] = useState(false);

  const kandidaterSomHarFåttSms = markerteKandidater.filter(
    (kandidat) => kandidat.fodselsnr && smser[kandidat.fodselsnr],
  );
  const kandidaterSomIkkeHarFåttSms = markerteKandidater.filter(
    (kandidat) => !(kandidat.fodselsnr && smser[kandidat.fodselsnr]),
  );
  const harInaktiveKandidater = markerteKandidater.some(
    (kandidat) => kandidat.fodselsnr === null,
  );

  const [valgtMal, setValgtMal] = useState<Meldingsmal>(
    stillingskategori === Stillingskategori.Jobbmesse
      ? Meldingsmal.Jobbarrangement
      : Meldingsmal.VurdertSomAktuell,
  );

  const { data: meldingsmaler } = useHentMeldingsmaler();

  const kandidaterSomMottarBeskjed = markerteKandidater.map(
    (kandidat) => kandidat.fodselsnr,
  );

  const onSendSms = async () => {
    setSendSmsLoading(true);
    if (kandidaterSomMottarBeskjed.length === 0) {
      visVarsling({
        innhold: 'Ingen kandidater valgt',
      });
      return;
    }
    try {
      await postSmsTilKandidater({
        mal: valgtMal,
        fnr: kandidaterSomMottarBeskjed.filter(
          (fodselsnr) => fodselsnr !== null,
        ),
        stillingId,
      });

      visVarsling({
        innhold: 'Beskjed er sendt',
      });
      fjernAllMarkering();
      setVis(false);
    } catch (error) {
      console.error('Failed to send SMS:', error);
      visVarsling({
        innhold:
          error instanceof Error
            ? `Feil ved sending: ${error.message}`
            : 'Det skjedde en uventet feil ved sending av beskjed',
        alertType: 'error',
      });
    } finally {
      setSendSmsLoading(false);
    }
  };

  return (
    <>
      <Button
        disabled={markerteKandidater.length === 0}
        onClick={() => setVis(true)}
        variant='tertiary'
        icon={<MobileIcon title='Send beskjed' />}
      >
        Send beskjed
      </Button>
      <Modal
        open={vis}
        className={css.sendSmsModal}
        onClose={() => setVis(false)}
        aria-label={`Send beskjed til ${markerteKandidater.length} kandidater`}
        header={{
          heading: 'Send beskjed',
        }}
      >
        <Modal.Body>
          {(kandidaterSomHarFåttSms.length > 0 || harInaktiveKandidater) && (
            <Alert variant='warning' size='small' className='my-4'>
              Ikke alle kandidatene vil motta beskjeden
              {/* <ul className={css.alleredeSendtAdvarselListe}>
                {kandidaterSomHarFåttSms.length > 0 && (
                  <li>
                    {kandidaterSomHarFåttSms.length === 1 ? (
                      <>Du har allerede sendt beskjed til én av kandidatene.</>
                    ) : (
                      <>
                        Du har allerede sendt beskjed til{' '}
                        {kandidaterSomHarFåttSms.length} av de{' '}
                        {markerteKandidater.length} valgte kandidatene.
                      </>
                    )}
                  </li>
                )}
                {harInaktiveKandidater && (
                  <li>Én eller flere av kandidatene er inaktive.</li>
                )}
              </ul> */}
            </Alert>
          )}
          <div className='send-sms-modal__innhold'>
            <BodyShort>
              Det vil bli sendt beskjed til{' '}
              <b>{kandidaterSomIkkeHarFåttSms.length}</b>{' '}
              {kandidaterSomIkkeHarFåttSms.length === 1
                ? 'kandidat'
                : 'kandidater'}
            </BodyShort>
            <BodyShort size='small'>
              Telefonnummerene/e-postene blir hentet fra Kontakt- og
              reservasjonsregisteret.
            </BodyShort>
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
                        <Table.HeaderCell scope='col'>
                          Kan sende beskjed
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {markerteKandidater?.map(
                        ({ fornavn, etternavn, fodselsnr }, i) => {
                          return (
                            <Table.Row key={i}>
                              <Table.HeaderCell scope='row'>
                                {fornavn} {etternavn}
                              </Table.HeaderCell>
                              <Table.DataCell>{fodselsnr}</Table.DataCell>
                              <Table.DataCell>
                                {kandidaterSomHarFåttSms.some(
                                  (k) => k.fodselsnr === fodselsnr,
                                )
                                  ? 'Nei'
                                  : 'Ja'}
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
            <Alert variant='info' className={css.kontortidAdvarsel}>
              <Label size='small'>
                SMS sendes ut mellom 09:00 og 17:15 hver dag. Det kan oppstå
                forsinkelser.
              </Label>
            </Alert>

            {stillingskategori !== Stillingskategori.Jobbmesse && (
              <Select
                className={css.velgMal}
                label='Velg hva som skal vises i beskjeden'
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setValgtMal(e.target.value as Meldingsmal);
                }}
              >
                <option value={Meldingsmal.VurdertSomAktuell}>
                  Send stilling til en aktuell kandidat
                </option>
                <option value={Meldingsmal.FunnetPassendeStilling}>
                  Oppfordre kandidat til å søke på stilling
                </option>
              </Select>
            )}
            <Label htmlFor='forhåndsvisning'>
              Meldingen som vil bli sendt til kandidatene
            </Label>
            <div id='forhåndsvisning' className={css.forhåndsvisning}>
              <BodyShort>
                <span>
                  {meldingsmaler
                    ? genererMeldingUtenLenke(valgtMal, meldingsmaler)
                    : 'Klarte ikke å hente meldingsmaler'}{' '}
                </span>
              </BodyShort>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            disabled={
              kandidaterSomHarFåttSms.length === markerteKandidater.length ||
              kandidaterSomIkkeHarFåttSms.length === 0
            }
            variant='primary'
            loading={sendSmsLoading}
            onClick={onSendSms}
          >
            Send beskjed
          </Button>
          <Button variant='secondary' onClick={() => setVis(false)}>
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const genererMeldingUtenLenke = (
  valgtMal: Meldingsmal,
  meldingsmaler: MeldingsmalerDTO,
) => {
  if (valgtMal === Meldingsmal.VurdertSomAktuell) {
    return meldingsmaler.vurdertSomAktuell?.smsTekst;
  } else if (valgtMal === Meldingsmal.FunnetPassendeStilling) {
    return meldingsmaler.passendeStilling?.smsTekst;
  } else if (valgtMal === Meldingsmal.Jobbarrangement) {
    return meldingsmaler.passendeJobbarrangement?.smsTekst;
  }
};

export default SendSmsModal;
