import { KandidatAPI } from '@/app/api/api-routes';
import {
  KandidatListeKandidatDTO,
  KandidatPersonDTO,
  KandidatlisteKandidaterResponseDTO,
} from '@/app/api/kandidat/schema.zod';
import {
  InternKandidatstatus,
  KandidatutfallTyper,
} from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { KandidatHendelseType } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelseTag';
import { postMock } from '@/mocks/mockUtils';
import { Faker, en, nb_NO } from '@faker-js/faker';
import { HttpResponse } from 'msw';

const FAST_SEED = 100;

function genererKandidatPersoner(): KandidatPersonDTO[] {
  const faker = new Faker({ locale: [nb_NO, en] });
  faker.seed(FAST_SEED);

  const personer: KandidatPersonDTO[] = [];

  for (let i = 0; i < 300; i++) {
    const erArkivert = faker.datatype.boolean(0.1);
    const aktørid = faker.string.numeric(14);
    const stillingsId = faker.string.uuid();

    const kandidat: KandidatListeKandidatDTO = {
      kandidatId: faker.string.uuid(),
      kandidatnr: String(i + 1),
      status: faker.helpers.arrayElement(Object.values(InternKandidatstatus)),
      lagtTilTidspunkt: faker.date
        .recent({ days: 30 })
        .toISOString()
        .replace('Z', ''),
      lagtTilAv: {
        ident: `H${faker.string.numeric(6)}`,
        navn: `${faker.person.lastName()}, ${faker.person.firstName()}`,
      },
      fornavn: `Fornavn ${faker.number.int({ min: 100, max: 999 })}`,
      etternavn: `Etternavn ${faker.number.int({ min: 1000, max: 9999 })}`,
      fodselsdato: faker.date.birthdate().toISOString().split('T')[0],
      fodselsnr: `0101601234567890${String(i + 1).padStart(4, '0')}`,
      utfall: faker.helpers.arrayElement([
        KandidatutfallTyper.IKKE_PRESENTERT,
        KandidatutfallTyper.PRESENTERT,
        KandidatutfallTyper.FATT_JOBBEN,
      ]),
      telefon: faker.phone.number({ style: 'national' }),
      epost: faker.internet.email(),
      innsatsgruppe: faker.helpers.arrayElement([
        'Standardinnsats',
        'Situasjonsbestemt innsats',
        'Spesielt tilpasset innsats',
        'Varig tilpasset innsats',
      ]),
      arkivert: erArkivert,
      arkivertTidspunkt: erArkivert
        ? faker.date.recent({ days: 14 }).toISOString()
        : null,
      arkivertAv: erArkivert
        ? {
            ident: `Z${faker.string.numeric(6)}`,
            navn: faker.person.fullName(),
          }
        : null,
      aktørid,
      utfallsendringer: [],
    };

    const tilstand = faker.helpers.arrayElement([
      'PROVER_VARSLING',
      'HAR_VARSLET',
      'KAN_IKKE_VARSLE',
      'HAR_SVART',
    ]);

    const harSvart = tilstand === 'HAR_SVART';
    const harSvartJa = harSvart ? faker.datatype.boolean() : false;

    const svar = harSvart
      ? {
          harSvartJa,
          svarTidspunkt: faker.date.recent({ days: 2 }).toISOString(),
          svartAv: {
            ident: `Z${faker.string.numeric(6)}`,
            identType: 'NAV_IDENT',
          },
        }
      : null;

    const harSms = faker.datatype.boolean(0.3);
    const smsOk = harSms ? faker.datatype.boolean(0.9) : false;

    personer.push({
      kandidat,
      formidlingerAvUsynligKandidat: null,
      forespørslerOmDelingAvCver: [
        {
          aktørId: aktørid,
          stillingsId,
          deltStatus: 'SENDT',
          deltTidspunkt: faker.date.recent({ days: 7 }).toISOString(),
          deltAv: kandidat.lagtTilAv.ident,
          svarfrist: faker.date.soon({ days: 3 }).toISOString(),
          tilstand,
          svar,
        },
      ],
      varsler: harSms
        ? [
            {
              id: faker.string.uuid(),
              opprettet: faker.date.recent({ days: 5 }).toISOString(),
              stillingId: stillingsId,
              mottakerFnr: kandidat.fodselsnr ?? undefined,
              avsenderNavident: kandidat.lagtTilAv.ident,
              minsideStatus: smsOk ? 'FERDIGSTILT' : 'FEILET',
              eksternStatus: smsOk ? 'SENDT' : 'FEILET',
              eksternFeilmelding: smsOk ? null : 'Feil ved sending',
              eksternKanal: smsOk ? 'SMS' : null,
            },
          ]
        : [],
    });
  }

  return personer;
}

