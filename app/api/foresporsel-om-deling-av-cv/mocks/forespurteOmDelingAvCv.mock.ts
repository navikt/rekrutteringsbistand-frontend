import { ForespurteOmDelingAvCvDTO } from '@/app/api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import { TilstandPåForespørsel } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { fastRefDato } from '@/mocks/datoKonstanter';
import { Faker, nb_NO } from '@faker-js/faker';

const faker = new Faker({ locale: [nb_NO] });
faker.seed(123);

function generateSvarfrist(iPast: boolean) {
  const date = iPast
    ? faker.date.recent({ days: 10, refDate: fastRefDato })
    : faker.date.soon({ days: 30, refDate: fastRefDato });
  const isoDate = date.toISOString().split('T')[0];

  const isSummerTime = date.getMonth() > 2 && date.getMonth() < 10;
  const timezone = isSummerTime ? '+02:00' : '+01:00';

  return `${isoDate}T00:00:00${timezone}`;
}

function generateNavKontor() {
  return faker.helpers.arrayElement(['0321', '0403', '0300', '0402', '0219']);
}

function generateNavIdent() {
  return faker.helpers.arrayElement([
    'Z993141',
    'Z994440',
    'Z994886',
    'Z995512',
  ]);
}

/**
 * Generate a mock response for CV sharing requests with all required tilstand values
 */
export function generateMockForespurteOmDelingAvCv() {
  const mockData: ForespurteOmDelingAvCvDTO = {};
  const tilstander = Object.values(TilstandPåForespørsel);
  const stillingsId = 'minStilling';

  const aktørIdList = ['22', '23', '24', '25', '27', '28', '29'];

  let kandidatIndex = 0;

  tilstander.forEach((tilstand) => {
    const aktørId = aktørIdList[kandidatIndex % aktørIdList.length];
    kandidatIndex++;

    const deltAv = generateNavIdent();
    const skalHaUtløptFrist = tilstand === TilstandPåForespørsel.AVBRUTT;
    const currentSvarfrist = generateSvarfrist(skalHaUtløptFrist);
    let svar = null;

    let deltStatus: string;
    if (tilstand === TilstandPåForespørsel.IKKE_SENDT) {
      deltStatus = 'IKKE_SENDT';
    } else {
      deltStatus = 'SENDT';
    }

    if (tilstand === TilstandPåForespørsel.HAR_SVART) {
      svar = {
        harSvartJa: true,
        svarTidspunkt: faker.date
          .recent({ days: 5, refDate: fastRefDato })
          .toISOString(),
        svartAv: {
          ident: deltAv,
          identType: 'NAV_IDENT',
        },
      };
    }

    mockData['kandidat-aktorId-' + aktørId] = [
      {
        aktørId: 'kandidat-aktorId-' + aktørId,
        stillingsId,
        deltStatus,
        deltTidspunkt: faker.date
          .past({ years: 1, refDate: fastRefDato })
          .toISOString(),
        deltAv,
        svarfrist: currentSvarfrist,
        tilstand,
        svar,
        begrunnelseForAtAktivitetIkkeBleOpprettet: null,
        navKontor: generateNavKontor(),
      },
    ];
  });

  const aktørIdForExtraEntry = aktørIdList[kandidatIndex % aktørIdList.length];
  kandidatIndex++;

  const deltAvForExtraEntry = generateNavIdent();
  const extraEntrySvarfrist = generateSvarfrist(false);
  const extraEntryTilstand = TilstandPåForespørsel.HAR_SVART;

  const extraEntrySvar = {
    harSvartJa: false,
    svarTidspunkt: faker.date
      .recent({ days: 3, refDate: fastRefDato })
      .toISOString(),
    svartAv: {
      ident: deltAvForExtraEntry,
      identType: 'NAV_IDENT',
    },
  };

  mockData['kandidat-aktorId-' + aktørIdForExtraEntry] = [
    {
      aktørId: 'kandidat-aktorId-' + aktørIdForExtraEntry,
      stillingsId,
      deltStatus: 'SENDT',
      deltTidspunkt: faker.date
        .past({ years: 1, refDate: fastRefDato })
        .toISOString(),
      deltAv: deltAvForExtraEntry,
      svarfrist: extraEntrySvarfrist,
      tilstand: extraEntryTilstand,
      svar: extraEntrySvar,
      begrunnelseForAtAktivitetIkkeBleOpprettet: null,
      navKontor: generateNavKontor(),
    },
  ];

  return mockData;
}
