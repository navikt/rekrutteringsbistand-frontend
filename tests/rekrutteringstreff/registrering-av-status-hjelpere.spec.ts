import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import type { Formidling } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { lagRegistreringAvStatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/registreringAvStatusHjelpere';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { expect, test } from '@playwright/test';

const lagArbeidsgiver = (
  id: string,
  organisasjonsnummer: string,
): ArbeidsgiverDTO & { arbeidsgiverTreffId: string } => ({
  arbeidsgiverTreffId: id,
  organisasjonsnummer,
  navn: `Testarbeidsgiver ${id}`,
  status: 'AKTIV',
  gateadresse: null,
  postnummer: null,
  poststed: null,
});

const lagJobbsøker = (
  id: string,
  fødselsnummer: string,
): JobbsøkerDTO & { fødselsnummer: string } => ({
  personTreffId: id,
  fødselsnummer,
  fornavn: `Testfornavn ${id}`,
  etternavn: `Testetternavn ${id}`,
  status: JobbsøkerStatus.SVART_JA,
  lagtTilDato: null,
  lagtTilAv: null,
  lagtTilAvNavn: null,
  alder: null,
  innsatsgruppe: null,
  minsideHendelser: [],
});

const lagTreffgjennomføring = (
  overrides: Partial<TreffgjennomføringDTO> = {},
): TreffgjennomføringDTO => ({
  rekrutteringstreffId: 'test-treff',
  gjeldendeSteg: 'VURDERING',
  antallRom: 0,
  starttidspunkt: '09:00',
  varighetPerMøteMinutter: 5,
  oppmøte: [],
  deltakernummer: [],
  rom: [],
  arbeidsgiverRekkefølge: [],
  interesser: [],
  intervjufordelinger: [],
  vurderinger: [],
  ...overrides,
});

const lagFormidling = (
  id: string,
  personTreffId: string,
  arbeidsgiverTreffId: string,
  overrides: Partial<Formidling> = {},
): Formidling => ({
  id,
  opprettetTidspunkt: '2026-07-23T09:00:00',
  personTreffId,
  arbeidsgiverTreffId,
  // Fødselsnummer og orgnr er kun til visning i formidlingslista, og skal
  // aldri brukes som koblingsnøkkel. Testene setter dem derfor til verdier
  // som ikke matcher noe annet i testdataene.
  fødselsnummer: null,
  fornavn: null,
  etternavn: null,
  orgnr: 'TEST-ORG-BRUKES-IKKE-TIL-KOBLING',
  orgnavn: null,
  stillingId: 'test-stilling-felles',
  yrkestittel: null,
  sperret: false,
  opprettetAvNavn: null,
  opprettetAvNavIdent: null,
  ...overrides,
});

test.describe('registrering av status-hjelpere', () => {
  test('bygger unionen av speedintervju, interesse, vurdering og formidling', () => {
    const arbeidsgiver1 = lagArbeidsgiver('test-arbeidsgiver-1', 'TEST-ORG-1');
    const arbeidsgiver2 = lagArbeidsgiver('test-arbeidsgiver-2', 'TEST-ORG-2');
    const jobbsøkere = [
      lagJobbsøker('test-person-1', 'TEST-FNR-1'),
      lagJobbsøker('test-person-2', 'TEST-FNR-2'),
      lagJobbsøker('test-person-3', 'TEST-FNR-3'),
      lagJobbsøker('test-person-4', 'TEST-FNR-4'),
      lagJobbsøker('test-person-uten-status', 'TEST-FNR-UTEN-STATUS'),
    ];
    const [førsteKort, andreKort] = lagRegistreringAvStatus({
      arbeidsgivere: [arbeidsgiver1, arbeidsgiver2],
      jobbsøkere,
      treffgjennomføring: lagTreffgjennomføring({
        interesser: [
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
            vurderingsstatus: 'AKTUELL',
            vurderingsnotat: [],

            avtaltIntervju: true,

            avtaltIntervjuDato: null,
            jobbtilbud: false,
          },
          {
            personTreffId: 'test-person-uten-status',
            arbeidsgiverTreffId: 'test-arbeidsgiver-1',
            vurderingsstatus: null,
            vurderingsnotat: [],

            avtaltIntervju: false,

            avtaltIntervjuDato: null,
            jobbtilbud: false,
          },
        ],
      }),
      formidlinger: [
        lagFormidling(
          'test-formidling-1',
          'test-person-4',
          arbeidsgiver1.arbeidsgiverTreffId,
        ),
      ],
    });

    expect(førsteKort.rader.map((rad) => rad.jobbsøker.personTreffId)).toEqual([
      'test-person-1',
      'test-person-2',
      'test-person-3',
      'test-person-4',
    ]);
    expect(førsteKort.rader[0].sattOppTilIntervju).toBe(true);
    expect(førsteKort.rader[1].harInteresse).toBe(true);
    expect(førsteKort.rader[2].vurdering.avtaltIntervju).toBe(true);
    expect(førsteKort.rader[3].formidlet).toBe(true);
    expect(andreKort.rader).toEqual([]);
  });

  test('beholder en lagret vurdering etter at interesse og tildeling er fjernet', () => {
    const [kort] = lagRegistreringAvStatus({
      arbeidsgivere: [lagArbeidsgiver('test-arbeidsgiver-1', 'TEST-ORG-1')],
      jobbsøkere: [lagJobbsøker('test-person-1', 'TEST-FNR-1')],
      treffgjennomføring: lagTreffgjennomføring({
        vurderinger: [
          {
            personTreffId: 'test-person-1',
            arbeidsgiverTreffId: 'test-arbeidsgiver-1',
            vurderingsstatus: 'KANSKJE',
            vurderingsnotat: [],

            avtaltIntervju: false,

            avtaltIntervjuDato: null,
            jobbtilbud: true,
          },
        ],
      }),
      formidlinger: [],
    });

    expect(kort.rader).toHaveLength(1);
    expect(kort.rader[0]).toMatchObject({
      harInteresse: false,
      sattOppTilIntervju: false,
      formidlet: false,
      vurdering: {
        vurderingsstatus: 'KANSKJE',
        vurderingsnotat: [],

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
    const treffgjennomføring = lagTreffgjennomføring({
      interesser: jobbsøkere.map((jobbsøker) => ({
        personTreffId: jobbsøker.personTreffId,
        arbeidsgiverTreffId: 'test-arbeidsgiver-1',
      })),
    });
    const formidlinger = [
      lagFormidling(
        'test-formidling-1',
        'test-person-1',
        arbeidsgiver.arbeidsgiverTreffId,
      ),
      lagFormidling(
        'test-formidling-2',
        'test-person-2',
        arbeidsgiver.arbeidsgiverTreffId,
      ),
    ];

    const [medFormidlinger] = lagRegistreringAvStatus({
      arbeidsgivere: [arbeidsgiver],
      jobbsøkere,
      treffgjennomføring,
      formidlinger,
    });
    const [utenFormidlinger] = lagRegistreringAvStatus({
      arbeidsgivere: [arbeidsgiver],
      jobbsøkere,
      treffgjennomføring,
    });

    expect(medFormidlinger.rader.map((rad) => rad.formidlet)).toEqual([
      true,
      true,
    ]);
    expect(utenFormidlinger.rader.map((rad) => rad.formidlet)).toEqual([
      null,
      null,
    ]);
  });

  test('ignorerer sperrede formidlinger og treff hos en annen arbeidsgiver', () => {
    const arbeidsgiver = lagArbeidsgiver('test-arbeidsgiver-1', 'TEST-ORG-1');
    const jobbsøker = lagJobbsøker('test-person-1', 'TEST-FNR-1');
    const [kort] = lagRegistreringAvStatus({
      arbeidsgivere: [arbeidsgiver],
      jobbsøkere: [jobbsøker],
      treffgjennomføring: lagTreffgjennomføring({
        interesser: [
          {
            personTreffId: jobbsøker.personTreffId,
            arbeidsgiverTreffId: 'test-arbeidsgiver-1',
          },
        ],
      }),
      formidlinger: [
        lagFormidling(
          'test-formidling-sperret',
          jobbsøker.personTreffId,
          arbeidsgiver.arbeidsgiverTreffId,
          { sperret: true },
        ),
        lagFormidling(
          'test-formidling-annen-arbeidsgiver',
          jobbsøker.personTreffId,
          'test-arbeidsgiver-2',
        ),
      ],
    });

    expect(kort.rader[0].formidlet).toBe(false);
  });

  test('kobler på personTreffId, ikke på fødselsnummer og orgnr', () => {
    const arbeidsgiver = lagArbeidsgiver('test-arbeidsgiver-1', 'TEST-ORG-1');
    const jobbsøker = lagJobbsøker('test-person-1', 'TEST-FNR-1');
    const treffgjennomføring = lagTreffgjennomføring({
      interesser: [
        {
          personTreffId: jobbsøker.personTreffId,
          arbeidsgiverTreffId: arbeidsgiver.arbeidsgiverTreffId,
        },
      ],
    });

    const [medRiktigNøkkel] = lagRegistreringAvStatus({
      arbeidsgivere: [arbeidsgiver],
      jobbsøkere: [jobbsøker],
      treffgjennomføring,
      formidlinger: [
        lagFormidling(
          'test-formidling-riktig-nokkel',
          jobbsøker.personTreffId,
          arbeidsgiver.arbeidsgiverTreffId,
          {
            fødselsnummer: 'TEST-FNR-SOM-IKKE-MATCHER',
            orgnr: 'TEST-ORG-SOM-IKKE-MATCHER',
          },
        ),
      ],
    });
    const [medGammelNøkkel] = lagRegistreringAvStatus({
      arbeidsgivere: [arbeidsgiver],
      jobbsøkere: [jobbsøker],
      treffgjennomføring,
      formidlinger: [
        lagFormidling(
          'test-formidling-gammel-nokkel',
          'test-person-som-ikke-finnes',
          'test-arbeidsgiver-som-ikke-finnes',
          {
            fødselsnummer: jobbsøker.fødselsnummer,
            orgnr: arbeidsgiver.organisasjonsnummer,
          },
        ),
      ],
    });

    expect(medRiktigNøkkel.rader[0].formidlet).toBe(true);
    expect(medGammelNøkkel.rader[0].formidlet).toBe(false);
  });
});
