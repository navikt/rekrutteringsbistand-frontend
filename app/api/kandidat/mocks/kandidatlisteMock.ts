import { Innsatsgruppe } from '../../../kandidat/components/innsatsgrupper';
import {
  InternKandidatstatus,
  KandidatutfallTyper,
} from '../../../stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { faker } from '@faker-js/faker';

faker.seed(123);

function generateKandidatnr() {
  return `PAM0${faker.string.alphanumeric(8).toLowerCase()}`;
}

let aktørIdCounter = 0;
function generateAktørid() {
  aktørIdCounter++;
  return `testId-${aktørIdCounter}`;
}

function generatePhoneNumber() {
  return faker.helpers.maybe(() => `+47${faker.string.numeric(8)}`, {
    probability: 0.8,
  });
}

function generateEmail() {
  return faker.helpers.maybe(() => faker.internet.email(), {
    probability: 0.7,
  });
}

function generateMockKandidater() {
  // Constants for statuses and outcomes
  const statuser = Object.values(InternKandidatstatus);
  const utfall = Object.values(KandidatutfallTyper);
  const innsatsgrupper = Object.values(Innsatsgruppe);

  // Generate the three candidates with specific utfallsendringer
  const kandidat1 = {
    kandidatId: faker.string.uuid(),
    kandidatnr: generateKandidatnr(),
    status: faker.helpers.arrayElement(statuser),
    lagtTilTidspunkt: faker.date.recent({ days: 60 }).toISOString(),
    lagtTilAv: {
      ident: 'Z993141',
      navn: 'F_Z993141 E_Z993141',
    },
    fornavn: faker.person.firstName(),
    etternavn: faker.person.lastName(),
    fodselsdato: faker.date
      .birthdate({ min: 18, max: 65, mode: 'age' })
      .toISOString()
      .split('T')[0],
    fodselsnr: faker.helpers.maybe(() => faker.string.numeric(11), {
      probability: 0.8,
    }),
    utfall: 'FATT_JOBBEN',
    telefon: generatePhoneNumber(),
    epost: generateEmail(),
    innsatsgruppe: faker.helpers.arrayElement(innsatsgrupper),
    antallNotater: faker.number.int({ min: 0, max: 3 }),
    // Set arkivert explicitly, not randomly
    arkivert: false,
    arkivertTidspunkt: null,
    arkivertAv: null,
    aktørid: generateAktørid(),
    utfallsendringer: [
      {
        utfall: 'FATT_JOBBEN',
        registrertAvIdent: 'Z993141',
        tidspunkt: '2024-11-14T13:26:39.873',
        sendtTilArbeidsgiversKandidatliste: false,
      },
      {
        utfall: 'PRESENTERT',
        registrertAvIdent: 'Z993141',
        tidspunkt: '2024-10-20T10:15:22.123',
        sendtTilArbeidsgiversKandidatliste: false,
      },
    ],
    // Add kandidatHendelser to match the component expectation
    kandidatHendelser: {
      sisteHendelse: {
        tag: null,
        tekst: '',
        dato: new Date(),
        raw: null,
      },
      sisteSms: {
        tag: null,
        tekst: '',
        dato: null,
        raw: null,
      },
    },
  };

  const kandidat2 = {
    kandidatId: faker.string.uuid(),
    kandidatnr: generateKandidatnr(),
    status: faker.helpers.arrayElement(statuser),
    lagtTilTidspunkt: faker.date.recent({ days: 60 }).toISOString(),
    lagtTilAv: {
      ident: 'Z993141',
      navn: 'F_Z993141 E_Z993141',
    },
    fornavn: faker.person.firstName(),
    etternavn: faker.person.lastName(),
    fodselsdato: faker.date
      .birthdate({ min: 18, max: 65, mode: 'age' })
      .toISOString()
      .split('T')[0],
    fodselsnr: faker.helpers.maybe(() => faker.string.numeric(11), {
      probability: 0.8,
    }),
    utfall: 'PRESENTERT',
    telefon: generatePhoneNumber(),
    epost: generateEmail(),
    innsatsgruppe: faker.helpers.arrayElement(innsatsgrupper),
    antallNotater: faker.number.int({ min: 0, max: 3 }),
    // Set one candidate to be archived for testing
    arkivert: true,
    arkivertTidspunkt: faker.date.recent().toISOString(),
    arkivertAv: {
      ident: 'Z993141',
      navn: 'F_Z993141 E_Z993141',
    },
    aktørid: generateAktørid(),
    utfallsendringer: [
      {
        utfall: 'PRESENTERT',
        registrertAvIdent: 'Z993141',
        tidspunkt: '2024-11-14T13:26:36.964',
        sendtTilArbeidsgiversKandidatliste: false,
      },
      {
        utfall: 'IKKE_PRESENTERT',
        registrertAvIdent: 'Z993141',
        tidspunkt: '2024-10-05T09:42:11.351',
        sendtTilArbeidsgiversKandidatliste: false,
      },
    ],
    kandidatHendelser: {
      sisteHendelse: {
        tag: null,
        tekst: '',
        dato: new Date(),
        raw: null,
      },
      sisteSms: {
        tag: null,
        tekst: '',
        dato: null,
        raw: null,
      },
    },
  };

  const kandidat3 = {
    kandidatId: faker.string.uuid(),
    kandidatnr: generateKandidatnr(),
    status: faker.helpers.arrayElement(statuser),
    lagtTilTidspunkt: faker.date.recent({ days: 60 }).toISOString(),
    lagtTilAv: {
      ident: 'Z994440',
      navn: 'F_Z994440 E_Z994440',
    },
    fornavn: faker.person.firstName(),
    etternavn: faker.person.lastName(),
    fodselsdato: faker.date
      .birthdate({ min: 18, max: 65, mode: 'age' })
      .toISOString()
      .split('T')[0],
    fodselsnr: faker.helpers.maybe(() => faker.string.numeric(11), {
      probability: 0.8,
    }),
    utfall: 'IKKE_PRESENTERT',
    telefon: generatePhoneNumber(),
    epost: generateEmail(),
    innsatsgruppe: faker.helpers.arrayElement(innsatsgrupper),
    antallNotater: faker.number.int({ min: 0, max: 3 }),
    arkivert: false,
    arkivertTidspunkt: null,
    arkivertAv: null,
    aktørid: generateAktørid(),
    utfallsendringer: [
      {
        utfall: 'IKKE_PRESENTERT',
        registrertAvIdent: 'Z993141',
        tidspunkt: '2024-11-06T16:41:32.095',
        sendtTilArbeidsgiversKandidatliste: false,
      },
    ],
    kandidatHendelser: {
      sisteHendelse: {
        tag: null,
        tekst: '',
        dato: new Date(),
        raw: null,
      },
      sisteSms: {
        tag: null,
        tekst: '',
        dato: null,
        raw: null,
      },
    },
  };

  const additionalKandidater = Array.from({ length: 17 }, () => {
    const randomUtfall = faker.helpers.arrayElement(utfall);

    const numberOfChanges = faker.number.int({ min: 0, max: 3 });
    const utfallsendringer = Array.from({ length: numberOfChanges }, () => {
      return {
        utfall: faker.helpers.arrayElement(utfall),
        registrertAvIdent: faker.helpers.arrayElement(['Z993141', 'Z994440']),
        tidspunkt: faker.date.recent({ days: 30 }).toISOString(),
        sendtTilArbeidsgiversKandidatliste: faker.datatype.boolean(),
      };
    });

    utfallsendringer.sort(
      (a, b) =>
        new Date(b.tidspunkt).getTime() - new Date(a.tidspunkt).getTime(),
    );

    const navIdent = faker.helpers.arrayElement(['Z993141', 'Z994440']);
    const navName =
      navIdent === 'Z993141' ? 'F_Z993141 E_Z993141' : 'F_Z994440 E_Z994440';

    const isArkivert = faker.datatype.boolean();

    return {
      kandidatId: faker.string.uuid(),
      kandidatnr: generateKandidatnr(),
      status: faker.helpers.arrayElement(statuser),
      lagtTilTidspunkt: faker.date.recent({ days: 90 }).toISOString(),
      lagtTilAv: {
        ident: navIdent,
        navn: navName,
      },
      fornavn: faker.person.firstName(),
      etternavn: faker.person.lastName(),
      fodselsdato: faker.date
        .birthdate({ min: 18, max: 65, mode: 'age' })
        .toISOString()
        .split('T')[0],
      fodselsnr: faker.helpers.maybe(() => faker.string.numeric(11), {
        probability: 0.8,
      }),
      utfall: randomUtfall,
      telefon: generatePhoneNumber(),
      epost: generateEmail(),
      innsatsgruppe: faker.helpers.arrayElement(innsatsgrupper),
      antallNotater: faker.number.int({ min: 0, max: 3 }),
      arkivert: isArkivert,
      arkivertTidspunkt: isArkivert ? faker.date.recent().toISOString() : null,
      arkivertAv: isArkivert
        ? {
            ident: navIdent,
            navn: navName,
          }
        : null,
      aktørid: generateAktørid(),
      utfallsendringer,
      kandidatHendelser: {
        sisteHendelse: {
          tag: null,
          tekst: '',
          dato: new Date(),
          raw: null,
        },
        sisteSms: {
          tag: null,
          tekst: '',
          dato: null,
          raw: null,
        },
      },
    };
  });

  return [kandidat1, kandidat2, kandidat3, ...additionalKandidater];
}

export const kandidatlisetMock = {
  kandidatlisteId: '6356678f-a927-4839-bc53-56342e5c97c7',
  tittel: null,
  organisasjonReferanse: '312113341',
  organisasjonNavn: 'ORDKNAPP BLOMSTRETE TIGER AS',
  stillingId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
  opprettetAv: {
    ident: 'Z993141',
    navn: 'F_Z993141 E_Z993141',
  },
  opprettetTidspunkt: '2024-09-16T14:00:05.488',
  kandidater: generateMockKandidater(),
  status: 'ÅPEN',
  antallStillinger: 1,
  stillingskategori: 'STILLING',
};
