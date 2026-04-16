import { KandidatAPI } from '@/app/api/api-routes';
import {
  KandidatListeKandidatDTO,
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

function genererKandidater(): KandidatListeKandidatDTO[] {
  const faker = new Faker({ locale: [nb_NO, en] });
  faker.seed(FAST_SEED);

  const kandidater: KandidatListeKandidatDTO[] = [];

  for (let i = 0; i < 300; i++) {
    const erArkivert = faker.datatype.boolean(0.1);

    kandidater.push({
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
      aktørid: faker.string.numeric(14),
      utfallsendringer: [],
    });
  }

  return kandidater;
}

const mockKandidater = genererKandidater();

const mockFormidlingerAvUsynligKandidat = [
  {
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
];

function beregnAntallPerFilter(
  kandidater: KandidatListeKandidatDTO[],
): KandidatlisteKandidaterResponseDTO['antallPerKategoriPerFilter'] {
  const internStatus: Record<string, number> = {};
  for (const s of Object.values(InternKandidatstatus)) {
    internStatus[s] = kandidater.filter((k) => k.status === s).length;
  }

  const visSlettede: Record<string, number> = {
    true: kandidater.length,
    false: kandidater.filter((k) => !k.arkivert).length,
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
      kandidater.length * (type === 'Spurt_om_å_dele_CV' ? 1 : 0.25),
    );
  }

  return { internStatus, visSlettede, kandidatlisteHendelseType };
}

function sorterKandidater(
  kandidater: KandidatListeKandidatDTO[],
  kolonne: string | null,
  retning: string | null,
): KandidatListeKandidatDTO[] {
  const dir = retning === 'asc' ? 1 : -1;

  return [...kandidater].sort((a, b) => {
    switch (kolonne) {
      case 'navn': {
        const navnA = `${a.etternavn} ${a.fornavn}`.toLowerCase();
        const navnB = `${b.etternavn} ${b.fornavn}`.toLowerCase();
        return navnA.localeCompare(navnB, 'nb') * dir;
      }
      case 'lagtTil':
        return (
          (new Date(a.lagtTilTidspunkt).getTime() -
            new Date(b.lagtTilTidspunkt).getTime()) *
          dir
        );
      case 'internStatus':
        return a.status.localeCompare(b.status, 'nb') * dir;
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

    let kandidater = [...mockKandidater];

    try {
      const body = (await request.json()) as {
        fritekst?: string | null;
        internStatus?: string[] | null;
        kandidatlisteHendelseType?: string[] | null;
        visSlettede: boolean;
      };

      if (body.internStatus && body.internStatus.length > 0) {
        kandidater = kandidater.filter((k) =>
          body.internStatus!.includes(k.status),
        );
      }

      if (!body.visSlettede) {
        kandidater = kandidater.filter((k) => !k.arkivert);
      }

      if (body.fritekst && body.fritekst.length > 0) {
        const søk = body.fritekst.toLowerCase();
        kandidater = kandidater.filter(
          (k) =>
            k.fornavn.toLowerCase().includes(søk) ||
            k.etternavn.toLowerCase().includes(søk),
        );
      }
    } catch {
      // tom body er ok
    }

    const segments = url.pathname.split('/');
    const stillingsId = segments[segments.indexOf('kandidater') - 1];

    if (stillingsId === 'fullfortBesattLast') {
      kandidater = kandidater.map((k, i) =>
        i === 0
          ? { ...k, utfall: KandidatutfallTyper.FATT_JOBBEN, arkivert: false }
          : { ...k, utfall: KandidatutfallTyper.IKKE_PRESENTERT },
      );
    }

    if (
      stillingsId === 'fullfortIkkeBesattIkkeLast' ||
      stillingsId === 'fullfortIkkeBesattLast'
    ) {
      kandidater = kandidater.map((k) => ({
        ...k,
        utfall: KandidatutfallTyper.IKKE_PRESENTERT,
      }));
    }

    const antallPerFilter = beregnAntallPerFilter(kandidater);

    kandidater = sorterKandidater(
      kandidater,
      sorteringKolonne,
      sorteringRetning,
    );

    const start = (side - 1) * antallPerSide;
    const paginert = kandidater.slice(start, start + antallPerSide);

    return HttpResponse.json({
      totaltAntallKandidater: kandidater.length,
      kandidater: paginert,
      formidlingerAvUsynligKandidat: mockFormidlingerAvUsynligKandidat,
      antallPerKategoriPerFilter: antallPerFilter,
    });
  },
);
