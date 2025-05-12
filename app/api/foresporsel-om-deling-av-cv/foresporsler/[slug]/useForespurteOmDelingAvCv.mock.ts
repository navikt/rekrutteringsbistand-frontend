import { TilstandPåForespørsel } from '../../../../stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { ForespurteOmDelingAvCvDTO } from './useForespurteOmDelingAvCv';
import { faker } from '@faker-js/faker';

faker.seed(123);

let aktørIdCounter = 0;
function generateAktørid() {
  aktørIdCounter++;
  return `testId-${aktørIdCounter}`;
}

function generateSvarfrist() {
  const date = faker.date.soon({ days: 3 });
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

  // Create one entry for each tilstand
  tilstander.forEach((tilstand) => {
    const aktørId = generateAktørid();
    const deltAv = generateNavIdent();
    const stillingsId = '81d763bd-5858-4479-9113-1d8bcdd4b1f4';

    // Generate different response based on tilstand type
    let svar = null;
    let deltStatus = 'SENDT';

    if (tilstand === 'HAR_SVART') {
      const harSvartJa = faker.datatype.boolean();
      svar = {
        harSvartJa,
        svarTidspunkt: faker.date.recent().toISOString(),
        svartAv: {
          ident: deltAv,
          identType: 'NAV_IDENT',
        },
      };
    }

    if (tilstand === 'HAR_VARSLET') {
      deltStatus = 'HarVarslet';
    }

    if (tilstand === 'IKKE_SENDT') {
      deltStatus = 'IKKE_SENDT';
    }

    mockData[aktørId] = [
      {
        aktørId,
        stillingsId,
        deltStatus,
        deltTidspunkt: faker.date.recent().toISOString(),
        deltAv,
        svarfrist: generateSvarfrist(),
        tilstand,
        svar,
        begrunnelseForAtAktivitetIkkeBleOpprettet: null,
        navKontor: generateNavKontor(),
      },
    ];
  });

  const aktørId = generateAktørid();
  const deltAv = generateNavIdent();

  mockData[aktørId] = [
    {
      aktørId,
      stillingsId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
      deltStatus: 'SENDT',
      deltTidspunkt: faker.date.recent().toISOString(),
      deltAv,
      svarfrist: generateSvarfrist(),
      tilstand: 'HAR_SVART',
      svar: {
        // Find the first HAR_SVART entry and use the opposite of its harSvartJa value
        harSvartJa: !(
          Object.entries(mockData).find(
            ([, arr]) => arr[0].tilstand === 'HAR_SVART',
          )?.[1][0].svar?.harSvartJa ?? true
        ),
        svarTidspunkt: faker.date.recent().toISOString(),
        svartAv: {
          ident: deltAv,
          identType: 'NAV_IDENT',
        },
      },
      begrunnelseForAtAktivitetIkkeBleOpprettet: null,
      navKontor: generateNavKontor(),
    },
  ];

  return mockData;
}
