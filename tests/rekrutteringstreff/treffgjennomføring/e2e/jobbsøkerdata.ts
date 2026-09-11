import type { JobbsøkerSøkBody } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  TreffgjennomføringSchema,
  type TreffgjennomføringDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import type { Page } from '@playwright/test';

export const medJobbsøkerliste = async (
  page: Page,
  antall: number,
  { antallMøtt = antall, antallFåttJobb = 0 } = {},
) => {
  const erFremmøtt = (person: JobbsøkerDTO) =>
    person.status === 'MØTT_OPP' || person.status === 'FÅTT_JOBB';
  let jobbsøkere: JobbsøkerDTO[] = Array.from(
    { length: antall },
    (_, indeks) => {
      const nummer = String(indeks + 1).padStart(3, '0');
      return {
        personTreffId: `test-person-${nummer}`,
        fødselsnummer: `TEST-ID-${nummer}`,
        fornavn: 'Testperson',
        etternavn: `Syntetisk-${nummer}`,
        status:
          indeks < antallFåttJobb
            ? 'FÅTT_JOBB'
            : indeks < antallMøtt
              ? 'MØTT_OPP'
              : 'LAGT_TIL',
        lagtTilDato: null,
        lagtTilAv: null,
        lagtTilAvNavn: null,
        alder: null,
        innsatsgruppe: null,
        minsideHendelser: [],
      };
    },
  );
  const søkRespons = (side: number, antallPerSide = 100, status?: string[]) => {
    const filtrerte = jobbsøkere.filter(
      (person) => !status?.length || status.includes(person.status),
    );
    const antallPerStatus: Record<string, number> = {};
    for (const person of jobbsøkere) {
      antallPerStatus[person.status] =
        (antallPerStatus[person.status] ?? 0) + 1;
    }
    const sisteSide = Math.max(1, Math.ceil(filtrerte.length / antallPerSide));
    const gyldigSide = Math.min(side, sisteSide);
    return {
      side: gyldigSide,
      totalt: filtrerte.length,
      antallSkjulte: 0,
      antallSlettede: antall - jobbsøkere.length,
      antallPerStatus,
      antallPerAldersgruppe: {},
      jobbsøkere: filtrerte.slice(
        (gyldigSide - 1) * antallPerSide,
        gyldigSide * antallPerSide,
      ),
    };
  };

  const søkeforespørsler: JobbsøkerSøkBody[] = [];
  await page.route('**/workop/jobbsoker/sok', async (route) => {
    const body: JobbsøkerSøkBody = route.request().postDataJSON();
    søkeforespørsler.push(body);
    await route.fulfill({
      json: søkRespons(body.side, body.antallPerSide, body.status),
    });
  });
  let gjennomføring: TreffgjennomføringDTO | undefined;
  await page.route(
    '**/workop/treffgjennomforing-og-oppfolging',
    async (route) => {
      if (!gjennomføring) {
        const respons = await route.fetch();
        gjennomføring = {
          ...TreffgjennomføringSchema.parse(await respons.json()),
          gjeldendeSteg: 'OPPSUMMERING',
          oppmøte: jobbsøkere
            .filter(erFremmøtt)
            .map((person) => person.personTreffId),
          deltakernummer: jobbsøkere.map((person, indeks) => ({
            personTreffId: person.personTreffId,
            deltakernummer: indeks + 1,
          })),
          rom:
            antallMøtt > 0
              ? [
                  {
                    romnummer: 1,
                    jobbsøkere: jobbsøkere
                      .filter(erFremmøtt)
                      .map((person) => person.personTreffId),
                  },
                ]
              : [],
        };
      }
      await route.fulfill({ json: gjennomføring });
    },
  );
  await page.route('**/workop/treffgjennomforing/oppmote', async (route) => {
    if (!gjennomføring)
      throw new Error('Gjennomføringen må hentes før oppmøte endres.');
    const { personTreffId, møtt } = route.request().postDataJSON();
    gjennomføring.oppmøte = gjennomføring.oppmøte.filter(
      (id) => id !== personTreffId,
    );
    if (møtt) gjennomføring.oppmøte.push(personTreffId);
    jobbsøkere = jobbsøkere.map((person) =>
      person.personTreffId === personTreffId
        ? { ...person, status: møtt ? 'MØTT_OPP' : 'SVART_JA' }
        : person,
    );
    if (gjennomføring.rom.length > 0) {
      gjennomføring.rom[0].jobbsøkere = [...gjennomføring.oppmøte];
    }
    await route.fulfill({ json: gjennomføring });
  });
  await page.route('**/workop/jobbsoker/test-person-*/slett', async (route) => {
    if (route.request().method() !== 'DELETE') return route.continue();
    const personTreffId = route.request().url().split('/').at(-2);
    jobbsøkere = jobbsøkere.filter(
      (person) => person.personTreffId !== personTreffId,
    );
    if (gjennomføring) {
      gjennomføring.oppmøte = gjennomføring.oppmøte.filter(
        (id) => id !== personTreffId,
      );
    }
    await route.fulfill({ status: 200, body: '' });
  });
  return { søkRespons, søkeforespørsler };
};
