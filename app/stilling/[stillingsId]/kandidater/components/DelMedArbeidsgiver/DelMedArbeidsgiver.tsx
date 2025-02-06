import { TenancyIcon } from '@navikt/aksel-icons';
import {
  Accordion,
  BodyLong,
  Button,
  Modal,
  UNSAFE_Combobox,
} from '@navikt/ds-react';
import * as React from 'react';
import {
  kandidaterSchemaDTO,
  kandidatlisteSchemaDTO,
} from '../../../../../api/kandidat/schema.zod';
import ForhåndsvisningAvEpost from './ForhåndsvisningAvEpost';

export interface DelMedArbeidsgiverProps {
  markerteKandidater: kandidaterSchemaDTO[];
  kandidatliste: kandidatlisteSchemaDTO;
  stillingTittel: string;
}

const DelMedArbeidsgiver: React.FC<DelMedArbeidsgiverProps> = ({
  markerteKandidater,
  kandidatliste,
  stillingTittel,
}) => {
  const [visModal, setVisModal] = React.useState(false);

  const antallSomSkalDeles = markerteKandidater.length; //TODO
  return (
    <>
      <Button
        onClick={() => setVisModal(true)}
        disabled={markerteKandidater.length === 0}
        variant='tertiary'
        icon={<TenancyIcon title='Del med arbeidsgiver' />}
      >
        Del med arbeidsgiver
      </Button>
      <Modal
        open={visModal}
        onClose={() => setVisModal(false)}
        aria-label='Del kandidater med arbeidsgiver'
        header={{
          heading: `Delmed arbeidsgiver`,
        }}
      >
        <Modal.Body>
          <div>
            {/* {alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere &&
              antallKandidaterSomIkkeKanDeles > 0 && (
                <Alert variant='warning' size='small'>
                  <BodyLong spacing>
                    {antallKandidaterSomIkkeKanDeles} av kandidatene har ikke
                    svart eller svart nei på om CV-en kan deles. Du kan derfor
                    ikke dele disse.
                  </BodyLong>
                  <BodyLong spacing>
                    Har du hatt dialog med kandidaten, og fått bekreftet at NAV
                    kan dele CV-en? Da må du registrere dette i
                    aktivitetsplanen. Har du ikke delt stillingen med kandidaten
                    må du gjøre det først.{' '}
                    <Link href={rutinerForDeling}>Se rutiner</Link>.
                  </BodyLong>
                </Alert>
              )}
            {!alleKandidaterMåGodkjenneForespørselOmDelingAvCvForÅPresentere && (
              <Alert variant='warning' size='small'>
                <BodyLong spacing>
                  Husk at du må kontakte kandidatene og undersøke om stillingen
                  er aktuell før du deler med arbeidsgiver.
                </BodyLong>
              </Alert>
            )} */}
            <BodyLong>
              Send en e-post med {antallSomSkalDeles} kandidater med
              arbeidsgiveren.
            </BodyLong>

            <UNSAFE_Combobox
              className='my-4'
              allowNewValues
              label='E-post til arbeidsgiver'
              options={[]}
              isMultiSelect
            />

            <Accordion>
              <Accordion.Item>
                <Accordion.Header>Forhåndsvis e-posten</Accordion.Header>
                <Accordion.Content>
                  <ForhåndsvisningAvEpost
                    stillingstittel={stillingTittel}
                    opprettetAvNavn={kandidatliste.opprettetAv.navn}
                  />
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setVisModal(false)}>
            Avbryt
          </Button>
          <Button
            disabled //TODO
            variant='primary'
            // disabled={delestatus === Nettstatus.SenderInn}
            // loading={delestatus === Nettstatus.SenderInn}
            // onClick={handleDelClick}
          >
            Del kandidatene
          </Button>
        </Modal.Footer>
        {/* {delestatus === Nettstatus.Feil && (
          <Alert fullWidth variant='error' size='small'>
            Kunne ikke dele med arbeidsgiver akkurat nå
          </Alert>
        )} */}
      </Modal>
    </>
  );
};

export default DelMedArbeidsgiver;
