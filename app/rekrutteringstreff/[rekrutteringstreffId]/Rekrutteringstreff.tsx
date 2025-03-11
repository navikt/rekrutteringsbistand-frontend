'use client';

import { Dato, datoFormatterer } from '../RekrutteringstreffSøk';
import RekrutteringstreffDetaljerKort from './components/RekrutteringstreffDetaljerKort';
import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import SWRLaster from '@/app/components/SWRLaster';
import { BriefcaseIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Heading, Table, Tabs } from '@navikt/ds-react';
import { useParams } from 'next/navigation';
import * as React from 'react';

export enum RekrutteringstreffTabs {
  OM_TREFFET = 'om_treffet',
  DELTAKERE = 'deltakere',
  ARBEIDSGIVERE = 'arbeidsgivere',
}

const Rekrutteringstreff: React.FC = () => {
  const { rekrutteringstreffId } = useParams();
  const rekrutteringstreffHook = useRekrutteringstreff(
    rekrutteringstreffId as string,
  );
  const [activeTab, setActiveTab] = React.useState<RekrutteringstreffTabs>(
    RekrutteringstreffTabs.OM_TREFFET,
  );

  const [arbeidsgivere, setArbeidsgivere] = React.useState<ArbeidsgiverDTO[]>(
    [],
  );

  const [, setIsModalOpen] = React.useState(false);

  const handleLeggTilArbeidsgiver = (arbeidsgiver: ArbeidsgiverDTO) => {
    setArbeidsgivere((arbeidsgiverliste) => [
      ...arbeidsgiverliste,
      arbeidsgiver,
    ]);
    setActiveTab(RekrutteringstreffTabs.ARBEIDSGIVERE);
  };

  return (
    <Box.New>
      <Tabs
        value={activeTab}
        onChange={(value) => setActiveTab(value as RekrutteringstreffTabs)}
      >
        <Tabs.List className='w-full'>
          <Tabs.Tab
            value={RekrutteringstreffTabs.OM_TREFFET}
            label='Om treffet'
          />
          <Tabs.Tab
            value={RekrutteringstreffTabs.DELTAKERE}
            label='Deltakere'
          />
          <Tabs.Tab
            value={RekrutteringstreffTabs.ARBEIDSGIVERE}
            label='Arbeidsgivere'
          />
        </Tabs.List>

        <Tabs.Panel value={RekrutteringstreffTabs.OM_TREFFET} className='my-4'>
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
                        <Table.DataCell>
                          {rekrutteringstreff.tittel}
                        </Table.DataCell>
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
          <div className='mt-4'>
            <RekrutteringstreffDetaljerKort
              overskrift='Arbeidsgiver'
              tittel='WinWin AS'
              beskrivelse='lalala'
              ikon={
                <BriefcaseIcon className='w-8 h-8 text-gray-600 m-2 rounded-[100px]' />
              }
              onLeggTilArbeidsgiver={handleLeggTilArbeidsgiver}
              onCloseModal={() => setIsModalOpen(false)}
            />
          </div>
        </Tabs.Panel>

        <Tabs.Panel value={RekrutteringstreffTabs.DELTAKERE}>
          <div className='p-4'>
            <Heading level='2' size='medium' className='mb-2'>
              Deltakere
            </Heading>
            <BodyShort>TODO</BodyShort>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value={RekrutteringstreffTabs.ARBEIDSGIVERE}>
          <div className='p-4'>
            <Heading level='2' size='medium' className='mb-2'>
              Arbeidsgivere
            </Heading>
            {arbeidsgivere.length === 0 ? (
              <BodyShort>Ingen arbeidsgivere lagt til</BodyShort>
            ) : (
              <ul>
                {arbeidsgivere.map((a, index) => (
                  <li key={index}>{JSON.stringify(a)}</li>
                ))}
              </ul>
            )}
          </div>
        </Tabs.Panel>
      </Tabs>
    </Box.New>
  );
};

export default Rekrutteringstreff;
