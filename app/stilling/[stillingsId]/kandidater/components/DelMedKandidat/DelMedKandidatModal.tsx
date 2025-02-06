import { ArrowForwardIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Button, Modal } from '@navikt/ds-react';
import { format } from 'date-fns';
import * as React from 'react';
import { sendForespørselOmDelingAvCv } from '../../../../../api/foresporsel-om-deling-av-cv/foresporsler/forespørselOmDelingAvCv';
import {
  kandidaterSchemaDTO,
  kandidatlisteSchemaDTO,
} from '../../../../../api/kandidat/schema.zod';
import { useApplikasjonContext } from '../../../../../ApplikasjonContext';
import { useVisVarsling } from '../../../../../components/varsling/Varsling';
import VelgSvarfrist from './VelgSvarfrist';

export interface DelMedKandidatModalProps {
  markerteKandidater: kandidaterSchemaDTO[];
  fjernAllMarkering: () => void;
  kandidatliste: kandidatlisteSchemaDTO;
  forespurteKandidater: string[];
}

const DelMedKandidatModal: React.FC<DelMedKandidatModalProps> = ({
  markerteKandidater,
  fjernAllMarkering,
  kandidatliste,
  forespurteKandidater,
}) => {
  const [modalErÅpen, setModalErÅpen] = React.useState(false);
  const [svarfrist, setSvarfrist] = React.useState<Date | undefined>(undefined);
  const varsel = useVisVarsling();
  const { valgtNavKontor } = useApplikasjonContext();
  const [loading, setLoading] = React.useState(false);

  const sendForespørsel = async () => {
    if (svarfrist) {
      setLoading(true);
      await sendForespørselOmDelingAvCv({
        stillingsId: kandidatliste.stillingId,
        svarfrist: format(svarfrist, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
        aktorIder: markerteKandidater
          .map((kandidat) => kandidat.aktørid)
          .filter((id): id is string => id !== null),
        navKontor: valgtNavKontor?.navKontor ?? '',
      });
      fjernAllMarkering();
      setModalErÅpen(false);
      setLoading(false);
      varsel({
        innhold: 'Stillingen er delt med kandidatene',
        alertType: 'info',
      });
    }
  };

  const antallSpurtFraFør = markerteKandidater.filter(
    (kandidat) =>
      kandidat.aktørid && forespurteKandidater.includes(kandidat.aktørid),
  ).length;

  return (
    <>
      <Button
        disabled={markerteKandidater.length === 0}
        onClick={() => setModalErÅpen(true)}
        variant='tertiary'
        icon={<ArrowForwardIcon title='Del med kandidat' />}
      >
        Del med kandidat
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
          {antallSpurtFraFør > 0 && (
            <Alert variant='warning' size='small'>
              Du har tidligere delt stillingen med {antallSpurtFraFør}{' '}
              {antallSpurtFraFør === 1
                ? 'kandidat. Denne kandidaten'
                : 'kandidater. De'}{' '}
              vil ikke motta stillingen på nytt i aktivitetsplanen.
            </Alert>
          )}
          <BodyShort className='my-8'>
            {`Det opprettes et stillingskort i Aktivitetsplanen. Kandidatene
                  vil bli varslet på SMS, og kan svare "ja" eller "nei" til at
                  CV-en skal bli delt med arbeidsgiver. Du vil se svaret i
                  kandidatlisten.`}
          </BodyShort>

          <VelgSvarfrist setValgtSvarfrist={setSvarfrist} />
          <Alert variant='info' className={'mt-8'}>
            Stillingsannonsen vil bli delt med kandidaten.
            <br /> Det er viktig at annonseteksten er informativ og lett å
            forstå.
          </Alert>
        </Modal.Body>

        <Modal.Footer>
          <Button
            disabled={!svarfrist}
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