function utledHendelsestyper(person: KandidatPersonDTO): string[] {
  const typer: string[] = [];

  for (const forespørsel of person.forespørslerOmDelingAvCver) {
    switch (forespørsel.tilstand) {
      case 'HAR_SVART':
        if (forespørsel.svar?.harSvartJa) {
          typer.push(KandidatHendelseType.Deling_av_CV_JA);
        } else {
          typer.push(KandidatHendelseType.Deling_av_CV_NEI);
        }
        break;
      case 'HAR_VARSLET':
        typer.push(KandidatHendelseType.Spurt_om_å_dele_CV);
        break;
      case 'KAN_IKKE_VARSLE':
        typer.push(KandidatHendelseType.Spurt_om_å_dele_CV_IKKE_DIGITAL);
        break;
      case 'PROVER_VARSLING':
        typer.push(KandidatHendelseType.Spurt_om_å_dele_CV);
        break;
    }
  }

  for (const varsel of person.varsler) {
    if (varsel.eksternStatus === 'FEILET') {
      typer.push(KandidatHendelseType.SMS_FEIL);
    } else {
      typer.push(KandidatHendelseType.SMS_OK);
    }
  }

  const utfall = person.kandidat?.utfall;
  if (utfall === KandidatutfallTyper.FATT_JOBBEN) {
    typer.push(KandidatHendelseType.Fått_jobben);
  } else if (utfall === KandidatutfallTyper.PRESENTERT) {
    typer.push(KandidatHendelseType.CV_delt_med_arbeidsgiver);
  }

  if (person.kandidat?.arkivert) {
    typer.push(KandidatHendelseType.Slettet);
  }

  return typer;
}

const mockKandidatPersoner = genererKandidatPersoner();

mockKandidatPersoner[0] = {
  ...mockKandidatPersoner[0],
  kandidat: {
    ...mockKandidatPersoner[0].kandidat!,
    arkivert: false,
    arkivertTidspunkt: null,
    arkivertAv: null,
    lagtTilTidspunkt: new Date().toISOString().replace('Z', ''),
  },
  formidlingerAvUsynligKandidat: {
    id: '199',
    fornavn: 'FORSIKTIG',
    mellomnavn: null,
    etternavn: 'BLOKKFLØYTE',
    utfall: 'IKKE_PRESENTERT',
    lagtTilAvIdent: 'Z993141',
    lagtTilAvNavn: 'F_Z993141 E_Z993141',
    lagtTilTidspunkt: '2025-05-08T15:05:41.567',
    arkivert: false,
    arkivertAvIdent: null,
    arkivertAvNavn: null,
    arkivertTidspunkt: null,
  },
};

function beregnAntallPerFilter(
  personer: KandidatPersonDTO[],
): KandidatlisteKandidaterResponseDTO['antallPerKategoriPerFilter'] {
  const internStatus: Record<string, number> = {};
  for (const s of Object.values(InternKandidatstatus)) {
    internStatus[s] = personer.filter((p) => p.kandidat?.status === s).length;
  }

  const visSlettede: Record<string, number> = {
    true: personer.length,
    false: personer.filter((p) => !p.kandidat?.arkivert).length,
  };

  const kandidatlisteHendelseType: Record<string, number> = {};
  for (const type of Object.keys(KandidatHendelseType)) {
    kandidatlisteHendelseType[type] = personer.filter((p) =>
      utledHendelsestyper(p).includes(
        KandidatHendelseType[type as keyof typeof KandidatHendelseType],
      ),
    ).length;
  }

  return { internStatus, visSlettede, kandidatlisteHendelseType };
}

