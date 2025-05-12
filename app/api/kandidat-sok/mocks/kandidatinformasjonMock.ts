// import { faker } from '@faker-js/faker';

// // Set seed for consistent results
// faker.seed(123);

// /**
//  * Generate a mock candidate profile with faker.js
//  */
// export function generateMockKandidatinformation() {
//   const fornavn = faker.person.firstName();
//   const etternavn = faker.person.lastName();
//   const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });

//   // Format birthdate as ISO string
//   const fodselsdato = new Date(
//     birthDate.getFullYear(),
//     birthDate.getMonth(),
//     birthDate.getDate(),
//     22,
//     0,
//     0,
//   ).toISOString();

//   const navIdent = faker.helpers.arrayElement([
//     'Z994162',
//     'Z993141',
//     'Z994440',
//   ]);

//   const mockData = {
//     fornavn,
//     etternavn,
//     fodselsdato,
//     epostadresse: faker.internet.email({
//       firstName: fornavn,
//       lastName: etternavn,
//     }),
//     telefon: '12345678',
//     aktorId: faker.helpers.replaceSymbols('##########'),
//     fodselsnummer: faker.helpers.replaceSymbols('###########'),
//     arenaKandidatnr: `AB${faker.string.numeric(6)}`,
//     kandidatnr: `AB${faker.string.numeric(6)}`,
//     kommunenummer: faker.number.int({ min: 100, max: 5000 }),
//     kommunenummerstring: faker.helpers.replaceSymbols('0###'),
//     kommuneNavn: faker.location.city(),
//     postnummer: faker.location.zipCode('####'),
//     poststed: faker.location.city().toUpperCase(),
//     adresselinje1: `${faker.location.street()} ${faker.number.int({ min: 1, max: 100 })}`,
//     navkontor: `NAV ${faker.location.city()}`,
//     orgenhet: faker.string.numeric(4),
//     hovedmaalkode: faker.helpers.arrayElement([
//       'SKAFFEA',
//       'BEHOLDEA',
//       'OKEDELT',
//     ]),
//     formidlingsgruppekode: faker.helpers.arrayElement([
//       'ARBS',
//       'IARBS',
//       'PARBS',
//     ]),
//     innsatsgruppe: faker.helpers.arrayElement([
//       'STANDARD_INNSATS',
//       'SITUASJONSBESTEMT_INNSATS',
//       'SPESIELT_TILPASSET_INNSATS',
//       'VARIG_TILPASSET_INNSATS',
//     ]),
//     veileder: navIdent,

//     yrkeJobbonskerObj: [
//       {
//         primaertJobbonske: true,
//         sokeTitler: [faker.person.jobTitle()],
//         styrkBeskrivelse: faker.person.jobTitle(),
//         styrkKode: faker.string.numeric(2),
//       },
//       {
//         primaertJobbonske: false,
//         sokeTitler: [],
//         styrkBeskrivelse: faker.person.jobTitle(),
//         styrkKode: null,
//       },
//     ],

//     geografiJobbonsker: [],
//     arbeidsdagerJobbonskerObj: [],
//     oppstartKode: faker.helpers.arrayElement(['ETTER_AVTALE', 'LEDIG_NAA']),

//     arbeidstidsordningJobbonskerObj: [],
//     arbeidstidJobbonskerObj: [
//       {
//         arbeidstidKode: 'DAGTID',
//         arbeidstidKodeTekst: 'Dagtid',
//       },
//       {
//         arbeidstidKode: 'KVELD',
//         arbeidstidKodeTekst: 'Kveld',
//       },
//     ],

//     ansettelsesformJobbonskerObj: [
//       {
//         ansettelsesformKode: 'FAST',
//         ansettelsesformKodeTekst: 'Fast',
//       },
//       {
//         ansettelsesformKode: faker.helpers.arrayElement([
//           'VIKARIAT',
//           'SESONG',
//           'ENGASJEMENT',
//         ]),
//         ansettelsesformKodeTekst: faker.helpers.arrayElement([
//           'Vikariat',
//           'Sesong',
//           'Engasjement',
//         ]),
//       },
//     ],

//     omfangJobbonskerObj: [
//       {
//         omfangKode: 'HELTID',
//         omfangKodeTekst: 'Heltid',
//       },
//       {
//         omfangKode: 'DELTID',
//         omfangKodeTekst: 'Deltid',
//       },
//     ],

//     beskrivelse: faker.lorem.paragraphs(2),

