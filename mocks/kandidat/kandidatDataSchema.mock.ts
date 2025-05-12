// import { KandidatDataSchemaDTO } from '../../app/api/kandidat-sok/schema/cvSchema.zod';
// import { Innsatsgruppe } from '../../app/kandidat/components/innsatsgrupper';
// import { en, Faker, nb_NO } from '@faker-js/faker';

// // Faker instance for generating the actual data values
// const dataFaker = new Faker({ locale: [nb_NO, en] });
// // Separate Faker instance for the decision logic within helper functions
// const decisionFaker = new Faker({ locale: [nb_NO, en] }); // Locale doesn't strictly matter if only using .number.float()

// let mockKandidatCounter = 0;

// // Helper for optional and nullable fields
// function optionalNullable<T>(
//   generator: () => T, // This generator should use dataFaker
//   pValue = 0.8,
//   pNull = 0.1,
// ): T | null | undefined {
//   // Use decisionFaker for probabilistic choices
//   if (decisionFaker.number.float({ min: 0, max: 1 }) > pValue) {
//     return undefined;
//   }
//   if (decisionFaker.number.float({ min: 0, max: 1 }) < pNull) {
//     return null;
//   }
//   return generator();
// }

// // Helper for optional fields
// function optional<T>(generator: () => T, pValue = 0.8): T | undefined {
//   // Use decisionFaker for probabilistic choices
//   if (decisionFaker.number.float({ min: 0, max: 1 }) > pValue) {
//     return undefined;
//   }
//   return generator();
// }

// // Helper for nullable fields
// function nullable<T>(generator: () => T, pNull = 0.1): T | null {
//   // Use decisionFaker for probabilistic choices
//   if (decisionFaker.number.float({ min: 0, max: 1 }) < pNull) {
//     return null;
//   }
//   return generator();
// }

// export function createMockKandidatData(): KandidatDataSchemaDTO {
//   mockKandidatCounter++; // Increment counter for each new mock candidate

//   // Seed both Faker instances with the same seed for deterministic behavior
//   dataFaker.seed(mockKandidatCounter);
//   decisionFaker.seed(mockKandidatCounter);

//   return {
//     // Ensure the generator functions passed to helpers explicitly use dataFaker
//     fritekst: optionalNullable(() => dataFaker.lorem.paragraph()),
//     aktorId: optionalNullable(() => `kandidat-aktorId-${mockKandidatCounter}`), // Does not use Faker for value
//     fodselsnummer: optionalNullable(
//       () => `kandidat-fnr-${mockKandidatCounter}`, // Does not use Faker for value
//     ),
//     fornavn: optionalNullable(() => dataFaker.person.firstName()),
//     etternavn: optionalNullable(() => dataFaker.person.lastName()),
//     fodselsdato: optionalNullable(() =>
//       dataFaker.date.birthdate().toISOString(),
//     ),
//     fodselsdatoErDnr: optionalNullable(() => dataFaker.datatype.boolean()), // Or decisionFaker if it's just a boolean choice
//     formidlingsgruppekode: optionalNullable(() =>
//       dataFaker.helpers.arrayElement([
//         'ARBS',
//         'IARBS',
//         'ISERV',
//         'PARBS',
//         'RARBS',
//       ]),
//     ),
//     epostadresse: optionalNullable(() => dataFaker.internet.email()),
//     mobiltelefon: optionalNullable(() => dataFaker.phone.number()),
//     harKontaktinformasjon:
//       optional(() => dataFaker.datatype.boolean(), 0.9) ?? false,
//     telefon: optionalNullable(() => dataFaker.phone.number()),
//     statsborgerskap: 'Norsk', // Static value
//     kandidatnr: optionalNullable(
//       () => `kandidat-kandidatnr-${mockKandidatCounter}`, // Does not use Faker for value
//     ),
//     arenaKandidatnr: optionalNullable(
//       () => `kandidat-arenaKandidatnr-${mockKandidatCounter}`, // Does not use Faker for value
//     ),
//     beskrivelse: optionalNullable(() =>
//       dataFaker.lorem.sentences(dataFaker.number.int({ min: 1, max: 3 })),
//     ),
//     samtykkeStatus: optionalNullable(() =>
//       dataFaker.helpers.arrayElement(['GODKJENT', 'AVBRUTT', 'SLETTET']),
//     ),
//     samtykkeDato: optionalNullable(() => dataFaker.date.past().toISOString()),
//     adresselinje1: optionalNullable(() => dataFaker.location.streetAddress()),
//     adresselinje2: optionalNullable(() =>
//       dataFaker.location.secondaryAddress(),
//     ),
//     adresselinje3: optionalNullable(() => dataFaker.lorem.words(3)),
//     postnummer: optionalNullable(() => dataFaker.location.zipCode('####')),
//     poststed: optionalNullable(() => dataFaker.location.city()),
//     landkode: optionalNullable(() =>
//       dataFaker.helpers.arrayElement(['NO', 'SE', 'DK', 'GB']),
//     ),
//     kommunenummer: optionalNullable(() =>
//       parseInt(dataFaker.string.numeric(4), 10),
//     ),
//     kommunenummerkw: optionalNullable(() =>
//       parseInt(dataFaker.string.numeric(4), 10),
//     ),
//     kommunenummerstring: optionalNullable(() => dataFaker.string.numeric(4)),
//     fylkeNavn: optionalNullable(() => dataFaker.location.state()),
//     kommuneNavn: optionalNullable(() => dataFaker.location.city()),
//     disponererBil: optionalNullable(() => dataFaker.datatype.boolean()),
//     tidsstempel: optionalNullable(() => dataFaker.date.recent().toISOString()),
//     doed: optionalNullable(() => dataFaker.datatype.boolean(0.05)),
//     frKode: optionalNullable(() => dataFaker.string.alphanumeric(3)),
//     innsatsgruppe: optional(() =>
//       dataFaker.helpers.arrayElement(Object.values(Innsatsgruppe)),
//     ),
//     orgenhet: optionalNullable(() => dataFaker.string.numeric(4)),
//     navkontor: optionalNullable(() => `NAV ${dataFaker.location.city()}`),
//     fritattKandidatsok: optionalNullable(() => dataFaker.datatype.boolean()),
//     fritattAgKandidatsok: optionalNullable(() => dataFaker.datatype.boolean()),

