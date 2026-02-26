import type { JobbsøkerDTO, JobbsøkereResponseDTO } from './useJobbsøkere';
import {
  JobbsøkerHendelsestype,
  JobbsøkerStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import { Faker, nb_NO } from '@faker-js/faker';

const faker = new Faker({ locale: [nb_NO] });
faker.seed(123);

const lagId = () => faker.string.uuid();
const lagFnr = () => `${faker.string.numeric(6)}${faker.string.numeric(5)}`;

const baseDate = new Date('2026-02-12T10:00:00+01:00');
const tid = (offsetMs: number) =>
  new Date(baseDate.getTime() + offsetMs).toISOString();

const basisHendelse = (offset: number, type: JobbsøkerHendelsestype) => ({
  id: lagId(),
  tidspunkt: tid(offset),
  hendelsestype: type,
  opprettetAvAktørType: 'ARRANGØR' as const,
  aktørIdentifikasjon: 'testperson',
  hendelseData: null,
});

const minsideHendelse = (
  fnr: string,
  offset: number,
  kanal: string | null,
  eksternStatus: string,
  minsideStatus: string,
  mal = 'KANDIDAT_INVITERT_TREFF',
  flettedata: string[] | null = null,
  eksternFeilmelding: string | null = null,
) => ({
  id: lagId(),
  tidspunkt: tid(offset),
  hendelsestype: JobbsøkerHendelsestype.MOTTATT_SVAR_FRA_MINSIDE,
  opprettetAvAktørType: 'SYSTEM' as const,
  aktørIdentifikasjon: null,
  hendelseData: {
    varselId: lagId(),
    avsenderReferanseId: lagId(),
    fnr,
    eksternStatus,
    minsideStatus,
    opprettet: tid(offset - 500),
    avsenderNavident: 'Z123456',
    eksternFeilmelding: eksternFeilmelding,
    eksternKanal: kanal,
    mal,
    flettedata,
  },
});

// ─── 1. Kun lagt til (ikke invitert) ───
const jobbsøkerLagtTil = (): JobbsøkerDTO => ({
  personTreffId: 'js-lagt-til',
  fødselsnummer: lagFnr(),
  fornavn: 'Marius',
  etternavn: 'Johnsen',
  navkontor: 'Nav Bærum',
  veilederNavn: 'Fredrik Agboola',
  veilederNavIdent: 'L174111',
  status: JobbsøkerStatus.LAGT_TIL,
  hendelser: [basisHendelse(0, JobbsøkerHendelsestype.OPPRETTET)],
});

// ─── 2. Invitert – SMS og Epost levert ───
const jobbsøkerInvitertSmsOgEpost = (): JobbsøkerDTO => {
  const fnr = lagFnr();
  return {
    personTreffId: 'js-invitert-sms-epost',
    fødselsnummer: fnr,
    fornavn: 'Håkon',
    etternavn: 'Pettersen',
    navkontor: 'Nav Bærum',
    veilederNavn: 'Marie Oluwanisola',
    veilederNavIdent: 'A479484',
    status: JobbsøkerStatus.INVITERT,
    hendelser: [
      basisHendelse(0, JobbsøkerHendelsestype.OPPRETTET),
      basisHendelse(1000, JobbsøkerHendelsestype.INVITERT),
      minsideHendelse(fnr, 2000, 'SMS', 'SENDT', 'AKTIV'),
      minsideHendelse(fnr, 3000, 'EPOST', 'SENDT', 'AKTIV'),
    ],
  };
};

// ─── 3. Svart ja – SMS levert ───
const jobbsøkerSvartJa = (): JobbsøkerDTO => {
  const fnr = lagFnr();
  return {
    personTreffId: 'js-svart-ja',
    fødselsnummer: fnr,
    fornavn: 'Jonathan',
    etternavn: 'Huseby',
    navkontor: 'Nav Kongsberg',
    veilederNavn: 'Eline Bello',
    veilederNavIdent: 'J370702',
    status: JobbsøkerStatus.SVART_JA,
    hendelser: [
      basisHendelse(0, JobbsøkerHendelsestype.OPPRETTET),
      basisHendelse(1000, JobbsøkerHendelsestype.INVITERT),
      {
        id: lagId(),
        tidspunkt: tid(2000),
        hendelsestype: JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
        opprettetAvAktørType: 'JOBBSØKER',
        aktørIdentifikasjon: fnr,
        hendelseData: null,
      },
      minsideHendelse(fnr, 3000, 'SMS', 'SENDT', 'AKTIV'),
    ],
  };
};

// ─── 4. Svart nei – SMS levert ───
const jobbsøkerSvartNei = (): JobbsøkerDTO => {
  const fnr = lagFnr();
  return {
    personTreffId: 'js-svart-nei',
    fødselsnummer: fnr,
    fornavn: 'Lise',
    etternavn: 'Andersen',
    navkontor: 'Nav Grorud',
    veilederNavn: 'Per Hansen',
    veilederNavIdent: 'P123456',
    status: JobbsøkerStatus.SVART_NEI,
    hendelser: [
      basisHendelse(0, JobbsøkerHendelsestype.OPPRETTET),
      basisHendelse(1000, JobbsøkerHendelsestype.INVITERT),
      {
        id: lagId(),
        tidspunkt: tid(2000),
        hendelsestype: JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON,
        opprettetAvAktørType: 'JOBBSØKER',
        aktørIdentifikasjon: fnr,
        hendelseData: null,
      },
      minsideHendelse(fnr, 3000, 'SMS', 'SENDT', 'AKTIV'),
    ],
  };
};

// ─── 5. Invitert – kun Min side-levering (ingen KRR) ───
const jobbsøkerKunMinside = (): JobbsøkerDTO => {
  const fnr = lagFnr();
  return {
    personTreffId: 'js-minside',
    fødselsnummer: fnr,
    fornavn: 'Stor',
    etternavn: 'Test',
    navkontor: 'Nav Grorud',
    veilederNavn: 'Ole Vansen',
    veilederNavIdent: 'Z999888',
    status: JobbsøkerStatus.INVITERT,
    hendelser: [
      basisHendelse(0, JobbsøkerHendelsestype.OPPRETTET),
      basisHendelse(1000, JobbsøkerHendelsestype.INVITERT),
      minsideHendelse(fnr, 2000, null, 'FEILET', 'OPPRETTET'),
    ],
  };
};

// ─── 6. Invitert – varsel helt feilet ───
const jobbsøkerFeiletVarsel = (): JobbsøkerDTO => {
  const fnr = lagFnr();
  return {
    personTreffId: 'js-feilet',
    fødselsnummer: fnr,
    fornavn: 'Teoretisk',
    etternavn: 'Skade',
    navkontor: 'Nav Stovner',
    veilederNavn: 'Kari Nordmann',
    veilederNavIdent: 'Z990248',
    status: JobbsøkerStatus.INVITERT,
    hendelser: [
      basisHendelse(0, JobbsøkerHendelsestype.OPPRETTET),
      basisHendelse(1000, JobbsøkerHendelsestype.INVITERT),
      minsideHendelse(
        fnr,
        2000,
        null,
        'FEILET',
        'FEILET',
        'KANDIDAT_INVITERT_TREFF',
        null,
        'Kunne ikke levere varsel',
      ),
    ],
  };
};

// ─── 7. Svart ja – treff avlyst, SMS om avlysning ───
const jobbsøkerAvlystSvartJa = (): JobbsøkerDTO => {
  const fnr = lagFnr();
  return {
    personTreffId: 'js-avlyst-svart-ja',
    fødselsnummer: fnr,
    fornavn: 'Kristine',
    etternavn: 'Bakken',
    navkontor: 'Nav Sagene',
    veilederNavn: 'Thomas Berg',
    veilederNavIdent: 'T456789',
    status: JobbsøkerStatus.SVART_JA,
    hendelser: [
      basisHendelse(0, JobbsøkerHendelsestype.OPPRETTET),
      basisHendelse(1000, JobbsøkerHendelsestype.INVITERT),
      {
        id: lagId(),
        tidspunkt: tid(2000),
        hendelsestype: JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
        opprettetAvAktørType: 'JOBBSØKER',
        aktørIdentifikasjon: fnr,
        hendelseData: null,
      },
      {
        id: lagId(),
        tidspunkt: tid(3000),
        hendelsestype: JobbsøkerHendelsestype.SVART_JA_TREFF_AVLYST,
        opprettetAvAktørType: 'SYSTEM',
        aktørIdentifikasjon: 'SYSTEM',
        hendelseData: null,
      },
      minsideHendelse(fnr, 3500, 'SMS', 'SENDT', 'AKTIV'),
      minsideHendelse(
        fnr,
        4500,
        'SMS',
        'SENDT',
        'AKTIV',
        'KANDIDAT_INVITERT_TREFF_AVLYST',
      ),
    ],
  };
};

// ─── 8. Svart ja – SMS med endret treff (flettedata) ───
const jobbsøkerEndretTreff = (): JobbsøkerDTO => {
  const fnr = lagFnr();
  return {
    personTreffId: 'js-endret-treff',
    fødselsnummer: fnr,
    fornavn: 'Anders',
    etternavn: 'Holm',
    navkontor: 'Nav Grünerløkka',
    veilederNavn: 'Siri Dahl',
    veilederNavIdent: 'S789012',
    status: JobbsøkerStatus.SVART_JA,
    hendelser: [
      basisHendelse(0, JobbsøkerHendelsestype.OPPRETTET),
      basisHendelse(1000, JobbsøkerHendelsestype.INVITERT),
      {
        id: lagId(),
        tidspunkt: tid(2000),
        hendelsestype: JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON,
        opprettetAvAktørType: 'JOBBSØKER',
        aktørIdentifikasjon: fnr,
        hendelseData: null,
      },
      minsideHendelse(fnr, 3000, 'SMS', 'SENDT', 'AKTIV'),
      minsideHendelse(
        fnr,
        5000,
        'SMS',
        'SENDT',
        'AKTIV',
        'KANDIDAT_INVITERT_TREFF_ENDRET',
        ['tidspunkt', 'sted'],
      ),
    ],
  };
};

// ─── 9. Kun lagt til (ikke invitert) ───
const jobbsøkerLagtTil2 = (): JobbsøkerDTO => ({
  personTreffId: 'js-lagt-til-2',
  fødselsnummer: lagFnr(),
  fornavn: 'Emilie',
  etternavn: 'Berg',
  navkontor: 'Nav Frogner',
  veilederNavn: 'Jonas Berger',
  veilederNavIdent: 'J112233',
  status: JobbsøkerStatus.LAGT_TIL,
  hendelser: [basisHendelse(0, JobbsøkerHendelsestype.OPPRETTET)],
});

// ─── 10. Kun lagt til (ikke invitert) ───
const jobbsøkerLagtTil3 = (): JobbsøkerDTO => ({
  personTreffId: 'js-lagt-til-3',
  fødselsnummer: lagFnr(),
  fornavn: 'Oscar',
  etternavn: 'Haugen',
  navkontor: 'Nav Majorstuen',
  veilederNavn: 'Ida Kvam',
  veilederNavIdent: 'I445566',
  status: JobbsøkerStatus.LAGT_TIL,
  hendelser: [basisHendelse(0, JobbsøkerHendelsestype.OPPRETTET)],
});

// ─── Responser per treff-status ───

export const jobbsøkerePublisertMock = (): JobbsøkereResponseDTO => ({
  jobbsøkere: [
    jobbsøkerLagtTil(),
    jobbsøkerLagtTil2(),
    jobbsøkerLagtTil3(),
    jobbsøkerInvitertSmsOgEpost(),
    jobbsøkerSvartJa(),
    jobbsøkerSvartNei(),
    jobbsøkerKunMinside(),
    jobbsøkerFeiletVarsel(),
    jobbsøkerEndretTreff(),
  ],
  antallSynlige: 9,
  antallSkjulte: 1,
  antallSlettede: 0,
});

export const jobbsøkereUtkastMock = (): JobbsøkereResponseDTO => ({
  jobbsøkere: [jobbsøkerLagtTil()],
  antallSynlige: 1,
  antallSkjulte: 0,
  antallSlettede: 0,
});

export const jobbsøkereAvlystMock = (): JobbsøkereResponseDTO => ({
  jobbsøkere: [jobbsøkerAvlystSvartJa(), jobbsøkerSvartNei()],
  antallSynlige: 2,
  antallSkjulte: 0,
  antallSlettede: 0,
});

export const jobbsøkereFullførtMock = (): JobbsøkereResponseDTO => ({
  jobbsøkere: [
    jobbsøkerSvartJa(),
    jobbsøkerSvartNei(),
    jobbsøkerInvitertSmsOgEpost(),
  ],
  antallSynlige: 3,
  antallSkjulte: 0,
  antallSlettede: 0,
});

export const jobbsøkereIngenSvartJaMock = (): JobbsøkereResponseDTO => ({
  jobbsøkere: [
    jobbsøkerLagtTil(),
    jobbsøkerInvitertSmsOgEpost(),
    jobbsøkerSvartNei(),
    jobbsøkerKunMinside(),
  ],
  antallSynlige: 4,
  antallSkjulte: 0,
  antallSlettede: 0,
});

export const jobbsøkereTomtMock = (): JobbsøkereResponseDTO => ({
  jobbsøkere: [],
  antallSynlige: 0,
  antallSkjulte: 0,
  antallSlettede: 0,
});

export const jobbsøkereMock = jobbsøkerePublisertMock;
