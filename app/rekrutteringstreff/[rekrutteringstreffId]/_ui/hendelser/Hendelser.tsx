'use client';

import {
  ArbeidsgiverHendelseLabel,
  JobbsøkerHendelseLabel,
  RekrutteringstreffHendelseLabel,
} from '../jobbsøker/HendelseLabel';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/useAlleHendelser';
import { getHendelseIcon } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/hendelser/HentHendelseIkon';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import {
  ArbeidsgiverHendelsestype,
  JobbsøkerHendelsestype,
  RekrutteringstreffHendelsestype,
} from '@/app/rekrutteringstreff/_types/constants';
import { Table } from '@navikt/ds-react';
import { format } from 'date-fns';
import { FC } from 'react';

const HendelseLabelForRessurs: FC<{
  ressurs: string;
  hendelsestype: string;
}> = ({ ressurs, hendelsestype }) => {
  const icon = getHendelseIcon(hendelsestype);

  switch (ressurs) {
    case 'JOBBSØKER':
      return (
        <JobbsøkerHendelseLabel
          hendelseType={hendelsestype as JobbsøkerHendelsestype}
          icon={icon}
          size='small'
        />
      );
    case 'ARBEIDSGIVER':
      return (
        <ArbeidsgiverHendelseLabel
          hendelseType={hendelsestype as ArbeidsgiverHendelsestype}
          icon={icon}
          size='small'
        />
      );
    case 'REKRUTTERINGSTREFF':
    default:
      return (
        <RekrutteringstreffHendelseLabel
          hendelseType={hendelsestype as RekrutteringstreffHendelsestype}
          icon={icon}
          size='small'
        />
      );
  }
};

const Hendelser: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: hendelser } = useAlleHendelser(rekrutteringstreffId);

  if (!hendelser) return null;

  const lowercaseStorBokstavFørst = (txt: string) =>
    txt.length === 0 ? '' : txt[0].toUpperCase() + txt.slice(1).toLowerCase();

  return (
    <section className='mt-4 overflow-auto'>
      <Table size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope='col'>Hendelse</Table.HeaderCell>
            <Table.HeaderCell scope='col'>Ressurs</Table.HeaderCell>
            <Table.HeaderCell scope='col'>Tidspunkt</Table.HeaderCell>
            <Table.HeaderCell scope='col'>Utført av</Table.HeaderCell>
            <Table.HeaderCell scope='col'>Gjelder</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {hendelser.map((h) => (
            <Table.Row key={h.id}>
              <Table.DataCell>
                <HendelseLabelForRessurs
                  ressurs={h.ressurs}
                  hendelsestype={h.hendelsestype}
                />
              </Table.DataCell>
              <Table.DataCell>
                {lowercaseStorBokstavFørst(h.ressurs)}
              </Table.DataCell>
              <Table.DataCell className='whitespace-nowrap'>
                {format(new Date(h.tidspunkt), 'dd.MM.yy HH:mm')}
              </Table.DataCell>
              <Table.DataCell title={h.aktørIdentifikasjon ?? 'System'}>
                {h.aktørIdentifikasjon ?? 'System'}
              </Table.DataCell>
              <Table.DataCell>
                <span>{h.subjektNavn ?? '-'}</span>
                {h.subjektId && (
                  <span className='text-text-subtle ml-1'>({h.subjektId})</span>
                )}
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  );
};

export default Hendelser;
