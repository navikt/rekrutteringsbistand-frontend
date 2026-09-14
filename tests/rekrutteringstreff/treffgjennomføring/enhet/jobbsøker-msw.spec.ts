import { lagTreffgjennomføring } from './testdata';
import { workOpArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgivereMock';
import { JobbsøkerSøkResponsSchema } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import {
  TreffgjennomføringSchema,
  type TreffgjennomføringDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { treffgjennomføringStore } from '@/app/api/rekrutteringstreff/mswState';
import { mswHandlers } from '@/mocks/handlers';
import { expect, test } from '@playwright/test';
import { setupServer } from 'msw/node';

const server = setupServer(...mswHandlers);
const treffId = 'workop';
const arbeidsgiverTreffId = workOpArbeidsgivere()[0].arbeidsgiverTreffId!;
const personTreffId = 'mock-js-001';
const tomVurdering = {
  personTreffId,
  arbeidsgiverTreffId,
  vurderingsstatus: null,
  vurderingsnotat: [],
  avtaltIntervju: false,
  avtaltIntervjuDato: null,
  jobbtilbud: false,
};
let scope: string;

test.beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
test.afterAll(() => server.close());
test.beforeEach(() => {
  scope = `livssyklus-${crypto.randomUUID()}`;
});

const kall = (
  sti: string,
  method = 'GET',
  body?: unknown,
  testScope = scope,
  id = treffId,
) =>
  fetch(`http://localhost/api/rekrutteringstreff/${id}${sti}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      cookie: `${PLAYWRIGHT_MSW_SCOPE_COOKIE}=${testScope}`,
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });

const hent = async (testScope = scope) => {
  const svar = await kall(
    '/treffgjennomforing-og-oppfolging',
    'GET',
    undefined,
    testScope,
  );
  expect(svar.status).toBe(200);
  return TreffgjennomføringSchema.parse(await svar.json());
};

const søk = async (testScope = scope, id = treffId) => {
  const svar = await kall(
    '/jobbsoker/sok',
    'POST',
    { side: 1, antallPerSide: 100 },
    testScope,
    id,
  );
  expect(svar.status).toBe(200);
  return JobbsøkerSøkResponsSchema.parse(await svar.json());
};

const slett = (id: string, testScope = scope, treff = treffId) =>
  kall(`/jobbsoker/${id}/slett`, 'DELETE', undefined, testScope, treff);

const opprett = async () => {
  const fødselsnummer = 'TEST-FNR-LIVSSYKLUS';
  expect(
    (
      await kall('/jobbsoker', 'POST', [
        {
          fødselsnummer,
          fornavn: 'Testperson',
          etternavn: 'Syntetisk',
        },
      ])
    ).status,
  ).toBe(200);
  const person = (await søk()).jobbsøkere.find(
    (rad) => rad.fødselsnummer === fødselsnummer,
  );
  expect(person?.status).toBe('LAGT_TIL');
  return person!;
};

const lagre = (data: Partial<TreffgjennomføringDTO>) => {
  const gjennomføring = lagTreffgjennomføring({
    rekrutteringstreffId: treffId,
    antallRom: 5,
    ...data,
  });
  treffgjennomføringStore.set(`${scope}:${treffId}`, gjennomføring);
  return gjennomføring;
};

const endreOppmøte = (id: string, møtt: boolean) =>
  kall('/treffgjennomforing/oppmote', 'PUT', { personTreffId: id, møtt });

for (const inkludert of [true, false]) {
  test(`oppmøte med bare ${inkludert ? 'inkludert' : 'ekskludert'} intervjufordeling avvises uendret og kan fjernes etter nullstilling`, async () => {
    const før = lagre({
      oppmøte: [personTreffId],
      deltakernummer: [{ personTreffId, deltakernummer: 1 }],
      rom: [{ romnummer: 1, jobbsøkere: [personTreffId] }],
      intervjufordelinger: [
        {
          arbeidsgiverTreffId,
          inkludertePersonTreffIder: inkludert ? [personTreffId] : [],
          ekskludertePersonTreffIder: inkludert ? [] : [personTreffId],
        },
      ],
    });
    const svar = await endreOppmøte(personTreffId, false);
    expect(svar.status).toBe(409);
    expect(await svar.json()).toEqual({
      feil: 'Jobbsøkeren har registreringer og oppmøtet kan derfor ikke fjernes.',
      hint: 'Fjern registrerte intervjufordelinger først.',
      registreringer: { interesser: 0, intervjufordelinger: 1, vurderinger: 0 },
    });
    expect(await hent()).toEqual(før);
    expect(
      (
        await kall('/treffgjennomforing/intervjufordeling', 'PUT', {
          arbeidsgiverTreffId,
          inkludertePersonTreffIder: [],
          ekskludertePersonTreffIder: [],
        })
      ).status,
    ).toBe(200);
    const fjernet = await endreOppmøte(personTreffId, false);
    expect(fjernet.status).toBe(200);
    const etter = TreffgjennomføringSchema.parse(await fjernet.json());
    expect(etter.oppmøte).toEqual([]);
    expect(etter.rom).toEqual([{ romnummer: 1, jobbsøkere: [] }]);
    expect(etter.deltakernummer).toEqual(før.deltakernummer);
    expect(await hent()).toEqual(etter);
  });
}

for (const medInteresse of [false, true]) {
  test(`oppmøtehint med ${medInteresse ? 'interesse og vurdering' : 'bare vurdering'} viser bare aktuelle handlinger`, async () => {
    const før = lagre({
      oppmøte: [personTreffId],
      interesser: medInteresse ? [{ personTreffId, arbeidsgiverTreffId }] : [],
      vurderinger: [{ ...tomVurdering, jobbtilbud: true }],
    });
    const svar = await endreOppmøte(personTreffId, false);
    expect(svar.status).toBe(409);
    expect(await svar.json()).toMatchObject({
      hint: medInteresse
        ? 'Fjern registrerte interesser og nullstill registrerte vurderinger først.'
        : 'Nullstill registrerte vurderinger først.',
      registreringer: {
        interesser: medInteresse ? 1 : 0,
        intervjufordelinger: 0,
        vurderinger: 1,
      },
    });
    expect(await hent()).toEqual(før);
  });
}

test('oppmøte teller interesse og intervjufordeling separat', async () => {
  lagre({
    oppmøte: [personTreffId],
    interesser: [{ personTreffId, arbeidsgiverTreffId }],
    intervjufordelinger: [
      {
        arbeidsgiverTreffId,
        inkludertePersonTreffIder: [personTreffId],
        ekskludertePersonTreffIder: [],
      },
    ],
  });
  const svar = await endreOppmøte(personTreffId, false);
  expect(svar.status).toBe(409);
  expect(await svar.json()).toMatchObject({
    hint: 'Fjern registrerte interesser og fjern registrerte intervjufordelinger først.',
    registreringer: { interesser: 1, intervjufordelinger: 1, vurderinger: 0 },
  });
});

test('romplassering alene sperrer ikke fjerning av oppmøte', async () => {
  const før = lagre({
    oppmøte: [personTreffId, 'mock-js-002'],
    rom: [{ romnummer: 1, jobbsøkere: [personTreffId, 'mock-js-002'] }],
  });
  const svar = await endreOppmøte(personTreffId, false);
  expect(svar.status).toBe(200);
  expect(await hent()).toEqual({
    ...før,
    oppmøte: ['mock-js-002'],
    rom: [{ romnummer: 1, jobbsøkere: ['mock-js-002'] }],
  });
});

test('ny jobbsøker får ikke oppmøte eller rom og kan slettes med tom 200-respons', async () => {
  expect(
    (
      await kall('/treffgjennomforing/moteoppsett', 'PUT', {
        starttidspunkt: '10:00',
        varighetPerMøteMinutter: 10,
      })
    ).status,
  ).toBe(200);
  const før = await hent();
  const person = await opprett();
  expect(await hent()).toEqual(før);
  const antallFør = await søk();
  const svar = await slett(person.personTreffId);
  expect(svar.status).toBe(200);
  expect(await svar.text()).toBe('');
  const etter = await søk();
  expect(etter.totalt).toBe(antallFør.totalt - 1);
  expect(etter.antallSlettede).toBe(antallFør.antallSlettede + 1);
  expect(
    etter.jobbsøkere.some((rad) => rad.personTreffId === person.personTreffId),
  ).toBe(false);
  expect(await hent()).toEqual(før);
  expect((await slett(person.personTreffId)).status).toBe(404);
  expect(await søk()).toEqual(etter);
  expect(await hent()).toEqual(før);
});

for (const status of ['INVITERT', 'SVART_JA', 'SVART_NEI', 'FÅTT_JOBB']) {
  test(`ordinær sletting av ${status} gir 422 uten endringer`, async () => {
    const id = 'test-livssyklus';
    const før = await søk(scope, id);
    const person = før.jobbsøkere.find((rad) => rad.status === status)!;
    expect(person).toBeTruthy();
    expect((await slett(person.personTreffId, scope, id)).status).toBe(422);
    expect(await søk(scope, id)).toEqual(før);
  });
}

test('ukjent og jobbsøker fra et annet treff gir 404 uten endringer', async () => {
  const person = await opprett();
  const før = await søk();
  expect((await slett('test-person-finnes-ikke')).status).toBe(404);
  const annetTreffFør = await søk(scope, 'test-annet-treff');
  expect(
    (await slett(person.personTreffId, scope, 'test-annet-treff')).status,
  ).toBe(404);
  expect(await søk(scope, 'test-annet-treff')).toEqual(annetTreffFør);
  expect(await søk()).toEqual(før);
});

test('registrert oppmøte overstyrer LAGT_TIL ved ordinær sletting', async () => {
  const person = await opprett();
  expect((await endreOppmøte(person.personTreffId, true)).status).toBe(200);
  const før = await hent();
  expect(
    (await søk()).jobbsøkere.find(
      (rad) => rad.personTreffId === person.personTreffId,
    )?.status,
  ).toBe('MØTT_OPP');
  expect((await slett(person.personTreffId)).status).toBe(422);
  expect(await hent()).toEqual(før);
  expect((await slett(personTreffId)).status).toBe(422);
});

test('tillegg, oppmøte og sletting er isolert per scope, også i formidlingssøket', async () => {
  const annetScope = `${scope}-annet`;
  const urørt = await søk(annetScope);
  const person = await opprett();
  expect((await slett(person.personTreffId, annetScope)).status).toBe(404);
  expect(await søk(annetScope)).toEqual(urørt);
  const formidlingssøk = () =>
    kall('/jobbsoker/formidling/alle', 'POST', { side: 1, antallPerSide: 100 });
  expect((await (await formidlingssøk()).json()).jobbsøkere).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ personTreffId: person.personTreffId }),
    ]),
  );
  const møteFør = await hent(annetScope);
  expect((await endreOppmøte(person.personTreffId, true)).status).toBe(200);
  expect((await slett(person.personTreffId)).status).toBe(422);
  expect(await hent(annetScope)).toEqual(møteFør);
  expect((await endreOppmøte(person.personTreffId, false)).status).toBe(200);
  expect((await slett(person.personTreffId)).status).toBe(200);
  expect((await (await formidlingssøk()).json()).jobbsøkere).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({ personTreffId: person.personTreffId }),
    ]),
  );
  expect(await søk(annetScope)).toEqual(urørt);
});

test('lovlig sletting fjerner gammel romplassering, men bevarer annen tilstand og formidlinger', async () => {
  const annenPersonTreffId = 'mock-js-002';
  const før = lagre({
    oppmøte: [annenPersonTreffId],
    deltakernummer: [
      { personTreffId: annenPersonTreffId, deltakernummer: 1 },
      { personTreffId, deltakernummer: 2 },
    ],
    rom: [{ romnummer: 1, jobbsøkere: [annenPersonTreffId, personTreffId] }],
    interesser: [{ personTreffId: annenPersonTreffId, arbeidsgiverTreffId }],
    vurderinger: [tomVurdering],
  });
  const formidlinger = await (await kall('/formidling/liste/alle')).json();
  expect(formidlinger).toEqual(
    expect.arrayContaining([expect.objectContaining({ personTreffId })]),
  );
  expect(
    (await søk()).jobbsøkere.find((rad) => rad.personTreffId === personTreffId)
      ?.status,
  ).toBe('LAGT_TIL');
  const hendelser = await (await kall('/jobbsoker/hendelser')).json();
  expect((await slett(personTreffId)).status).toBe(200);
  expect(await hent()).toEqual({
    ...før,
    rom: [{ romnummer: 1, jobbsøkere: [annenPersonTreffId] }],
  });
  expect(await (await kall('/formidling/liste/alle')).json()).toEqual(
    formidlinger,
  );
  expect(await (await kall('/jobbsoker/hendelser')).json()).toEqual(hendelser);
});

for (const type of [
  'interesse',
  'inkludert fordeling',
  'ekskludert fordeling',
  'vurdering',
]) {
  test(`LAGT_TIL med bare ${type} gir 422 uten å fjerne registrering eller rom`, async () => {
    const person = await opprett();
    const id = person.personTreffId;
    const før = lagre({
      rom: [{ romnummer: 1, jobbsøkere: [id] }],
      interesser:
        type === 'interesse'
          ? [{ personTreffId: id, arbeidsgiverTreffId }]
          : [],
      intervjufordelinger: type.endsWith('fordeling')
        ? [
            {
              arbeidsgiverTreffId,
              inkludertePersonTreffIder:
                type === 'inkludert fordeling' ? [id] : [],
              ekskludertePersonTreffIder:
                type === 'ekskludert fordeling' ? [id] : [],
            },
          ]
        : [],
      vurderinger:
        type === 'vurdering'
          ? [{ ...tomVurdering, personTreffId: id, jobbtilbud: true }]
          : [],
    });
    const søkFør = await søk();
    expect((await slett(id)).status).toBe(422);
    expect(await hent()).toEqual(før);
    expect(await søk()).toEqual(søkFør);
  });
}