//     sprak: [
//       {
//         fraDato: null,
//         sprakKode: null,
//         sprakKodeTekst: 'Engelsk',
//         alternativTekst: 'Engelsk',
//         beskrivelse: 'Muntlig: FOERSTESPRAAK Skriftlig: FOERSTESPRAAK',
//         ferdighetSkriftlig: 'FOERSTESPRAAK',
//         ferdighetMuntlig: 'FOERSTESPRAAK',
//       },
//       {
//         fraDato: null,
//         sprakKode: null,
//         sprakKodeTekst: 'Norsk',
//         alternativTekst: 'Norsk',
//         beskrivelse: 'Muntlig: FOERSTESPRAAK Skriftlig: FOERSTESPRAAK',
//         ferdighetSkriftlig: 'FOERSTESPRAAK',
//         ferdighetMuntlig: 'FOERSTESPRAAK',
//       },
//     ],

//     yrkeserfaring: Array.from(
//       { length: faker.number.int({ min: 3, max: 8 }) },
//       () => {
//         const fromDate = faker.date.past({ years: 15 });
//         const toDate = faker.datatype.boolean()
//           ? faker.date.between({ from: fromDate, to: new Date() })
//           : null;

//         return {
//           arbeidsgiver: faker.company.name(),
//           alternativStillingstittel: faker.person.jobTitle(),
//           styrkKode: `${faker.string.numeric(4)}.${faker.string.numeric(2)}`,
//           styrkKodeStillingstittel: faker.person.jobTitle(),
//           utelukketForFremtiden: faker.datatype.boolean({ probability: 0.1 }),
//           fraDato: fromDate.toISOString().split('T')[0],
//           tilDato: toDate ? toDate.toISOString().split('T')[0] : null,
//           beskrivelse: faker.datatype.boolean({ probability: 0.7 })
//             ? faker.lorem.paragraph()
//             : '',
//         };
//       },
//     ),

//     utdanning: Array.from(
//       { length: faker.number.int({ min: 1, max: 4 }) },
//       () => {
//         const fromDate = faker.date.past({ years: 20 });
//         const toDate = faker.datatype.boolean()
//           ? faker.date
//               .between({ from: fromDate, to: new Date() })
//               .toISOString()
//               .split('T')[0]
//           : null;

//         return {
//           fraDato: fromDate.toISOString().split('T')[0],
//           tilDato: toDate,
//           utdannelsessted: faker.company.name(),
//           nusKode: faker.helpers.arrayElement(['1', '2', '3', '4', '5', '6']),
//           alternativGrad: faker.helpers.arrayElement([
//             'Grunnskole',
//             'Videregående skole',
//             'Bachelor',
//             'Master',
//             'Doktorgrad',
//           ]),
//           yrkestatus: 'INGEN',
//           beskrivelse: faker.datatype.boolean() ? faker.lorem.sentence() : '',
//         };
//       },
//     ),

//     forerkort: Array.from(
//       { length: faker.number.int({ min: 0, max: 3 }) },
//       () => {
//         const fromDate = faker.date.past({ years: 10 });
//         const toDate = faker.datatype.boolean({ probability: 0.3 })
//           ? faker.date.future({ years: 10 }).toISOString().split('T')[0]
//           : null;

//         return {
//           utsteder: null,
//           forerkortKode: null,
//           forerkortKodeKlasse: faker.helpers.arrayElement([
//             'B - Personbil',
//             'BE - Personbil med tilhenger',
//             'C - Lastebil',
//             'CE - Lastebil med tilhenger',
//             'D - Buss',
//           ]),
//           alternativtNavn: null,
//           fraDato: fromDate.toISOString().split('T')[0],
//           tilDato: toDate,
//         };
//       },
//     ),

//     fagdokumentasjon: Array.from(
//       { length: faker.number.int({ min: 0, max: 3 }) },
//       () => {
//         return {
//           tittel: `${faker.helpers.arrayElement(['Fagbrev', 'Sertifisering', 'Kurs'])} ${faker.commerce.department()}`,
//           type: faker.helpers.arrayElement([
//             'Fagbrev/svennebrev',
//             'Kursbevis',
//             'Sertifikat',
//           ]),
//           beskrivelse: faker.datatype.boolean() ? faker.lorem.sentence() : null,
//         };
//       },
//     ),

//     godkjenninger: Array.from(
//       { length: faker.number.int({ min: 0, max: 3 }) },
//       () => {
//         const gjennomfoert = faker.date
//           .past({ years: 5 })
//           .toISOString()
//           .split('T')[0];
//         const utloeper = faker.datatype.boolean()
//           ? faker.date.future({ years: 5 }).toISOString().split('T')[0]
//           : '';

//         return {
//           tittel: `${faker.helpers.arrayElement(['Godkjenning', 'Sertifisering'])} ${faker.commerce.product()}`,
//           utsteder: faker.company.name(),
//           gjennomfoert,
//           utloeper,
//           konseptId: faker.string.numeric(6),
//         };
//       },
//     ),

