import { ForespurteOmDelingAvCvDTO } from '@/app/api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import { TilstandPåForespørsel } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { Faker, nb_NO } from '@faker-js/faker';

const faker = new Faker({ locale: [nb_NO] });
faker.seed(123);

function generateSvarfrist() {
  let date;
  // Generer en dato i fortid ca. 1/3 av gangene
  if (faker.number.int({ min: 1, max: 3 }) === 1) {
    date = faker.date.recent({ days: 10 });
  } else {
    date = faker.date.soon({ days: 3 });
  }
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

  // Opprett én oppføring for hver tilstand
  tilstander.forEach((originalTilstand) => {
    const aktørId = aktørIdList[kandidatIndex % aktørIdList.length];
    kandidatIndex++;

    const deltAv = generateNavIdent();
    const currentSvarfrist = generateSvarfrist();
    let finalTilstand = originalTilstand;
    let svar = null;

    // Sjekk om svarfristen er utløpt
    const svarfristDate = new Date(currentSvarfrist);
    const now = new Date();

    if (svarfristDate < now) {
      // Hvis fristen er utløpt, sett tilstand til AVBRUTT,
      // med mindre det er en tilstand som ikke skal overstyres.
      if (
        originalTilstand !== TilstandPåForespørsel.HAR_SVART &&
        originalTilstand !== TilstandPåForespørsel.IKKE_SENDT &&
        originalTilstand !== TilstandPåForespørsel.AVBRUTT
      ) {
        finalTilstand = TilstandPåForespørsel.AVBRUTT;
      }
    }

    // Avgjør deltStatus basert på finalTilstand
    let deltStatus: string;
    if (finalTilstand === TilstandPåForespørsel.IKKE_SENDT) {
      deltStatus = 'IKKE_SENDT';
    } else {
      deltStatus = 'SENDT';
    }

    // Generer svar-objekt kun hvis finalTilstand er HAR_SVART
    if (finalTilstand === TilstandPåForespørsel.HAR_SVART) {
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

    mockData['kandidat-aktorId-' + aktørId] = [
      {
        aktørId: 'kandidat-aktorId-' + aktørId,
        stillingsId,
        deltStatus,
        deltTidspunkt: faker.date.recent().toISOString(),
        deltAv,
        svarfrist: currentSvarfrist,
        tilstand: finalTilstand,
        svar,
        begrunnelseForAtAktivitetIkkeBleOpprettet: null,
        navKontor: generateNavKontor(),
      },
    ];
  });

  const aktørIdForExtraEntry = aktørIdList[kandidatIndex % aktørIdList.length];
  kandidatIndex++;

  const deltAvForExtraEntry = generateNavIdent();
  const extraEntrySvarfrist = generateSvarfrist();
  let extraEntryTilstand = TilstandPåForespørsel.HAR_SVART;
  let extraEntrySvar = null;

  // Bruk fristlogikk også på ekstraoppføringen
  const extraSvarfristDate = new Date(extraEntrySvarfrist);
  const nowForExtra = new Date();

  if (extraSvarfristDate < nowForExtra) {
    if (
      extraEntryTilstand !== TilstandPåForespørsel.HAR_SVART &&
      extraEntryTilstand !== TilstandPåForespørsel.IKKE_SENDT &&
      extraEntryTilstand !== TilstandPåForespørsel.AVBRUTT
    ) {
      extraEntryTilstand = TilstandPåForespørsel.AVBRUTT;
    }
  }

  const extraEntryDeltStatus = 'SENDT';

  if (extraEntryTilstand === TilstandPåForespørsel.HAR_SVART) {
    extraEntrySvar = {
      harSvartJa: !(
        Object.entries(mockData).find(
          ([key, arr]) =>
            arr[0].tilstand === TilstandPåForespørsel.HAR_SVART &&
            key !== 'kandidat-aktorId-' + aktørIdForExtraEntry,
        )?.[1][0].svar?.harSvartJa ?? true
      ),
      svarTidspunkt: faker.date.recent().toISOString(),
      svartAv: {
        ident: deltAvForExtraEntry,
        identType: 'NAV_IDENT',
      },
    };
  } else {
    extraEntrySvar = null;
  }

  mockData['kandidat-aktorId-' + aktørIdForExtraEntry] = [
    {
      aktørId: 'kandidat-aktorId-' + aktørIdForExtraEntry,
      stillingsId,
      deltStatus: extraEntryDeltStatus,
      deltTidspunkt: faker.date.recent().toISOString(),
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
