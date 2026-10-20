'use client';

import {
  MAKS_ANTALL_STANDARDSØK,
  type StandardsøkDomene,
  type StandardsøkDTO,
} from '@/app/api/bruker/standardsok/standardsøkTyper';
import {
  settSomStandardsøk,
  slettStandardsøk,
  useStandardsøk,
} from '@/app/api/bruker/standardsok/useStandardsøk';
import { formaterStandardsøkDato } from '@/components/standardsøk/standardsøkDato';
import { RekbisError } from '@/util/rekbisError';
import { StarFillIcon, TrashIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Button,
  HStack,
  InlineMessage,
  Modal,
  Table,
  VStack,
} from '@navikt/ds-react';
import { useState } from 'react';

export interface AdministrerStandardsøkModalProps {
  domene: StandardsøkDomene;
  søk: StandardsøkDTO[];
  onSattSomStandard: (søk: StandardsøkDTO) => void;
  onSlettet: (søk: StandardsøkDTO) => void;
  onClose: () => void;
}

export default function AdministrerStandardsøkModal({
  domene,
  søk,
  onSattSomStandard,
  onSlettet,
  onClose,
}: AdministrerStandardsøkModalProps) {
  const { mutate } = useStandardsøk(domene);
  const [søkSomSkalSlettes, setSøkSomSkalSlettes] =
    useState<StandardsøkDTO | null>(null);
  const [feil, setFeil] = useState<string>();
  const [venter, setVenter] = useState(false);

  const utfør = async (handling: () => Promise<void>, feiltekst: string) => {
    setFeil(undefined);
    setVenter(true);
    try {
      await handling();
    } catch (error) {
      setFeil(
        RekbisError.ensure(error).statuskode === 404
          ? 'Fant ikke søket. Det kan være slettet.'
          : feiltekst,
      );
    } finally {
      await mutate();
      setVenter(false);
    }
  };

  const gjørTilStandard = (valgt: StandardsøkDTO) =>
    utfør(async () => {
      await settSomStandardsøk(domene, valgt.id);
      onSattSomStandard(valgt);
    }, 'Kunne ikke endre standardsøket. Prøv igjen.');

  const slett = (valgt: StandardsøkDTO) =>
    utfør(async () => {
      await slettStandardsøk(domene, valgt.id);
      onSlettet(valgt);
      setSøkSomSkalSlettes(null);
    }, 'Kunne ikke slette søket. Prøv igjen.');

  if (søkSomSkalSlettes) {
    return (
      <Modal
        open
        onClose={onClose}
        header={{ heading: 'Slett lagret søk' }}
        width='small'
      >
        <Modal.Body>
          <VStack gap='space-16'>
            <BodyShort>
              Vil du slette «{søkSomSkalSlettes.navn}»?
            </BodyShort>
            {feil && (
              <InlineMessage status='error' role='alert'>
                {feil}
              </InlineMessage>
            )}
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            size='small'
            data-color='danger'
            loading={venter}
            onClick={() => slett(søkSomSkalSlettes)}
          >
            Slett
          </Button>
          <Button
            type='button'
            size='small'
            variant='secondary'
            disabled={venter}
            onClick={() => {
              setFeil(undefined);
              setSøkSomSkalSlettes(null);
            }}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal
      open
      onClose={onClose}
      header={{
        heading: `Administrer søk (${søk.length} av ${MAKS_ANTALL_STANDARDSØK})`,
      }}
      width='medium'
    >
      <Modal.Body>
        <VStack gap='space-16'>
          {søk.length === 0 ? (
            <BodyShort>Du har ingen lagrede søk.</BodyShort>
          ) : (
            <Table size='small'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell scope='col'>Navn</Table.HeaderCell>
                  <Table.HeaderCell scope='col'>Sist aktiv</Table.HeaderCell>
                  <Table.HeaderCell scope='col'>Slettes</Table.HeaderCell>
                  <Table.HeaderCell scope='col'>
                    <span className='sr-only'>Handlinger</span>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {søk.map((s) => (
                  <Table.Row key={s.id}>
                    <Table.DataCell>
                      <HStack gap='space-4' align='center' wrap={false}>
                        {s.erStandard && <StarFillIcon title='Standardsøk' />}
                        {s.navn}
                      </HStack>
                    </Table.DataCell>
                    <Table.DataCell>
                      {formaterStandardsøkDato(s.sistAktiv)}
                    </Table.DataCell>
                    <Table.DataCell>
                      {formaterStandardsøkDato(s.slettes)}
                    </Table.DataCell>
                    <Table.DataCell>
                      <HStack gap='space-4' justify='end' wrap={false}>
                        {!s.erStandard && (
                          <Button
                            type='button'
                            size='xsmall'
                            variant='tertiary'
                            disabled={venter}
                            aria-label={`Gjør til standard: ${s.navn}`}
                            onClick={() => gjørTilStandard(s)}
                          >
                            Gjør til standard
                          </Button>
                        )}
                        <Button
                          type='button'
                          size='xsmall'
                          variant='tertiary'
                          data-color='danger'
                          disabled={venter}
                          icon={<TrashIcon aria-hidden />}
                          aria-label={`Slett: ${s.navn}`}
                          onClick={() => setSøkSomSkalSlettes(s)}
                        >
                          Slett
                        </Button>
                      </HStack>
                    </Table.DataCell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
          {feil && (
            <InlineMessage status='error' role='alert'>
              {feil}
            </InlineMessage>
          )}
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button type='button' size='small' onClick={onClose}>
          Lukk
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