//     utdanning: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock UtdanningSchema */
//         }),
//         { count: { min: 0, max: 3 } },
//       ),
//     ),
//     fagdokumentasjon: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock FagdokumentasjonSchema */
//         }),
//         { count: { min: 0, max: 2 } },
//       ),
//     ),
//     yrkeserfaring: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           yrkeserfaringManeder: dataFaker.number.int({ min: 1, max: 120 }),
//           /* mock other YrkesErfaringSchema fields */
//         }),
//         { count: { min: 0, max: 4 } },
//       ),
//     ),
//     kompetanseObj: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock KompetanseSchema */
//         }),
//         { count: { min: 0, max: 5 } },
//       ),
//     ),
//     annenerfaringObj: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock AnnenErfaringSchema */
//         }),
//         { count: { min: 0, max: 2 } },
//       ),
//     ),
//     sertifikatObj: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock SertifikatSchema */
//         }),
//         { count: { min: 0, max: 3 } },
//       ),
//     ),
//     forerkort: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock ForerkortSchema */
//         }),
//         { count: { min: 0, max: 2 } },
//       ),
//     ),
//     sprak: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock SprakSchema */
//         }),
//         { count: { min: 0, max: 3 } },
//       ),
//     ),
//     kursObj: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock KursSchema */
//         }),
//         { count: { min: 0, max: 3 } },
//       ),
//     ),
//     vervObj: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock VervSchema */
//         }),
//         { count: { min: 0, max: 2 } },
//       ),
//     ),
//     geografiJobbonsker: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => {
//           const fylkeKode = dataFaker.string.numeric(2);
//           const kommuneKode = dataFaker.string.numeric(4);
//           return {
//             geografiKodeTekst: dataFaker.location.city(), // Or a more specific Norwegian place name generator if available/needed
//             geografiKode: `NO${fylkeKode}.${kommuneKode}`,
//           };
//         },
//         { count: { min: 0, max: 3 } },
//       ),
//     ),
//     yrkeJobbonskerObj: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => {
//           const beskrivelse = dataFaker.person.jobTitle(); // Will be a non-null string
//           const sokeTitlerCount = dataFaker.number.int({ min: 1, max: 3 }); // Ensures 1 to 3 sokeTitler
//           const titler = [beskrivelse]; // Start with the styrkBeskrivelse

