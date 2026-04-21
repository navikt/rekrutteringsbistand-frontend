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
          tilstand: faker.helpers.arrayElement([
            'PROVER_VARSLING',
            'HAR_VARSLET',
            'KAN_IKKE_VARSLE',
            'HAR_SVART',
          ]),
          svar: null,
        },
      ],
      varsler: [],
    });
  }

  return personer;
}

const mockKandidatPersoner = genererKandidatPersoner();

mockKandidatPersoner[0] = {
  ...mockKandidatPersoner[0],
  kandidat: {
    ...mockKandidatPersoner[0].kandidat,
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
    internStatus[s] = personer.filter((p) => p.kandidat.status === s).length;
  }

  const visSlettede: Record<string, number> = {
    true: personer.length,
    false: personer.filter((p) => !p.kandidat.arkivert).length,
  };

  const hendelseTyper = [
    'Spurt_om_å_dele_CV',
    'Spurt_om_å_dele_CV_IKKE_DIGITAL',
    'Deling_Av_CV_Feilet',
    'Deling_av_CV_JA',
    'Deling_av_CV_NEI',
    'Frist_for_deling_av_cv_utløpt',
    'CV_delt_med_arbeidsgiver',
    'Fått_jobben',
    'Avbrutt_i_aktivitetsplanen',
    'Fjernet_fått_jobben',
    'CV_slettet_hos_arbeidsgiver',
    'SMS_OK',
    'SMS_FEIL',
  ];

  const kandidatlisteHendelseType: Record<string, number> = {};
  for (const type of hendelseTyper) {
    kandidatlisteHendelseType[type] = Math.floor(
      personer.length * (type === 'Spurt_om_å_dele_CV' ? 1 : 0.25),
    );
  }

  return { internStatus, visSlettede, kandidatlisteHendelseType };
}

function sorterKandidatPersoner(
  personer: KandidatPersonDTO[],
  kolonne: string | null,
  retning: string | null,
): KandidatPersonDTO[] {
  const dir = retning === 'asc' ? 1 : -1;

  return [...personer].sort((a, b) => {
    switch (kolonne) {
      case 'navn': {
        const navnA =
          `${a.kandidat.etternavn} ${a.kandidat.fornavn}`.toLowerCase();
        const navnB =
          `${b.kandidat.etternavn} ${b.kandidat.fornavn}`.toLowerCase();
        return navnA.localeCompare(navnB, 'nb') * dir;
      }
      case 'lagtTil':
        return (
          (new Date(a.kandidat.lagtTilTidspunkt).getTime() -
            new Date(b.kandidat.lagtTilTidspunkt).getTime()) *
          dir
        );
      case 'internStatus':
        return a.kandidat.status.localeCompare(b.kandidat.status, 'nb') * dir;
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
    const visSlettede = body.visSlettede ?? false;

    let personer = [...mockKandidatPersoner];

    if (internStatus.length > 0) {
      personer = personer.filter((p) =>
        internStatus.includes(p.kandidat.status),
      );
    }

    if (!visSlettede) {
      personer = personer.filter((p) => !p.kandidat.arkivert);
    }

    if (fritekst && fritekst.length > 0) {
      const søk = fritekst.toLowerCase();
      personer = personer.filter(
        (p) =>
          p.kandidat.fornavn.toLowerCase().includes(søk) ||
          p.kandidat.etternavn.toLowerCase().includes(søk),
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
                ...p.kandidat,
                utfall: KandidatutfallTyper.FATT_JOBBEN,
                arkivert: false,
              }
            : { ...p.kandidat, utfall: KandidatutfallTyper.IKKE_PRESENTERT },
      }));
    }

    if (
      stillingsId === 'fullfortIkkeBesattIkkeLast' ||
      stillingsId === 'fullfortIkkeBesattLast'
    ) {
      personer = personer.map((p) => ({
        ...p,
        kandidat: {
          ...p.kandidat,
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
