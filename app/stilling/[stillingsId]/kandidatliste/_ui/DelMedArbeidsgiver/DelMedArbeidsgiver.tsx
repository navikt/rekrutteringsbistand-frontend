import ForhåndsvisningAvEpost from './ForhåndsvisningAvEpost';
import { postDelMedArbeidsgiver } from '@/app/api/kandidat/postDelMedArbeidsgiver';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { CVKandidaterSvartJa } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/hendelseUtil';
import { KandidatVisningProps } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatlisteFilter/useFiltrerteKandidater';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { validerEpost } from '@/util/validerEpost';
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
import { logger } from '@navikt/next-logger';
import { type FC, useState } from 'react';

export interface DelMedArbeidsgiverProps {
  markerteKandidater: KandidatVisningProps[];
  sidebar?: boolean;
}

const DelMedArbeidsgiver: FC<DelMedArbeidsgiverProps> = ({
  markerteKandidater,
}) => {
  const { track } = useUmami();
  const [loading, setLoading] = useState(false);
  const [feilmelding, setFeilmelding] = useState<string | null>(null);
  const [visModal, setVisModal] = useState(false);
  const { valgtNavKontor, brukerData } = useApplikasjonContext();
  const { stillingsData } = useStillingsContext();
  const { kandidatlisteId, reFetchKandidatliste } = useKandidatlisteContext();

  const eposter =
    stillingsData.stilling.contactList
      ?.map((kontakt) => kontakt.email)
      .filter(
        (email): email is string => email !== null && email.trim() !== '',
      ) || [];

  const [epost, setEpost] = useState<string[]>(eposter);

  const onDelMedArbeidsgiver = async (kandidatnummerListe: string[]) => {
    track(UmamiEvent.Stilling.del_kandidat_med_arbeidsgiver, {
      antall: kandidatnummerListe.length,
    });
    setLoading(true);
    setFeilmelding(null);
    try {
      await postDelMedArbeidsgiver({
        kandidatlisteId: kandidatlisteId,
        kandidatnummerListe,
        mailadresser: epost,
        navKontor: valgtNavKontor?.navKontor ?? '',
      });
      setEpost([]);
      setVisModal(false);
      reFetchKandidatliste();
    } catch (error: unknown) {
      logger.error(error, 'Feil ved deling av kandidater med arbeidsgiver');

      let feilMelding =
        'Kunne ikke dele kandidatene med arbeidsgiver. Prøv igjen senere.';
      try {
        const details =
          error instanceof Error ? JSON.parse((error as any).details) : null;
        if (details?.message) {
          feilMelding = `Kunne ikke dele kandidatene med arbeidsgiver. Feilmelding er «${details.message}».`;
        }
      } catch {
        // details var ikke gyldig JSON, bruker standardmelding
      }

      setFeilmelding(feilMelding);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setVisModal(true)}
        disabled={markerteKandidater.length === 0}
        size='xsmall'
        variant='primary'
        icon={<TasklistSendIcon title='Del med arbeidsgiver' />}
      >
        <span className='hidden lg:inline'>Del CV med arbeidsgiver</span>
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
        {(() => {
          const harSvartJa = CVKandidaterSvartJa(markerteKandidater);

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
                <Accordion size='small' className='my-4'>
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
                  className='my-4'
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
                      if (validerEpost(val).erGodkjent) {
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
                        opprettetAvNavn={`${brukerData.fornavn} ${brukerData.etternavn}`}
                      />
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion>
              </Modal.Body>
              <Modal.Footer>
                {feilmelding && (
                  <Alert variant='error' size='small' className='mb-4 w-full'>
                    {feilmelding}
                  </Alert>
                )}
                <Button variant='secondary' onClick={() => setVisModal(false)}>
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
        })()}
      </Modal>
    </>
  );
};

export default DelMedArbeidsgiver;
