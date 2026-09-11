import { lagTreffgjennomføring } from './testdata';
import { workOpArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgivereMock';
import {
  ArbeidsgiverSchema,
  ArbeidsgivereSchema,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { ArbeidsgiverMedBehovSchema } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { FormidlingListeSchema } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import { lagArbeidsgiverRotasjon } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringMockDomene.msw';
import {
  TreffgjennomføringSchema,
  type TreffgjennomføringDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import {
  ArbeidsgiversBehovStore,
  arbeidsgiverStore,
  treffgjennomføringStore,
} from '@/app/api/rekrutteringstreff/mswState';
import { mswHandlers } from '@/mocks/handlers';
import { expect, test } from '@playwright/test';
import { setupServer } from 'msw/node';

const server = setupServer(...mswHandlers);
const treffId = 'workop';
const arbeidsgiverIder = workOpArbeidsgivere().map(
  (ag) => ag.arbeidsgiverTreffId!,
);
const personTreffId = 'mock-js-001';
const arbeidsgiverTreffId = arbeidsgiverIder[0];
const tomVurdering = {
  personTreffId,
  arbeidsgiverTreffId,
  vurderingsstatus: null,
  vurderingsnotat: [],
  avtaltIntervju: false,
  avtaltIntervjuDato: null,
  jobbtilbud: false,
};

test.beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
test.afterAll(() => server.close());
test.beforeEach(() => {
  arbeidsgiverStore.clear();
  ArbeidsgiversBehovStore.clear();
  treffgjennomføringStore.clear();
});

const kall = (
  sti: string,
  method = 'GET',
  body?: unknown,
  scope?: string,
  id = treffId,
) =>
  fetch(`http://localhost/api/rekrutteringstreff/${id}${sti}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(scope ? { cookie: `${PLAYWRIGHT_MSW_SCOPE_COOKIE}=${scope}` } : {}),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });

const hent = async (scope?: string) => {
  const svar = await kall(
    '/treffgjennomforing-og-oppfolging',
    'GET',
    undefined,
    scope,
  );
  expect(svar.status).toBe(200);
  return TreffgjennomføringSchema.parse(await svar.json());
};

const startMøteplan = async (scope?: string) => {
  const svar = await kall(
    '/treffgjennomforing/moteoppsett',
    'PUT',
    {
      starttidspunkt: '10:00',
      varighetPerMøteMinutter: 10,
    },
    scope,
  );
  expect(svar.status).toBe(200);
  return TreffgjennomføringSchema.parse(await svar.json());
};

const opprett = async (medBehov: boolean, scope?: string) => {
  const svar = await kall(
    medBehov ? '/arbeidsgiver-med-behov' : '/arbeidsgiver',
    'POST',
    {
      organisasjonsnummer: 'TEST-ORG-NY-ARBEIDSGIVER',
      navn: 'Fiktiv ny testbedrift',
      behov: {
        samledeKvalifikasjoner: [],
        arbeidssprak: ['Norsk'],
        antall: 1,
        ansettelsesformer: ['Fast'],
        personligeEgenskaper: [],
      },
    },
    scope,
  );
  expect(svar.status).toBe(201);
  const body: unknown = await svar.json();
  const id = medBehov
    ? ArbeidsgiverMedBehovSchema.parse(body).arbeidsgiverTreffId
    : ArbeidsgiverSchema.parse(body).arbeidsgiverTreffId;
  expect(id).toBeTruthy();
  return id!;
};

const lagre = (overstyringer: Partial<TreffgjennomføringDTO>) => {
  const data = lagTreffgjennomføring({
    rekrutteringstreffId: treffId,
    antallRom: 5,
    oppmøte: [personTreffId],
    ...overstyringer,
  });
  treffgjennomføringStore.set(`default:${treffId}`, data);
  return data;
};

for (const medBehov of [false, true]) {
  test(`tillegg ${medBehov ? 'med' : 'uten'} behov gir tomt rom og støtter hele gjennomføringen`, async () => {
    const før = await startMøteplan();
    const nyId = await opprett(medBehov);
    const etter = await hent();
    expect(etter.rom.slice(0, 5)).toEqual(før.rom);
    expect(etter.antallRom).toBe(6);
    expect(etter.rom[5]).toEqual({ romnummer: 6, jobbsøkere: [] });
    expect(etter.arbeidsgiverRekkefølge[5]).toEqual({
      arbeidsgiverTreffId: nyId,
      førsteRomnummer: 6,
    });

    expect(
      (
        await kall(`/treffgjennomforing/romfordeling/${personTreffId}`, 'PUT', {
          romnummer: 6,
        })
      ).status,
    ).toBe(200);
    expect((await hent()).rom[5].jobbsøkere).toEqual([personTreffId]);
    expect(
      (await kall('/treffgjennomforing/romfordeling/fordel', 'POST')).status,
    ).toBe(200);
    const fordelt = await hent();
    expect(
      fordelt.rom.every((rom) => [3, 4].includes(rom.jobbsøkere.length)),
    ).toBe(true);
    expect(fordelt.rom.flatMap((rom) => rom.jobbsøkere).sort()).toEqual(
      [...før.oppmøte].sort(),
    );

    expect(
      (
        await kall('/treffgjennomforing/interesse', 'PUT', {
          personTreffId,
          arbeidsgiverTreffId: nyId,
          interessert: true,
        })
      ).status,
    ).toBe(200);
    expect(
      (await kall('/treffgjennomforing/intervjufordeling/fordel', 'POST'))
        .status,
    ).toBe(200);
    expect(
      (
        await kall('/oppfolging/vurderinger', 'PUT', {
          ...tomVurdering,
          arbeidsgiverTreffId: nyId,
          vurderingsstatus: 'AKTUELL',
        })
      ).status,
    ).toBe(200);
    const vurdert = await hent();
    expect(vurdert.interesser).toContainEqual({
      personTreffId,
      arbeidsgiverTreffId: nyId,
    });
    expect(vurdert.intervjufordelinger).toContainEqual({
      arbeidsgiverTreffId: nyId,
      inkludertePersonTreffIder: [personTreffId],
      ekskludertePersonTreffIder: [],
    });
    expect(vurdert.vurderinger[0].arbeidsgiverTreffId).toBe(nyId);
  });

  test(`tillegg ${medBehov ? 'med' : 'uten'} behov før møteplan oppdaterer antallet uten å starte romfordeling`, async () => {
    lagre({});
    await opprett(medBehov);
    expect(await hent()).toMatchObject({
      antallRom: 6,
      rom: [],
      arbeidsgiverRekkefølge: [],
    });
    expect((await startMøteplan()).rom).toHaveLength(6);
  });
}

const sperrer: {
  navn: string;
  data: Partial<TreffgjennomføringDTO>;
  felt: string;
}[] = [
  {
    navn: 'personer i rom',
    data: {
      rom: [{ romnummer: 1, jobbsøkere: [personTreffId] }],
      arbeidsgiverRekkefølge: [{ arbeidsgiverTreffId, førsteRomnummer: 1 }],
    },
    felt: 'personerIRom',
  },
  {
    navn: 'interesser',
    data: { interesser: [{ personTreffId, arbeidsgiverTreffId }] },
    felt: 'interesser',
  },
  ...[true, false].map((inkludert) => ({
    navn: inkludert
      ? 'inkludert intervjufordeling'
      : 'ekskludert intervjufordeling',
    data: {
      intervjufordelinger: [
        {
          arbeidsgiverTreffId,
          inkludertePersonTreffIder: inkludert ? [personTreffId] : [],
          ekskludertePersonTreffIder: inkludert ? [] : [personTreffId],
        },
      ],
    },
    felt: 'interesser',
  })),
  {
    navn: 'jobbtilbud uten vurderingsstatus',
    data: { vurderinger: [{ ...tomVurdering, jobbtilbud: true }] },
    felt: 'vurderinger',
  },
];

for (const { navn, data, felt } of sperrer) {
  test(`sletting blokkeres med ${navn} og endrer ingen data`, async () => {
    const før = lagre(data);
    const svar = await kall(`/arbeidsgiver/${arbeidsgiverTreffId}`, 'DELETE');
    expect(svar.status).toBe(409);
    expect(await svar.json()).toMatchObject({ [felt]: 1 });
    expect(await hent()).toEqual(før);
    const arbeidsgivere = ArbeidsgivereSchema.parse(
      await (await kall('/arbeidsgiver')).json(),
    );
    expect(arbeidsgivere).toEqual(workOpArbeidsgivere());
  });
}

test('sletter tomt mellomrom og bevarer de andre rommene og registreringene', async () => {
  const før = await startMøteplan();
  for (const person of før.rom[1].jobbsøkere) {
    expect(
      (
        await kall(`/treffgjennomforing/romfordeling/${person}`, 'PUT', {
          romnummer: 1,
        })
      ).status,
    ).toBe(200);
  }
  expect(
    (
      await kall('/treffgjennomforing/interesse', 'PUT', {
        personTreffId,
        arbeidsgiverTreffId,
        interessert: true,
      })
    ).status,
  ).toBe(200);
  const tømt = await hent();
  expect(
    (await kall(`/arbeidsgiver/${arbeidsgiverIder[1]}`, 'DELETE')).status,
  ).toBe(204);
  const etter = await hent();
  expect(etter.antallRom).toBe(4);
  expect(etter.rom).toEqual(
    tømt.rom
      .filter((rom) => rom.romnummer !== 2)
      .map((rom) => ({
        ...rom,
        romnummer: rom.romnummer > 2 ? rom.romnummer - 1 : rom.romnummer,
      })),
  );
  expect(etter.arbeidsgiverRekkefølge).toEqual(
    lagArbeidsgiverRotasjon(
      arbeidsgiverIder.filter((id) => id !== arbeidsgiverIder[1]),
    ),
  );
  expect(etter.interesser).toEqual(tømt.interesser);
});

test('flere tillegg og sletting uten mellomliggende lesing gir unike sammenhengende rom', async () => {
  const før = await startMøteplan();
  const første = await opprett(false);
  const andre = await opprett(true);
  expect(første).not.toBe(andre);
  expect((await kall(`/arbeidsgiver/${første}`, 'DELETE')).status).toBe(204);
  const tredje = await opprett(true);
  const etter = await hent();
  expect(etter.rom.slice(0, 5)).toEqual(før.rom);
  expect(etter.rom.slice(5)).toEqual([
    { romnummer: 6, jobbsøkere: [] },
    { romnummer: 7, jobbsøkere: [] },
  ]);
  expect(etter.arbeidsgiverRekkefølge.slice(5)).toEqual([
    { arbeidsgiverTreffId: andre, førsteRomnummer: 6 },
    { arbeidsgiverTreffId: tredje, førsteRomnummer: 7 },
  ]);
});

test('sen fremmøtt beholder rommet når arbeidsgiver legges til', async () => {
  await startMøteplan();
  expect(
    (
      await kall('/treffgjennomforing/oppmote', 'PUT', {
        personTreffId: 'mock-js-sen',
        møtt: true,
      })
    ).status,
  ).toBe(200);
  const før = await hent();
  await opprett(true);
  const etter = await hent();
  expect(etter.rom.slice(0, 5)).toEqual(før.rom);
  expect(etter.rom[5].jobbsøkere).toEqual([]);
});

test('tillegg og sletting bruker samme scope som gjennomføringen', async () => {
  const urørt = await startMøteplan('annen-test');
  await startMøteplan('denne-test');
  const nyId = await opprett(true, 'denne-test');
  expect((await hent('denne-test')).antallRom).toBe(6);
  expect(await hent('annen-test')).toEqual(urørt);
  expect(
    (
      await kall(
        `/arbeidsgiver/${arbeidsgiverTreffId}`,
        'DELETE',
        undefined,
        'denne-test',
      )
    ).status,
  ).toBe(409);
  expect(
    (await kall(`/arbeidsgiver/${nyId}`, 'DELETE', undefined, 'denne-test'))
      .status,
  ).toBe(204);
  expect(await hent('annen-test')).toEqual(urørt);
  expect((await hent('denne-test')).antallRom).toBe(5);
});

test('tomme vurderinger og fordelinger blokkerer ikke sletting', async () => {
  lagre({
    vurderinger: [tomVurdering],
    intervjufordelinger: [
      {
        arbeidsgiverTreffId,
        inkludertePersonTreffIder: [],
        ekskludertePersonTreffIder: [],
      },
    ],
  });
  expect(
    (await kall(`/arbeidsgiver/${arbeidsgiverTreffId}`, 'DELETE')).status,
  ).toBe(204);
  expect(await hent()).toMatchObject({
    antallRom: 4,
    vurderinger: [],
    intervjufordelinger: [],
    rom: [],
  });
});

test('formidling alene blokkerer ikke sletting og bevares etterpå', async () => {
  const sti = '/formidling/liste/alle';
  const før = FormidlingListeSchema.parse(await (await kall(sti)).json());
  const id = før[0].arbeidsgiverTreffId;
  expect(id).toBeTruthy();
  expect((await kall(`/arbeidsgiver/${id}`, 'DELETE')).status).toBe(204);
  expect(await (await kall(sti)).json()).toEqual(før);
});

test('sletting av ukjent arbeidsgiver gir 404 uten endringer', async () => {
  const før = await startMøteplan();
  expect((await kall('/arbeidsgiver/finnes-ikke', 'DELETE')).status).toBe(404);
  expect(await hent()).toEqual(før);
});
