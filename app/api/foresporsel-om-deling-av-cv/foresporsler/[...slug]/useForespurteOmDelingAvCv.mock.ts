import { TilstandPåForespørsel } from '../../../../stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { ForespurteOmDelingAvCvDTO } from './useForespurteOmDelingAvCv';
import { Faker, nb_NO } from '@faker-js/faker';

const faker = new Faker({ locale: [nb_NO] });

function generateSvarfrist() {
  let date;
  // Generate a past date roughly 1/3 of the time
  if (faker.number.int({ min: 1, max: 3 }) === 1) {
    date = faker.date.recent({ days: 10 }); // Generates a date in the last 10 days
  } else {
    date = faker.date.soon({ days: 3 }); // Generates a date in the next 3 days
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

  // Create one entry for each tilstand
  tilstander.forEach((originalTilstand) => {
    const aktørId = aktørIdList[kandidatIndex % aktørIdList.length];
    kandidatIndex++;

    const deltAv = generateNavIdent();
    const currentSvarfrist = generateSvarfrist();
    let finalTilstand = originalTilstand;
    let svar = null; // Initialize svar to null

    // Check if svarfrist is due
    const svarfristDate = new Date(currentSvarfrist); // new Date() can parse full ISO 8601 string
    const now = new Date();

    if (svarfristDate < now) {
      // If deadline passed, set tilstand to AVBRUTT,
      // unless it's a state that shouldn't be overridden by a past deadline.
      if (
        originalTilstand !== TilstandPåForespørsel.HAR_SVART &&
        originalTilstand !== TilstandPåForespørsel.IKKE_SENDT &&
        originalTilstand !== TilstandPåForespørsel.AVBRUTT // Avoid re-setting if already AVBRUTT from enum
        // Add other final states like KANSELLERT if they exist and shouldn't be overridden
      ) {
        finalTilstand = TilstandPåForespørsel.AVBRUTT;
      }
    }

    // Determine deltStatus based on the finalTilstand
    let deltStatus: string;
    if (finalTilstand === TilstandPåForespørsel.IKKE_SENDT) {
      deltStatus = 'IKKE_SENDT';
    } else {
      // Covers SENDT, HAR_SVART, and AVBRUTT (if it was sent and deadline passed)
      deltStatus = 'SENDT';
    }

    // Generate svar object only if the finalTilstand is HAR_SVART
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
    // If finalTilstand is AVBRUTT (due to deadline or from enum), svar remains null unless explicitly set above.

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

  // Ensure the next aktørId is different from the ones used for tilstander, if possible
  const aktørIdForExtraEntry = aktørIdList[kandidatIndex % aktørIdList.length];
  kandidatIndex++; // Increment for potential future use, though not strictly needed here

  const deltAvForExtraEntry = generateNavIdent();
  const extraEntrySvarfrist = generateSvarfrist();
  let extraEntryTilstand = TilstandPåForespørsel.HAR_SVART; // Original tilstand for this entry
  let extraEntrySvar = null; // Initialize

  // Apply deadline logic for the extra entry as well, though HAR_SVART won't be overridden
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

  const extraEntryDeltStatus = 'SENDT'; // Default for HAR_SVART

  if (extraEntryTilstand === TilstandPåForespørsel.HAR_SVART) {
    extraEntrySvar = {
      harSvartJa: !(
        Object.entries(mockData).find(
          ([key, arr]) =>
            arr[0].tilstand === TilstandPåForespørsel.HAR_SVART &&
            key !== 'kandidat-aktorId-' + aktørIdForExtraEntry, // Ensure we are not comparing with itself if it was added to mockData already
        )?.[1][0].svar?.harSvartJa ?? true
      ),
      svarTidspunkt: faker.date.recent().toISOString(),
      svartAv: {
        ident: deltAvForExtraEntry,
        identType: 'NAV_IDENT',
      },
    };
  } else {
    extraEntrySvar = null; // Ensure svar is null if tilstand changed from HAR_SVART
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