function sorterKandidatPersoner(
  personer: KandidatPersonDTO[],
  kolonne: string | null,
  retning: string | null,
): KandidatPersonDTO[] {
  const dir = retning?.toLowerCase() === 'asc' ? 1 : -1;

  return [...personer].sort((a, b) => {
    switch (kolonne?.toLowerCase()) {
      case 'navn': {
        const navnA =
          `${a.kandidat?.etternavn} ${a.kandidat?.fornavn}`.toLowerCase();
        const navnB =
          `${b.kandidat?.etternavn} ${b.kandidat?.fornavn}`.toLowerCase();
        return navnA.localeCompare(navnB, 'nb') * dir;
      }
      case 'lagttil':
        return (
          (new Date(a.kandidat?.lagtTilTidspunkt ?? '').getTime() -
            new Date(b.kandidat?.lagtTilTidspunkt ?? '').getTime()) *
          dir
        );
      case 'internstatus':
        return (
          (a.kandidat?.status ?? '').localeCompare(
            b.kandidat?.status ?? '',
            'nb',
          ) * dir
        );
      default:
        return 0;
    }
  });
}

export const kandidatlisteKandidaterMSWHandler = postMock(
  `${KandidatAPI.internUrl}/veileder/stilling/*/kandidater`,
  async ({ request }) => {
    const url = new URL(request.url);

    const side = Number(url.searchParams.get('side') ?? '1');
    const antallPerSide = Number(url.searchParams.get('antallPerSide') ?? '25');
    const sorteringKolonne = url.searchParams.get('sorteringKolonne');
    const sorteringRetning = url.searchParams.get('sorteringRetning');

    const body = (await request.json()) as {
      fritekst?: string;
      internStatus?: string[];
      kandidatlisteHendelseType?: string[];
      visSlettede?: boolean;
    };
    const fritekst = body.fritekst ?? null;
    const internStatus = body.internStatus ?? [];
    const kandidatlisteHendelseType = body.kandidatlisteHendelseType ?? [];
    const visSlettede = body.visSlettede ?? false;

    let personer = [...mockKandidatPersoner];

    if (internStatus.length > 0) {
      personer = personer.filter((p) =>
        internStatus.includes(p.kandidat?.status ?? ''),
      );
    }

    if (kandidatlisteHendelseType.length > 0) {
      personer = personer.filter((p) => {
        const typer = utledHendelsestyper(p);
        return kandidatlisteHendelseType.some((filterType: string) => {
          const hendelseValue =
            KandidatHendelseType[
              filterType as keyof typeof KandidatHendelseType
            ];
          return hendelseValue && typer.includes(hendelseValue);
        });
      });
    }

    if (!visSlettede) {
      personer = personer.filter((p) => !p.kandidat?.arkivert);
    }

    if (fritekst && fritekst.length > 0) {
      const søk = fritekst.toLowerCase();
      personer = personer.filter(
        (p) =>
          p.kandidat?.fornavn.toLowerCase().includes(søk) ||
          p.kandidat?.etternavn.toLowerCase().includes(søk),
      );
    }

    const segments = url.pathname.split('/');
    const stillingsId = segments[segments.indexOf('kandidater') - 1];

    if (stillingsId === 'fullfortBesattLast') {
      personer = personer.map((p, i) => ({
        ...p,
        kandidat:
          i === 0
            ? {
                ...p.kandidat!,
                utfall: KandidatutfallTyper.FATT_JOBBEN,
                arkivert: false,
              }
            : { ...p.kandidat!, utfall: KandidatutfallTyper.IKKE_PRESENTERT },
      }));
    }

    if (
      stillingsId === 'fullfortIkkeBesattIkkeLast' ||
      stillingsId === 'fullfortIkkeBesattLast'
    ) {
      personer = personer.map((p) => ({
        ...p,
        kandidat: {
          ...p.kandidat!,
          utfall: KandidatutfallTyper.IKKE_PRESENTERT,
        },
      }));
    }

    const antallPerFilter = beregnAntallPerFilter(personer);

    personer = sorterKandidatPersoner(
      personer,
      sorteringKolonne,
      sorteringRetning,
    );

    const start = (side - 1) * antallPerSide;
    const paginert = personer.slice(start, start + antallPerSide);

    return HttpResponse.json({
      totaltAntallKandidater: personer.length,
      kandidatPersoner: paginert,
      antallPerKategoriPerFilter: antallPerFilter,
    });
  },
);
