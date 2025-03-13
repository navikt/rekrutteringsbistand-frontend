import RekrutteringstreffDetaljerKort from '../RekrutteringstreffDetaljerKort';
import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import SWRLaster from '@/app/components/SWRLaster';
import {
  Dato,
  datoFormatterer,
} from '@/app/rekrutteringstreff/RekrutteringstreffSøk';
import { BriefcaseIcon } from '@navikt/aksel-icons';
import { Heading, Table } from '@navikt/ds-react';
import { useParams } from 'next/navigation';
import * as React from 'react';

export interface OmTreffetProps {
  handleLeggTilArbeidsgiver: (arbeidsgiver: ArbeidsgiverDTO | null) => void;
}

const OmTreffet: React.FC<OmTreffetProps> = ({ handleLeggTilArbeidsgiver }) => {
  const { rekrutteringstreffId } = useParams();

  const rekrutteringstreffHook = useRekrutteringstreff(
    rekrutteringstreffId as string,
  );

  return (
    <div>
      <SWRLaster hooks={[rekrutteringstreffHook]}>
        {(rekrutteringstreff) => {
          const dato: Dato = datoFormatterer(
            rekrutteringstreff.fraTid,
            rekrutteringstreff.tilTid,
          );
          return (
            <div>
              <Heading level='1' size='small'>
                {rekrutteringstreff.tittel}
              </Heading>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Felt</Table.HeaderCell>
                    <Table.HeaderCell>Verdi</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.DataCell>Tittel</Table.DataCell>
                    <Table.DataCell>{rekrutteringstreff.tittel}</Table.DataCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.DataCell>Startdato</Table.DataCell>
                    <Table.DataCell>{dato.startDato}</Table.DataCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.DataCell>Sluttidspunkt</Table.DataCell>
                    <Table.DataCell>{dato.sluttTidspunkt}</Table.DataCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.DataCell>Opprettet av Nav-kontor</Table.DataCell>
                    <Table.DataCell>
                      {rekrutteringstreff.opprettetAvNavkontorEnhetId}
                    </Table.DataCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.DataCell>Opprettet av person</Table.DataCell>
                    <Table.DataCell>
                      {rekrutteringstreff.opprettetAvPersonNavident}
                    </Table.DataCell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          );
        }}
      </SWRLaster>

      <div className='mt-4'>
        <RekrutteringstreffDetaljerKort
          overskrift='Arbeidsgiver'
          tittel='Ny arbeidsgiver'
          beskrivelse='Finn arbeidsgivere til å delta på treffet'
          ikon={
            <BriefcaseIcon className='w-8 h-8 text-gray-600 m-2 rounded-full' />
          }
          onLeggTilArbeidsgiver={handleLeggTilArbeidsgiver}
        />
      </div>
    </div>
  );
};

export default OmTreffet;
