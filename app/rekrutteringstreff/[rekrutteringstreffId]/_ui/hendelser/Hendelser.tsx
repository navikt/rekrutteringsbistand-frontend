'use client';

import {
  ArbeidsgiverHendelseLabel,
  JobbsøkerHendelseLabel,
  RekrutteringstreffHendelseLabel,
} from '../jobbsøker/HendelseLabel';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/useAlleHendelser';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { getHendelseIcon } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/hendelser/HentHendelseIkon';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import {
  ArbeidsgiverHendelsestype,
  JobbsøkerHendelsestype,
  RekrutteringstreffHendelsestype,
} from '@/app/rekrutteringstreff/_types/constants';
import { Table } from '@navikt/ds-react';
import { format } from 'date-fns';
import { FC, useMemo } from 'react';

const HendelseLabelForRessurs: FC<{
  ressurs: string;
  hendelsestype: string;
  hendelseData?: unknown;
  navnPåArbeidsgiver: (arbeidsgiverTreffId: string) => string | undefined;
}> = ({ ressurs, hendelsestype, hendelseData, navnPåArbeidsgiver }) => {
  const icon = getHendelseIcon(hendelsestype);

  switch (ressurs) {
    case 'JOBBSØKER':
      return (
        <JobbsøkerHendelseLabel
          hendelseType={hendelsestype as JobbsøkerHendelsestype}
          icon={icon}
          size='small'
          hendelseData={hendelseData}
          navnPåArbeidsgiver={navnPåArbeidsgiver}
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

const erJobbsøker = (ressurs: string) =>
  ressurs === 'JOBBSØKER' || ressurs === 'FORMIDLING';

// Personer med adressebeskyttelse kommer uten navn, men skal fortsatt vises som jobbsøker.
const ukjentSubjekt = (ressurs: string) =>
  erJobbsøker(ressurs) ? 'Ukjent jobbsøker' : '-';

// Usynlige på WorkOp kommer med navn, men uten fødselsnummer.
const subjektDetalj = (h: {
  ressurs: string;
  subjektId?: string | null;
  subjektNavn?: string | null;
}) => {
  if (h.subjektId) return h.subjektId;
  if (h.subjektNavn && erJobbsøker(h.ressurs)) return 'Ikke tilgjengelig';
  return null;
};

// Har jobbsøkeren selv svart, er aktøren fødselsnummeret. Det kommer som null når det er skjermet.
const utførtAv = (h: {
  opprettetAvAktørType: string;
  aktørIdentifikasjon: string | null;
}) =>
  h.aktørIdentifikasjon ??
  (h.opprettetAvAktørType === 'JOBBSØKER' ? 'Jobbsøker' : 'System');

const Hendelser: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: hendelser } = useAlleHendelser(rekrutteringstreffId);
  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const navnPåArbeidsgiver = useMemo(() => {
    const navnPerId = new Map(
      (arbeidsgivere ?? []).map((a) => [a.arbeidsgiverTreffId, a.navn]),
    );
    return (arbeidsgiverTreffId: string) => navnPerId.get(arbeidsgiverTreffId);
  }, [arbeidsgivere]);

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
                  hendelseData={h.hendelseData}
                  navnPåArbeidsgiver={navnPåArbeidsgiver}
                />
              </Table.DataCell>
              <Table.DataCell>
                {lowercaseStorBokstavFørst(h.ressurs)}
              </Table.DataCell>
              <Table.DataCell className='whitespace-nowrap'>
                {format(new Date(h.tidspunkt), 'dd.MM.yy HH:mm')}
              </Table.DataCell>
              <Table.DataCell title={utførtAv(h)}>{utførtAv(h)}</Table.DataCell>
              <Table.DataCell>
                <span>{h.subjektNavn ?? ukjentSubjekt(h.ressurs)}</span>
                {subjektDetalj(h) && (
                  <span className='text-text-subtle ml-1'>
                    ({subjektDetalj(h)})
                  </span>
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
