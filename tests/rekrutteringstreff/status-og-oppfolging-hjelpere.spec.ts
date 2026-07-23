import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { Formidling } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { lagStatusOgOppfølging } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/statusOgOppfølgingHjelpere';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { expect, test } from '@playwright/test';

const lagArbeidsgiver = (
  id: string,
  organisasjonsnummer: string,
): ArbeidsgiverDTO => ({
  arbeidsgiverTreffId: id,
  organisasjonsnummer,
  navn: `Testarbeidsgiver ${id}`,
  status: 'AKTIV',
  gateadresse: null,
  postnummer: null,
  poststed: null,
});

const lagJobbsøker = (id: string, fødselsnummer: string): JobbsøkerDTO => ({
  personTreffId: id,
  fødselsnummer,
  fornavn: `Testfornavn ${id}`,
  etternavn: `Testetternavn ${id}`,
  status: JobbsøkerStatus.SVART_JA,
  lagtTilDato: null,
  lagtTilAv: null,
  lagtTilAvNavn: null,
  alder: null,
  minsideHendelser: [],
});

const lagMøtedag = (overrides: Partial<MøtedagDTO> = {}): MøtedagDTO => ({
  rekrutteringstreffId: 'test-treff',
  fase: 'VURDERING',
  antallRom: 0,
  starttidspunkt: '09:00',
  varighetPerMøteMinutter: 5,
  pauseMellomMøterMinutter: 0,
  oppmøte: [],
  rom: [],
  arbeidsgiverRekkefølge: [],
  ønsker: [],
  intervjufordelinger: [],
  vurderinger: [],
  ...overrides,
});

const lagFormidling = (
  id: string,
  fødselsnummer: string,
  orgnr: string,
  overrides: Partial<Formidling> = {},
): Formidling => ({
  id,
  opprettetTidspunkt: '2026-07-23T09:00:00',
  fødselsnummer,
  fornavn: null,
  etternavn: null,
  orgnr,
  orgnavn: null,
  stillingId: 'test-stilling-felles',
  yrkestittel: null,
  sperret: false,
  ...overrides,
});

