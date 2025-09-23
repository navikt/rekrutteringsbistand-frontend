import ForhåndsvisningAvEpost from './ForhåndsvisningAvEpost';
import { useForespurteOmDelingAvCv } from '@/app/api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import { postDelMedArbeidsgiver } from '@/app/api/kandidat/postDelMedArbeidsgiver';
import { KandidatListeKandidatDTO } from '@/app/api/kandidat/schema.zod';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import SWRLaster from '@/components/SWRLaster';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { TasklistSendIcon } from '@navikt/aksel-icons';
import {
  Accordion,
  Alert,
  BodyLong,
  Button,
  Modal,
  Table,
  UNSAFE_Combobox,
} from '@navikt/ds-react';
import { useState, type FC } from 'react';

export interface DelMedArbeidsgiverProps {
  markerteKandidater: KandidatListeKandidatDTO[];
  sidebar?: boolean;
}

const DelMedArbeidsgiver: FC<DelMedArbeidsgiverProps> = ({
  markerteKandidater,
  sidebar,
}) => {
  const { track } = useUmami();
  const [loading, setLoading] = useState(false);
  const [visModal, setVisModal] = useState(false);
  const { valgtNavKontor } = useApplikasjonContext();
  const { stillingsData } = useStillingsContext();
  const { kandidatlisteId, reFetchKandidatliste, kandidatlisteRawData } =
    useKandidatlisteContext();

  const forespurteKandidaterHook = useForespurteOmDelingAvCv(
    stillingsData.stilling.uuid,
  );

  const eposter =
    stillingsData.stilling.contactList
      ?.map((kontakt) => kontakt.email)
      .filter((email): email is string => email !== null && email.trim() !== "") || [];

  const [epost, setEpost] = useState<string[]>(eposter);

  const onDelMedArbeidsgiver = async (kandidatnummerListe: string[]) => {
    track(UmamiEvent.Stilling.del_kandidat_med_arbeidsgiver, {
      antall: kandidatnummerListe.length,
    });
    setLoading(true);
    await postDelMedArbeidsgiver({
      kandidatlisteId: kandidatlisteId,
      kandidatnummerListe,
      mailadresser: epost,
      navKontor: valgtNavKontor?.navKontor ?? '',
    }).then(() => {
      setLoading(false);
      setEpost([]);
      setVisModal(false);
      reFetchKandidatliste();
    });
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <Button
        className='text-nowrap'
        onClick={() => setVisModal(true)}
        disabled={markerteKandidater.length === 0}
        variant={sidebar ? 'primary' : 'tertiary'}
        icon={<TasklistSendIcon title='Del med arbeidsgiver' />}
      >
        Del CV med arbeidsgiver
      </Button>
      <Modal
        className='overflow-visible'
        width={'medium'}
        open={visModal}
        onClose={() => setVisModal(false)}
        aria-label='Del kandidater med arbeidsgiver'
        header={{
          heading: `Del med arbeidsgiver`,
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
                    (forespurt) => forespurt.svar?.harSvartJa === true,
                  )
                : null;

              return svartJa ? kandidat : null;
            });

            const alleHarSvartJa =
              harSvartJa.length === markerteKandidater.length;

            return (
              <>
                <Modal.Body className={'overflow-visible'}>
                  {!alleHarSvartJa && (
                    <Alert variant='warning' size='small' className='mb-4'>
                      <BodyLong>
                        {harSvartJa.length === 0
                          ? 'Kandidaten(e) '
                          : `${markerteKandidater.length - harSvartJa.length} av kandidatene har `}
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
                                        ? 'Ja'
                                        : 'Nei'}
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
                    className='my-4 '
                    allowNewValues
                    label='E-post til arbeidsgiver'
                    options={eposter}
                    // isListOpen={false}
                    // toggleListButton={false}
                    selectedOptions={epost}
                    shouldAutocomplete={false}
                    isMultiSelect
                    onToggleSelected={(val, selected) => {
                      if (selected) {
                        if (isValidEmail(val)) {
                          setEpost([...epost, val]);
                        }
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
                          stillingstittel={stillingsData.stilling.title}
                          opprettetAvNavn={
                            kandidatlisteRawData.opprettetAv.navn
                          }
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
                    loading={loading}
                    disabled={harSvartJa.length === 0 || epost.length === 0}
                    variant='primary'
                    onClick={() =>
                      onDelMedArbeidsgiver(
                        harSvartJa
                          .map((kandidat) => kandidat.kandidatnr)
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
