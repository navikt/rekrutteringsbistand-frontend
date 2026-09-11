import {
  ArbeidsgiversBehovMock,
  arbeidsgivereMock,
  workOpArbeidsgivere,
} from './arbeidsgivereMock';
import type { ArbeidsgiverDTO, ArbeidsgivereDTO } from './useArbeidsgivere';
import type {
  ArbeidsgiversBehovDTO,
  ArbeidsgiverMedBehovDTO,
  LeggTilArbeidsgiverMedBehovDTO,
} from './useArbeidsgivereMedBehov';
import {
  harRegistreringer,
  lagRegistreringshint,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/registreringer';
import { oppdaterRomEtterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringMockDomene.msw';
import { harVurderingsinnhold } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/vurdering';
import { byggMswScopeKey } from '@/app/api/rekrutteringstreff/mswScope';
import {
  ArbeidsgiversBehovStore,
  arbeidsgiverStore,
  erNyopprettetUtkast,
  treffgjennomføringStore,
} from '@/app/api/rekrutteringstreff/mswState';

export const mockHentArbeidsgivereForTreff = (
  request: Request,
  treffId: string,
): ArbeidsgivereDTO => {
  const scopeKey = byggMswScopeKey(request, treffId);
  const stored = arbeidsgiverStore.get(scopeKey);
  if (stored !== undefined) return stored;
  if (erNyopprettetUtkast(treffId)) return [];
  if (treffId === 'workop') return workOpArbeidsgivere();
  return arbeidsgivereMock();
};

export const mockHentBehovForArbeidsgiver = (
  request: Request,
  arbeidsgiverTreffId: string,
): ArbeidsgiversBehovDTO | null =>
  ArbeidsgiversBehovStore.get(byggMswScopeKey(request, arbeidsgiverTreffId)) ??
  ArbeidsgiversBehovMock(arbeidsgiverTreffId) ??
  null;

export const mockOpprettArbeidsgiver = (
  request: Request,
  treffId: string,
  body: {
    organisasjonsnummer?: string;
    navn?: string;
    gateadresse?: string | null;
    postnummer?: string | null;
    poststed?: string | null;
  },
): ArbeidsgiverDTO & { arbeidsgiverTreffId: string } => {
  const scopeKey = byggMswScopeKey(request, treffId);
  const arbeidsgiverTreffId = crypto.randomUUID();
  const nyArbeidsgiver = {
    arbeidsgiverTreffId,
    organisasjonsnummer: body.organisasjonsnummer ?? 'TEST-ORG-NY',
    navn: body.navn ?? 'Fiktiv testbedrift',
    status: 'AKTIV',
    gateadresse: body.gateadresse ?? null,
    postnummer: body.postnummer ?? null,
    poststed: body.poststed ?? null,
  } satisfies ArbeidsgiverDTO;
  const eksisterende = mockHentArbeidsgivereForTreff(request, treffId);
  arbeidsgiverStore.set(scopeKey, [...eksisterende, nyArbeidsgiver]);
  leggTilIMøteplan(scopeKey, arbeidsgiverTreffId, eksisterende.length + 1);
  return nyArbeidsgiver;
};

const leggTilIMøteplan = (
  scopeKey: string,
  arbeidsgiverTreffId: string,
  antallArbeidsgivere: number,
) => {
  const gjennomføring = treffgjennomføringStore.get(scopeKey);
  if (!gjennomføring) return;

  const antallRom = Math.max(antallArbeidsgivere, 1);
  if (gjennomføring.rom.length === 0) {
    treffgjennomføringStore.set(scopeKey, { ...gjennomføring, antallRom });
    return;
  }

  const eksisterendeRom = oppdaterRomEtterOppmøte(
    gjennomføring.rom,
    gjennomføring.oppmøte,
  );
  const brukteRom = new Set(
    gjennomføring.arbeidsgiverRekkefølge.map((rad) => rad.førsteRomnummer),
  );
  let førsteRomnummer = 1;
  while (brukteRom.has(førsteRomnummer)) førsteRomnummer++;

  treffgjennomføringStore.set(scopeKey, {
    ...gjennomføring,
    antallRom,
    rom: Array.from(
      { length: antallRom },
      (_, indeks) =>
        eksisterendeRom.find((rom) => rom.romnummer === indeks + 1) ?? {
          romnummer: indeks + 1,
          jobbsøkere: [],
        },
    ),
    arbeidsgiverRekkefølge: [
      ...gjennomføring.arbeidsgiverRekkefølge,
      { arbeidsgiverTreffId, førsteRomnummer },
    ],
  });
};

type SlettArbeidsgiverResultat =
  | { status: 204 }
  | { status: 404; feil: string }
  | {
      status: 409;
      feil: string;
      hint: string;
      personerIRom: number;
      interesser: number;
      intervjufordelinger: number;
      vurderinger: number;
    };

export const mockSlettArbeidsgiver = (
  request: Request,
  treffId: string,
  arbeidsgiverId: string,
): SlettArbeidsgiverResultat => {
  const eksisterende = mockHentArbeidsgivereForTreff(request, treffId);
  if (!eksisterende.some((a) => a.arbeidsgiverTreffId === arbeidsgiverId)) {
    return { status: 404, feil: 'Arbeidsgiveren finnes ikke på treffet.' };
  }

  const scopeKey = byggMswScopeKey(request, treffId);
  const gjennomføring = treffgjennomføringStore.get(scopeKey);
  const gjenstående = eksisterende.filter(
    (a) => a.arbeidsgiverTreffId !== arbeidsgiverId,
  );
  if (gjennomføring) {
    const rom = oppdaterRomEtterOppmøte(
      gjennomføring.rom,
      gjennomføring.oppmøte,
    );
    const romnummer = gjennomføring.arbeidsgiverRekkefølge.find(
      (rad) => rad.arbeidsgiverTreffId === arbeidsgiverId,
    )?.førsteRomnummer;
    const personerIRom =
      rom.find((rad) => rad.romnummer === romnummer)?.jobbsøkere.length ?? 0;
    const interesser = gjennomføring.interesser.filter(
      (rad) => rad.arbeidsgiverTreffId === arbeidsgiverId,
    ).length;
    const intervjufordelinger = gjennomføring.intervjufordelinger
      .filter((rad) => rad.arbeidsgiverTreffId === arbeidsgiverId)
      .reduce(
        (antall, rad) =>
          antall +
          rad.inkludertePersonTreffIder.length +
          rad.ekskludertePersonTreffIder.length,
        0,
      );
    const vurderinger = gjennomføring.vurderinger.filter(
      (rad) =>
        rad.arbeidsgiverTreffId === arbeidsgiverId && harVurderingsinnhold(rad),
    ).length;

    const registreringer = { interesser, intervjufordelinger, vurderinger };
    if (personerIRom > 0 || harRegistreringer(registreringer)) {
      return {
        status: 409,
        feil: 'Arbeidsgiveren har registreringer i treffgjennomføringen og kan derfor ikke slettes.',
        hint: lagRegistreringshint(registreringer, personerIRom),
        personerIRom,
        ...registreringer,
      };
    }

    const gjenståendeRom = rom
      .filter((rad) => rad.romnummer !== romnummer)
      .map((rad) => ({
        ...rad,
        romnummer:
          romnummer !== undefined && rad.romnummer > romnummer
            ? rad.romnummer - 1
            : rad.romnummer,
      }));
    treffgjennomføringStore.set(scopeKey, {
      ...gjennomføring,
      antallRom: Math.max(gjenstående.length, 1),
      rom:
        rom.length > 0 && gjenståendeRom.length === 0
          ? [{ romnummer: 1, jobbsøkere: [] }]
          : gjenståendeRom,
      arbeidsgiverRekkefølge: gjennomføring.arbeidsgiverRekkefølge
        .filter((rad) => rad.arbeidsgiverTreffId !== arbeidsgiverId)
        .map((rad) => ({
          ...rad,
          førsteRomnummer:
            romnummer !== undefined && rad.førsteRomnummer > romnummer
              ? rad.førsteRomnummer - 1
              : rad.førsteRomnummer,
        })),
      intervjufordelinger: gjennomføring.intervjufordelinger.filter(
        (rad) => rad.arbeidsgiverTreffId !== arbeidsgiverId,
      ),
      vurderinger: gjennomføring.vurderinger.filter(
        (rad) => rad.arbeidsgiverTreffId !== arbeidsgiverId,
      ),
    });
  }
  arbeidsgiverStore.set(scopeKey, gjenstående);
  return { status: 204 };
};

export const mockByggArbeidsgivereMedBehovListe = (
  request: Request,
  treffId: string,
): ArbeidsgiverMedBehovDTO[] => {
  const arbeidsgivere = mockHentArbeidsgivereForTreff(request, treffId);
  return arbeidsgivere
    .filter((a) => !!a.arbeidsgiverTreffId)
    .map((a) => ({
      arbeidsgiverTreffId: a.arbeidsgiverTreffId as string,
      organisasjonsnummer: a.organisasjonsnummer,
      navn: a.navn,
      behov: mockHentBehovForArbeidsgiver(
        request,
        a.arbeidsgiverTreffId as string,
      ),
    }));
};

export const mockOpprettArbeidsgiverMedBehov = (
  request: Request,
  treffId: string,
  body: LeggTilArbeidsgiverMedBehovDTO,
): ArbeidsgiverMedBehovDTO => {
  const nyArbeidsgiver = mockOpprettArbeidsgiver(request, treffId, body);
  const arbeidsgiverTreffId = nyArbeidsgiver.arbeidsgiverTreffId;
  ArbeidsgiversBehovStore.set(
    byggMswScopeKey(request, arbeidsgiverTreffId),
    body.behov,
  );
  return {
    arbeidsgiverTreffId,
    organisasjonsnummer: body.organisasjonsnummer,
    navn: body.navn,
    behov: body.behov,
  };
};

export const mockOppdaterBehovForArbeidsgiver = (
  request: Request,
  treffId: string,
  arbeidsgiverTreffId: string,
  behov: ArbeidsgiversBehovDTO,
): ArbeidsgiverMedBehovDTO | null => {
  const arbeidsgiver = mockHentArbeidsgivereForTreff(request, treffId).find(
    (a) => a.arbeidsgiverTreffId === arbeidsgiverTreffId,
  );
  if (!arbeidsgiver) return null;
  ArbeidsgiversBehovStore.set(
    byggMswScopeKey(request, arbeidsgiverTreffId),
    behov,
  );
  return {
    arbeidsgiverTreffId,
    organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
    navn: arbeidsgiver.navn,
    behov,
  };
};
