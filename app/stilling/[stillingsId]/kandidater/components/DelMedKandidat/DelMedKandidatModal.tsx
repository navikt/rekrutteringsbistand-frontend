import { useForespurteOmDelingAvCv } from '../../../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { sendForespørselOmDelingAvCv } from '../../../../../api/foresporsel-om-deling-av-cv/foresporsler/forespørselOmDelingAvCv';
import {
  kandidaterSchemaDTO,
  kandidatlisteSchemaDTO,
} from '../../../../../api/kandidat/schema.zod';
import { useVisVarsling } from '../../../../../components/varsling/Varsling';
import { useApplikasjonContext } from '../../../../../providers/ApplikasjonContext';
import VelgSvarfrist from './VelgSvarfrist';
import { ArrowForwardIcon } from '@navikt/aksel-icons';
import {
  Accordion,
  Alert,
  BodyShort,
  Button,
  Modal,
  Table,
} from '@navikt/ds-react';
import { format } from 'date-fns';
import * as React from 'react';

export interface DelMedKandidatModalProps {
  markerteKandidater: kandidaterSchemaDTO[];
  fjernAllMarkering: () => void;
  kandidatliste: kandidatlisteSchemaDTO;
  forespurteKandidaterAktørListe: string[];
  stillingsId: string;
}

const DelMedKandidatModal: React.FC<DelMedKandidatModalProps> = ({
  markerteKandidater,
  fjernAllMarkering,
  kandidatliste,
  forespurteKandidaterAktørListe,
  stillingsId,
}) => {
  const [modalErÅpen, setModalErÅpen] = React.useState(false);
  const [svarfrist, setSvarfrist] = React.useState<Date | undefined>(undefined);
  const varsel = useVisVarsling();
  const { valgtNavKontor } = useApplikasjonContext();
  const [loading, setLoading] = React.useState(false);

  const forespurteKandidaterHook = useForespurteOmDelingAvCv(stillingsId);

  const antallSpurtFraFør = markerteKandidater.filter(
    (kandidat) =>
      kandidat.aktørid &&
      forespurteKandidaterAktørListe.includes(kandidat.aktørid),
  );

  const kandidaterSomKanDelesTil = markerteKandidater.filter(
    (kandidat) => !antallSpurtFraFør.includes(kandidat),
  );

  const sendForespørsel = async () => {
    if (svarfrist) {
      setLoading(true);
      await sendForespørselOmDelingAvCv({
        stillingsId: kandidatliste.stillingId,
        svarfrist: format(svarfrist, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
        aktorIder: kandidaterSomKanDelesTil
          .map((kandidat) => kandidat.aktørid)
          .filter((id): id is string => id !== null),
        navKontor: valgtNavKontor?.navKontor ?? '',
      });
      forespurteKandidaterHook.mutate();

      fjernAllMarkering();
      setModalErÅpen(false);
      setLoading(false);
      varsel({
        innhold: 'Stillingen er delt med kandidatene',
        alertType: 'info',
      });
    }
  };

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
          {antallSpurtFraFør.length > 0 && (
            <Alert variant='warning' size='small'>
              Du har tidligere delt stillingen med {antallSpurtFraFør.length}{' '}
              {antallSpurtFraFør.length === 1
                ? 'kandidat. Denne kandidaten'
                : 'kandidater. De'}{' '}
              vil ikke motta stillingen på nytt i aktivitetsplanen.
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
                      <Table.HeaderCell scope='col'>Kan dele</Table.HeaderCell>
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
                              {aktørid &&
                              forespurteKandidaterAktørListe.includes(aktørid)
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