test.describe('status og oppfølging-hjelpere', () => {
  test('bygger unionen av speedintervju, ønske, vurdering og formidling', () => {
    const arbeidsgiver1 = lagArbeidsgiver('test-arbeidsgiver-1', 'TEST-ORG-1');
    const arbeidsgiver2 = lagArbeidsgiver('test-arbeidsgiver-2', 'TEST-ORG-2');
    const jobbsøkere = [
      lagJobbsøker('test-person-1', 'TEST-FNR-1'),
      lagJobbsøker('test-person-2', 'TEST-FNR-2'),
      lagJobbsøker('test-person-3', 'TEST-FNR-3'),
      lagJobbsøker('test-person-4', 'TEST-FNR-4'),
      lagJobbsøker('test-person-uten-status', 'TEST-FNR-UTEN-STATUS'),
    ];
    const [førsteKort, andreKort] = lagStatusOgOppfølging({
      arbeidsgivere: [arbeidsgiver1, arbeidsgiver2],
      jobbsøkere,
      møtedag: lagMøtedag({
        ønsker: [
          {
            personTreffId: 'test-person-2',
            arbeidsgiverTreffId: 'test-arbeidsgiver-1',
          },
        ],
        intervjufordelinger: [
          {
            arbeidsgiverTreffId: 'test-arbeidsgiver-1',
            inkludertePersonTreffIder: ['test-person-1'],
            ekskludertePersonTreffIder: [],
          },
        ],
        vurderinger: [
          {
            personTreffId: 'test-person-3',
            arbeidsgiverTreffId: 'test-arbeidsgiver-1',
            vurdering: 'AKTUELL',
            andreIntervju: true,
            jobbtilbud: false,
          },
          {
            personTreffId: 'test-person-uten-status',
            arbeidsgiverTreffId: 'test-arbeidsgiver-1',
            vurdering: null,
            andreIntervju: false,
            jobbtilbud: false,
          },
        ],
      }),
      formidlinger: [
        lagFormidling(
          'test-formidling-1',
          'TEST-FNR-4',
          arbeidsgiver1.organisasjonsnummer,
        ),
      ],
    });

    expect(førsteKort.rader.map((rad) => rad.jobbsøker.personTreffId)).toEqual([
      'test-person-1',
      'test-person-2',
      'test-person-3',
      'test-person-4',
    ]);
    expect(førsteKort.rader[0].sattOppTilSpeedintervju).toBe(true);
    expect(førsteKort.rader[1].ønsketIntervju).toBe(true);
    expect(førsteKort.rader[2].vurdering.andreIntervju).toBe(true);
    expect(førsteKort.rader[3].fåttJobben).toBe(true);
    expect(andreKort.rader).toEqual([]);
  });

  test('beholder en lagret vurdering etter at ønske og tildeling er fjernet', () => {
    const [kort] = lagStatusOgOppfølging({
      arbeidsgivere: [lagArbeidsgiver('test-arbeidsgiver-1', 'TEST-ORG-1')],
      jobbsøkere: [lagJobbsøker('test-person-1', 'TEST-FNR-1')],
      møtedag: lagMøtedag({
        vurderinger: [
          {
            personTreffId: 'test-person-1',
            arbeidsgiverTreffId: 'test-arbeidsgiver-1',
            vurdering: 'KANSKJE',
            andreIntervju: false,
            jobbtilbud: true,
          },
        ],
      }),
      formidlinger: [],
    });

    expect(kort.rader).toHaveLength(1);
    expect(kort.rader[0]).toMatchObject({
      ønsketIntervju: false,
      sattOppTilSpeedintervju: false,
      fåttJobben: false,
      vurdering: {
        vurdering: 'KANSKJE',
        jobbtilbud: true,
      },
    });
  });

  test('speiler flere kandidater i samme formidling og skiller ukjent fra nei', () => {
    const arbeidsgiver = lagArbeidsgiver('test-arbeidsgiver-1', 'TEST-ORG-1');
    const jobbsøkere = [
      lagJobbsøker('test-person-1', 'TEST-FNR-1'),
      lagJobbsøker('test-person-2', 'TEST-FNR-2'),
    ];
    const møtedag = lagMøtedag({
      ønsker: jobbsøkere.map((jobbsøker) => ({
        personTreffId: jobbsøker.personTreffId,
        arbeidsgiverTreffId: 'test-arbeidsgiver-1',
      })),
    });
    const formidlinger = [
      lagFormidling('test-formidling-1', 'TEST-FNR-1', 'TEST-ORG-1'),
      lagFormidling('test-formidling-2', 'TEST-FNR-2', 'TEST-ORG-1'),
    ];

    const [medFormidlinger] = lagStatusOgOppfølging({
      arbeidsgivere: [arbeidsgiver],
      jobbsøkere,
      møtedag,
      formidlinger,
    });
    const [utenFormidlinger] = lagStatusOgOppfølging({
      arbeidsgivere: [arbeidsgiver],
      jobbsøkere,
      møtedag,
    });

    expect(medFormidlinger.rader.map((rad) => rad.fåttJobben)).toEqual([
      true,
      true,
    ]);
    expect(utenFormidlinger.rader.map((rad) => rad.fåttJobben)).toEqual([
      null,
      null,
    ]);
  });

  test('ignorerer sperrede formidlinger og treff hos en annen arbeidsgiver', () => {
    const arbeidsgiver = lagArbeidsgiver('test-arbeidsgiver-1', 'TEST-ORG-1');
    const jobbsøker = lagJobbsøker('test-person-1', 'TEST-FNR-1');
    const [kort] = lagStatusOgOppfølging({
      arbeidsgivere: [arbeidsgiver],
      jobbsøkere: [jobbsøker],
      møtedag: lagMøtedag({
        ønsker: [
          {
            personTreffId: jobbsøker.personTreffId,
            arbeidsgiverTreffId: 'test-arbeidsgiver-1',
          },
        ],
      }),
      formidlinger: [
        lagFormidling('test-formidling-sperret', 'TEST-FNR-1', 'TEST-ORG-1', {
          sperret: true,
        }),
        lagFormidling(
          'test-formidling-annen-arbeidsgiver',
          'TEST-FNR-1',
          'TEST-ORG-2',
        ),
      ],
    });

    expect(kort.rader[0].fåttJobben).toBe(false);
  });
});
