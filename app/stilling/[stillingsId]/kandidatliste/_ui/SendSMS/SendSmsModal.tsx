import css from './SendSmsModal.module.css';
import { KandidatListeKandidatDTO } from '@/app/api/kandidat/schema.zod';
import {
  MeldingsmalerDTO,
  useHentMeldingsmaler,
} from '@/app/api/kandidatvarsel/hentMeldingsmaler';
import {
  Meldingsmal,
  usePostSmsTilKandidater,
  useSmserForStilling,
} from '@/app/api/kandidatvarsel/kandidatvarsel';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import PopoverModal from '@/components/PopoverModal/PopoverModal';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import { ArrowForwardIcon } from '@navikt/aksel-icons';
import {
  Accordion,
  Alert,
  BodyShort,
  Box,
  Button,
  Label,
  Modal,
  Select,
  Table,
} from '@navikt/ds-react';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { ChangeEvent, FunctionComponent, useState } from 'react';

type Props = {
  markerteKandidater: KandidatListeKandidatDTO[];
  fjernAllMarkering: () => void;
  popover?: boolean;
};

const SendSmsModal: FunctionComponent<Props> = (props) => {
  const { visVarsel } = useApplikasjonContext();
  const { fjernAllMarkering, markerteKandidater } = props;
  const { track } = useUmami();

  const { stillingsData } = useStillingsContext();
  const stillingskategori = stillingsData?.stillingsinfo?.stillingskategori;
  const stillingId = stillingsData.stilling.uuid;
  const [visModal, setVisModal] = useState(false);

  const { data: smser = {} } = useSmserForStilling(
    stillingskategori === 'FORMIDLING' ? null : stillingsData.stilling.uuid,
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
      visVarsel({
        tekst: 'Ingen kandidater valgt',
        type: 'warning',
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
      track(UmamiEvent.Stilling.send_beskjed_til_kandidat, {
        antall: kandidaterSomMottarBeskjed.length,
      });
      visVarsel({
        tekst: 'Beskjed er sendt',
        type: 'success',
      });
      fjernAllMarkering();
      setVisModal(false);
    } catch (error) {
      new RekbisError({ message: 'Klarte ikke å sende SMS:', error });
      visVarsel({
        tekst:
          error instanceof Error
            ? `Feil ved sending: ${error.message}`
            : 'Det skjedde en uventet feil ved sending av beskjed',
        type: 'error',
      });
    } finally {
      setSendSmsLoading(false);
    }
  };

  const sendSMSInnhold = (
    <div className='send-sms-modal__innhold'>
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
      <div id='forhåndsvisning' className={'p-4'}>
        <BodyShort>
          <span>
            {meldingsmaler
              ? genererMeldingUtenLenke(valgtMal, meldingsmaler)
              : 'Klarte ikke å hente meldingsmaler'}{' '}
          </span>
        </BodyShort>
      </div>
    </div>
  );

  if (props.popover) {
    return (
      <>
        <PopoverModal
          tittel='Del stilling'
          åpneKnapp={
            <Button
              disabled={markerteKandidater.length === 0}
              onClick={() => setVisModal(true)}
              size={'small'}
              variant={'secondary'}
              icon={<ArrowForwardIcon title='Del stilling' />}
            >
              Del stillingen
            </Button>
          }
        >
          <>
            {sendSMSInnhold}
            <div className='flex justify-end'>
              <Button
                disabled={
                  kandidaterSomHarFåttSms.length ===
                    markerteKandidater.length ||
                  kandidaterSomIkkeHarFåttSms.length === 0
                }
                variant='primary'
                loading={sendSmsLoading}
                onClick={onSendSms}
              >
                Send beskjed
              </Button>
            </div>
          </>
        </PopoverModal>

        <Popover>
          <PopoverTrigger></PopoverTrigger>
          <PopoverContent className='z-999' side='bottom' align='start'>
            <Box.New
              background='raised'
              borderRadius={'12'}
              padding='5'
              shadow='dialog'
              borderColor='neutral-subtle'
              borderWidth='1'
            >
              <div className='flex justify-between'>
                <PopoverClose>asd</PopoverClose>
              </div>
              {sendSMSInnhold}
              <div className='flex justify-end'>
                <Button
                  disabled={
                    kandidaterSomHarFåttSms.length ===
                      markerteKandidater.length ||
                    kandidaterSomIkkeHarFåttSms.length === 0
                  }
                  variant='primary'
                  loading={sendSmsLoading}
                  onClick={onSendSms}
                >
                  Send beskjed
                </Button>
              </div>
            </Box.New>
          </PopoverContent>
        </Popover>
      </>
    );
  }

  return (
    <>
      <Button
        disabled={markerteKandidater.length === 0}
        onClick={() => setVisModal(true)}
        size={'small'}
        variant={'secondary'}
        icon={<ArrowForwardIcon title='Del stilling' />}
      >
        Del stillingen
      </Button>
      <Modal
        open={visModal}
        className={css.sendSmsModal}
        onClose={() => setVisModal(false)}
        aria-label={`Del stillingen med ${markerteKandidater.length} kandidater`}
        header={{
          heading: 'Del stillingen',
        }}
      >
        <Modal.Body>
          {(kandidaterSomHarFåttSms.length > 0 || harInaktiveKandidater) && (
            <Alert variant='warning' size='small' className='my-4'>
              Ikke alle kandidatene vil motta beskjeden
            </Alert>
          )}
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
          {sendSMSInnhold}
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
          <Button variant='secondary' onClick={() => setVisModal(false)}>
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