//     kursObj: Array.from(
//       { length: faker.number.int({ min: 0, max: 5 }) },
//       () => {
//         const fromDate = faker.date
//           .past({ years: 8 })
//           .toISOString()
//           .split('T')[0];
//         const toDate = faker.datatype.boolean()
//           ? faker.date.past({ years: 7 }).toISOString().split('T')[0]
//           : null;

//         return {
//           arrangor: faker.company.name(),
//           tittel: `${faker.commerce.productAdjective()} ${faker.helpers.arrayElement(['Kurs', 'Seminar', 'Workshop'])}`,
//           omfangEnhet: faker.helpers.arrayElement([
//             'DAG',
//             'UKE',
//             'MND',
//             'TIME',
//             '',
//           ]),
//           omfangVerdi: faker.datatype.boolean()
//             ? faker.number.int({ min: 1, max: 12 })
//             : 0,
//           fraDato: fromDate,
//           tilDato: toDate,
//         };
//       },
//     ),

//     annenerfaringObj: Array.from(
//       { length: faker.number.int({ min: 0, max: 2 }) },
//       () => {
//         const fromDate = faker.date
//           .past({ years: 10 })
//           .toISOString()
//           .split('T')[0];
//         const toDate = faker.date
//           .past({ years: 5 })
//           .toISOString()
//           .split('T')[0];

//         return {
//           fraDato: fromDate,
//           tilDato: toDate,
//           rolle: `${faker.helpers.arrayElement(['Erfaring som', 'Frivillig', 'Verv som'])} ${faker.person.jobTitle()}`,
//           beskrivelse: faker.lorem.sentence(),
//         };
//       },
//     ),

//     kompetanseObj: Array.from(
//       { length: faker.number.int({ min: 0, max: 3 }) },
//       () => {
//         return {
//           fraDato: null,
//           kompKode: null,
//           kompKodeNavn: faker.word.words({ count: { min: 3, max: 8 } }),
//           sokeNavn: [faker.word.noun(), faker.word.noun()],
//           alternativtNavn: faker.word.words({ count: { min: 3, max: 8 } }),
//           beskrivelse: faker.datatype.boolean() ? faker.lorem.sentence() : '',
//         };
//       },
//     ),

//     samletKompetanseObj: [],
//     sertifikatObj: Array.from(
//       { length: faker.number.int({ min: 0, max: 4 }) },
//       () => {
//         const fraDato = faker.date
//           .past({ years: 5 })
//           .toISOString()
//           .split('T')[0];
//         const tilDato = faker.datatype.boolean({ probability: 0.2 })
//           ? faker.date.future({ years: 5 }).toISOString().split('T')[0]
//           : null;

//         return {
//           utsteder: faker.datatype.boolean() ? faker.company.name() : '',
//           sertifikatKode: faker.datatype.boolean()
//             ? faker.string.numeric(6)
//             : null,
//           sertifikatKodeNavn: faker.datatype.boolean()
//             ? `${faker.commerce.productName()} Sertifikat`
//             : null,
//           alternativtNavn: faker.datatype.boolean()
//             ? faker.commerce.productName()
//             : null,
//           fraDato,
//           tilDato,
//         };
//       },
//     ),

//     vervObj: [],
//     veilederIdent: navIdent,
//     veilederVisningsnavn: `${faker.person.firstName()} ${faker.person.lastName()}`,
//     veilederEpost: faker.internet.email(),
//     totalLengdeYrkeserfaring: faker.number.int({ min: 0, max: 15 }),
//     samtykkeStatus: 'G',
//     samtykkeDato: faker.date.past().toISOString(),
//     harKontaktinformasjon: faker.datatype.boolean({ probability: 0.9 }),
//     tidsstempel: new Date().toISOString(),
//     adresselinje2: '',
//     adresselinje3: '',
//     doed: false,
//     frKode: '0',
//     fylkeNavn: faker.location.county(),
//     kommunenummerkw: faker.number.int({ min: 100, max: 5000 }),
//     fodselsdatoErDnr: false,
//     synligForArbeidsgiverSok: faker.datatype.boolean({ probability: 0.9 }),
//     synligForVeilederSok: true,
//     mobiltelefon: '12345678',
//     statsborgerskap: faker.datatype.boolean({ probability: 0.8 })
//       ? 'Norsk'
//       : null,
//     disponererBil: faker.datatype.boolean({ probability: 0.5 }) ? true : null,
//     landkode: faker.datatype.boolean({ probability: 0.8 }) ? 'NO' : null,
//     fritattAgKandidatsok: faker.datatype.boolean({ probability: 0.1 })
//       ? true
//       : null,
//     fritattKandidatsok: faker.datatype.boolean({ probability: 0.1 })
//       ? true
//       : null,
//   };

//   return {
//     hits: {
//       hits: [
//         {
//           _source: mockData,
//         },
//       ],
//     },
//   };
// }

// // Export the mock data
// export const kandidatInformasjonMock = generateMockKandidatinformation();
