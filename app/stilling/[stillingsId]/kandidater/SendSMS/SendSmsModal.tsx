import {
  Alert,
  BodyShort,
  Button,
  Label,
  Modal,
  Select,
} from '@navikt/ds-react';

import { ChangeEvent, FunctionComponent, useState } from 'react';
import {
  MeldingsmalerDTO,
  useHentMeldingsmaler,
} from '../../../../api/kandidatvarsel/hentMeldingsmaler';
import { useVisVarsling } from '../../../../components/varsling/Varsling';

// import {
//   Meldingsmal,
//   usePostSmsTilKandidater,
//   useSmserForStilling,
// } from '../../../api/kandidatvarsel-api/kandidatvarsel';

import { MobileIcon } from '@navikt/aksel-icons';
import {
  Meldingsmal,
  usePostSmsTilKandidater,
  useSmserForStilling,
} from '../../../../api/kandidatvarsel/kandidatvarsel';
import { Stillingskategori } from '../../../stilling-typer';
import css from './SendSmsModal.module.css';
// import {
//     MeldingsmalerDTO,
//     useHentMeldingsmaler,
// } from '../../../api/kandidatvarsel-api/hentMeldingsmaler';

type Props = {
  markerteFnr: string[];
  fjernAllMarkering: () => void;
  stillingId: string;
  stillingskategori: string | null;
};

const SendSmsModal: FunctionComponent<Props> = (props) => {
  const { stillingId, stillingskategori, fjernAllMarkering, markerteFnr } =
    props;
  const visVarsling = useVisVarsling();

  const [vis, setVis] = useState(false);
  const { data: smser = {} } = useSmserForStilling(
    stillingskategori === 'FORMIDLING' ? null : stillingId,
  );

  const postSmsTilKandidater = usePostSmsTilKandidater();
  const [sendSmsLoading, setSendSmsLoading] = useState(false);

  const kandidaterSomHarFåttSms = markerteFnr.filter(
    (fnr) => fnr && smser[fnr],
  );
  const kandidaterSomIkkeHarFåttSms = markerteFnr.filter(
    (fnr) => !(fnr && smser[fnr]),
  );
  const harInaktiveKandidater = markerteFnr.some((fnr) => fnr === null);

  const [valgtMal, setValgtMal] = useState<Meldingsmal>(
    stillingskategori === Stillingskategori.Jobbmesse
      ? Meldingsmal.Jobbarrangement
      : Meldingsmal.VurdertSomAktuell,
  );

  const { data: meldingsmaler } = useHentMeldingsmaler();

  const onSendSms = async () => {
    const korrektLengdeFødselsnummer = 11;
    setSendSmsLoading(true);
    const result = await postSmsTilKandidater({
      mal: valgtMal,
      fnr: kandidaterSomIkkeHarFåttSms.filter(
        (fnr) => fnr && fnr.length === korrektLengdeFødselsnummer,
      ),
      stillingId,
    });

    setSendSmsLoading(false);
    if (result === 'ok') {
      visVarsling({
        innhold: 'Beskjed er sendt',
      });
      fjernAllMarkering();
    } else if (result === 'error') {
      visVarsling({
        innhold: 'Det skjedde en feil',
        alertType: 'error',
      });
    }
    setVis(false);
  };

  return (
    <>
      <Button
        disabled={markerteFnr.length === 0}
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
        aria-label={`Send beskjed til ${markerteFnr.length} kandidater`}
        header={{
          heading: 'Send beskjed',
        }}
      >
        <Modal.Body>
          {(kandidaterSomHarFåttSms.length > 0 || harInaktiveKandidater) && (
            <Alert
              variant='warning'
              size='small'
              className={css.alleredeSendtAdvarsel}
            >
              Ikke alle kandidatene vil motta beskjeden
              <ul className={css.alleredeSendtAdvarselListe}>
                {kandidaterSomHarFåttSms.length > 0 && (
                  <li>
                    {kandidaterSomHarFåttSms.length === 1 ? (
                      <>Du har allerede sendt beskjed til én av kandidatene.</>
                    ) : (
                      <>
                        Du har allerede sendt beskjed til{' '}
                        {kandidaterSomHarFåttSms.length} av de{' '}
                        {markerteFnr.length} valgte kandidatene.
                      </>
                    )}
                  </li>
                )}
                {harInaktiveKandidater && (
                  <li>Én eller flere av kandidatene er inaktive.</li>
                )}
              </ul>
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
    return meldingsmaler.vurdertSomAktuell.smsTekst;
  } else if (valgtMal === Meldingsmal.FunnetPassendeStilling) {
    return meldingsmaler.passendeStilling.smsTekst;
  } else if (valgtMal === Meldingsmal.Jobbarrangement) {
    return meldingsmaler.passendeJobbarrangement.smsTekst;
  }
};

export default SendSmsModal;
