import { UmamiEvent } from '../../../../../../util/umamiEvents';
import { useForespurteOmDelingAvCv } from '../../../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { postDelMedArbeidsgiver } from '../../../../../api/kandidat/postDelMedArbeidsgiver';
import {
  kandidaterSchemaDTO,
  kandidatlisteSchemaDTO,
} from '../../../../../api/kandidat/schema.zod';
import SWRLaster from '../../../../../components/SWRLaster';
import { useApplikasjonContext } from '../../../../../providers/ApplikasjonContext';
import { useUmami } from '../../../../../providers/UmamiContext';
import ForhåndsvisningAvEpost from './ForhåndsvisningAvEpost';
import { TenancyIcon } from '@navikt/aksel-icons';
import {
  Accordion,
  Alert,
  BodyLong,
  Button,
  Modal,
  Table,
  UNSAFE_Combobox,
} from '@navikt/ds-react';
import * as React from 'react';

export interface DelMedArbeidsgiverProps {
  markerteKandidater: kandidaterSchemaDTO[];
  kandidatliste: kandidatlisteSchemaDTO;
  stillingTittel: string;
  stillingsId: string;
}

const DelMedArbeidsgiver: React.FC<DelMedArbeidsgiverProps> = ({
  markerteKandidater,
  kandidatliste,
  stillingTittel,
  stillingsId,
}) => {
  const { track } = useUmami();
  const [visModal, setVisModal] = React.useState(false);
  const { valgtNavKontor } = useApplikasjonContext();
  const forespurteKandidaterHook = useForespurteOmDelingAvCv(stillingsId);

  const [epost, setEpost] = React.useState<string[]>([]);

  const onDelMedArbeidsgiver = (kandidatnummerListe: string[]) => {
    postDelMedArbeidsgiver({
      kandidatlisteId: kandidatliste.kandidatlisteId,
      kandidatnummerListe,
      mailadresser: epost,
      navKontor: valgtNavKontor?.navKontor ?? '',
    });
    track(UmamiEvent.Stilling.del_kandidat_med_arbeidsgiver, {
      antall: kandidatnummerListe.length,
    });
  };

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
        <SWRLaster hooks={[forespurteKandidaterHook]}>
          {(forespurteKandidater) => {
            const harSvartJa = markerteKandidater.filter((kandidat) => {
              const forespørselCvForKandidat =
                (kandidat.aktørid && forespurteKandidater[kandidat.aktørid]) ??
                null;

              const svartJa = forespørselCvForKandidat
                ? forespørselCvForKandidat?.some(
                    (forespurt) => forespurt.svar?.harSvartJa !== true,
                  )
                : null;

              return svartJa ? kandidat : null;
            });

            const alleHarSvartJa =
              harSvartJa.length === markerteKandidater.length;

            return (
              <>
                <Modal.Body>
                  {!alleHarSvartJa && (
                    <Alert variant='warning' size='small' className='mb-4'>
                      <BodyLong>
                        {harSvartJa.length === 0
                          ? 'Kandidaten '
                          : `${harSvartJa.length} av kandidatene har `}
                        har ikke svart eller svart nei på om CV-en kan deles.
                      </BodyLong>
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
                                Kan deles
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
                                      {fodselsnr &&
                                      harSvartJa.some(
                                        (kandidat) =>
                                          kandidat.fodselsnr === fodselsnr,
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
                  <BodyLong>
                    Send en e-post med kandidater med arbeidsgiveren.
                  </BodyLong>

                  <UNSAFE_Combobox
                    className='my-4'
                    allowNewValues
                    label='E-post til arbeidsgiver'
                    options={[]}
                    shouldAutocomplete={false}
                    isMultiSelect
                    onToggleSelected={(val, selected) => {
                      if (selected) {
                        setEpost([...epost, val]);
                      } else {
                        setEpost(epost.filter((e) => e !== val));
                      }
                    }}
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
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant='secondary'
                    onClick={() => setVisModal(false)}
                  >
                    Avbryt
                  </Button>
                  <Button
                    disabled={harSvartJa.length === 0}
                    variant='primary'
                    onClick={() =>
                      onDelMedArbeidsgiver(
                        harSvartJa
                          .map((kandidat) => kandidat.aktørid)
                          .filter((id): id is string => id !== null),
                      )
                    }
                  >
                    Del kandidatene
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

export default DelMedArbeidsgiver;
