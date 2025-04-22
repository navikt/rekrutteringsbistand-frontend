'use client';

import { useRekrutteringstreffContext } from '../../RekrutteringstreffContext';
import SlettRekrutteringstreffModal from '../SlettRekrutteringstreffModal';
import ArbeidsgiverHendelserKort from '../arbeidsgivere/components/ArbeidsgiverHendelserKort';
import JobbsøkerHendelserKort from '../jobbsøkere/components/JobbsøkerHendelserKort';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import { useJobbsøkerHendelser } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkerHendelser';
import SWRLaster from '@/app/components/SWRLaster';
/*import {
  Dato,
  datoFormatterer,
} from '@/app/rekrutteringstreff/RekrutteringstreffSøk';
import { Heading, Table } from '@navikt/ds-react';*/
import * as React from 'react';

const OmTreffet = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const jobbsøkerHendelserHook = useJobbsøkerHendelser(
    rekrutteringstreffId as string,
  );

  const arbeidsgiverHendelserHook = useArbeidsgiverHendelser(
    rekrutteringstreffId as string,
  );

  return (
    <div>
      {/*<SWRLaster hooks={[rekrutteringstreffHook]}>
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
      </SWRLaster>*/}

      <div className='mt-4'>
        <SlettRekrutteringstreffModal />
      </div>

      <div className='mt-4 flex flex-col gap-16 md:flex-row'>
        <SWRLaster hooks={[arbeidsgiverHendelserHook]}>
          {(arbeidsgiverHendelser) => (
            <ArbeidsgiverHendelserKort
              arbeidsgiverHendelserDTO={arbeidsgiverHendelser || []}
            />
          )}
        </SWRLaster>
        <SWRLaster hooks={[jobbsøkerHendelserHook]}>
          {(jobbsøkerHendelser) => (
            <JobbsøkerHendelserKort
              jobbsøkerHendelserDTO={jobbsøkerHendelser || []}
            />
          )}
        </SWRLaster>
      </div>
    </div>
  );
};

export default OmTreffet;