//           // Add additional, different job titles if sokeTitlerCount > 1
//           for (let i = 1; i < sokeTitlerCount; i++) {
//             titler.push(dataFaker.person.jobTitle());
//           }

//           return {
//             sokeTitler: titler,
//             primaertJobbonske: dataFaker.datatype.boolean(), // Keeps current variety
//             styrkKode: optionalNullable(() => dataFaker.string.numeric(4)), // Keeps current variety, can be null
//             styrkBeskrivelse: beskrivelse, // Use the generated non-null description
//           };
//         },
//         { count: { min: 0, max: 3 } }, // This allows yrkeJobbonskerObj to be an empty array
//       ),
//     ),
//     omfangJobbonskerObj: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock OmfangJobbonskerSchema */
//         }),
//         { count: { min: 0, max: 2 } },
//       ),
//     ),
//     ansettelsesformJobbonskerObj: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock AnsettelsesformJobbonskerSchema */
//         }),
//         { count: { min: 0, max: 2 } },
//       ),
//     ),
//     arbeidstidsordningJobbonskerObj: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock ArbeidstidsordningJobbonskerSchema */
//         }),
//         { count: { min: 0, max: 2 } },
//       ),
//     ),
//     arbeidsdagerJobbonskerObj: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock ArbeidsdagerJobbonskerSchema */
//         }),
//         { count: { min: 0, max: 2 } },
//       ),
//     ),
//     arbeidstidJobbonskerObj: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock ArbeidstidJobbonskerSchema */
//         }),
//         { count: { min: 0, max: 2 } },
//       ),
//     ),
//     samletKompetanseObj: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock SamletKompetanseSchema */
//         }),
//         { count: { min: 0, max: 1 } },
//       ),
//     ),

//     totalLengdeYrkeserfaring:
//       nullable(() => dataFaker.number.int({ min: 0, max: 300 }), 0.1) ?? 0,
//     synligForArbeidsgiverSok: optionalNullable(() =>
//       dataFaker.datatype.boolean(),
//     ),
//     synligForVeilederSok: optional(() => dataFaker.datatype.boolean()),
//     oppstartKode: optionalNullable(() =>
//       dataFaker.helpers.arrayElement(['LEDIG_NAA', 'ETTER_AVTALE', 'SNAREST']),
//     ),
//     veileder: optionalNullable(() => dataFaker.person.fullName()),
//     veilederIdent: optionalNullable(() => `Z${dataFaker.string.numeric(6)}`),
//     veilederVisningsnavn: optionalNullable(() => dataFaker.person.fullName()),
//     veilederEpost: optionalNullable(() => dataFaker.internet.email()),
//     godkjenninger: optionalNullable(() =>
//       dataFaker.helpers.multiple(
//         () => ({
//           /* mock GodkjenningSchema */
//         }),
//         { count: { min: 0, max: 3 } },
//       ),
//     ),
//     // perioderMedInaktivitet: optionalNullable(() => ({ /* mock PerioderMedInaktivitetSchema */ })),
//   };
// }

// // To reset the counter if needed (e.g., in test setup)
// export function resetMockKandidatCounter() {
//   mockKandidatCounter = 0;
//   // Optionally, you might want to clear the seed or re-initialize faker if needed,
//   // but for simple counter-based seeding, just resetting the counter is usually enough.
// }

// // Function to get the current counter value if needed externally,
// // though parsing from arenaKandidatnr is the primary method here.
// export const getCurrentMockKandidatCounter = () => mockKandidatCounter;

// export const mockKandidatliste: KandidatDataSchemaDTO[] = Array.from(
//   { length: 20 },
//   () => createMockKandidatData(),
// );

// // Example usage:
// // const mockCv1 = createMockKandidatData();
// // console.log(mockCv1.aktorId, mockCv1.fodselsnummer, mockCv1.kandidatnr, mockCv1.arenaKandidatnr);
// // const mockCv2 = createMockKandidatData();
// // console.log(mockCv2.aktorId, mockCv2.fodselsnummer, mockCv2.kandidatnr, mockCv2.arenaKandidatnr);

// // ...rest of the file...
// // export { KandidatDataSchema };
