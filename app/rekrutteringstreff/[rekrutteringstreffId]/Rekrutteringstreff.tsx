'use client';

import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import SWRLaster from '@/app/components/SWRLaster';
import {
  Dato,
  datoFormatterer,
} from '@/app/rekrutteringstreff-sok/RekrutteringstreffSøk';
import { Table } from '@navikt/ds-react';
import { useParams } from 'next/navigation';
import * as React from 'react';

const Rekrutteringstreff: React.FC = () => {
  const { rekrutteringstreffId } = useParams();
  const rekrutteringstreffHook = useRekrutteringstreff(
    rekrutteringstreffId as string,
  );

  return (
    <SWRLaster hooks={[rekrutteringstreffHook]}>
      {(rekrutteringstreff) => {
        const dato: Dato = datoFormatterer(
          rekrutteringstreff.fraTid,
          rekrutteringstreff.tilTid,
        );
        return (
          <div>
            <h1>{rekrutteringstreff.tittel}</h1>
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
                  <Table.DataCell>Opprettet av NAV-kontor</Table.DataCell>
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
  );
};

export default Rekrutteringstreff;
