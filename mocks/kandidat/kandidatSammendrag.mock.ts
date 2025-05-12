// import {
//   KandidatsammendragDTO,
//   kandidatsammendragSchema,
// } from '../../app/api/kandidat-sok/useKandidatsammendrag';
// import { en, Faker, nb_NO } from '@faker-js/faker';

// // Faker instance for generating the actual data values in the summary
// const sammendragDataFaker = new Faker({ locale: [nb_NO, en] });
// // Separate Faker instance for the decision logic within the summary's helper functions
// const sammendragDecisionFaker = new Faker({ locale: [nb_NO, en] });

// // Helper for nullable fields in the summary
// function nullable<T>(generator: () => T, pNull = 0.1): T | null {
//   // Use sammendragDecisionFaker for probabilistic choices
//   if (sammendragDecisionFaker.number.float({ min: 0, max: 1 }) < pNull) {
//     return null;
//   }
//   return generator(); // This generator should use sammendragDataFaker
// }

// export function createMockKandidatsammendrag(
//   arenaKandidatnrFromCv: string,
// ): KandidatsammendragDTO {
//   const parts = arenaKandidatnrFromCv.split('-');
//   const seedString = parts[parts.length - 1];
//   const seed = parseInt(seedString, 10);

//   if (isNaN(seed)) {
//     console.error(
//       `Could not parse seed from arenaKandidatnr: ${arenaKandidatnrFromCv}. Falling back to random generation for sammendrag.`,
//     );
//     const randomSeed = Date.now() + Math.random();
//     sammendragDataFaker.seed(randomSeed);
//     sammendragDecisionFaker.seed(randomSeed);
//   } else {
//     // Seed both Faker instances with the same seed
//     sammendragDataFaker.seed(seed);
//     sammendragDecisionFaker.seed(seed);
//   }

//   // IMPORTANT: The order of these calls to sammendragDataFaker (directly or via generator in nullable)
//   // must match the order of calls to dataFaker in createMockKandidatData for the corresponding fields.

//   const data: KandidatsammendragDTO = {
//     // Fornavn and Etternavn are typically among the first fields generated in createMockKandidatData
//     // and are non-nullable in KandidatsammendragDTO.
//     fornavn: sammendragDataFaker.person.firstName(),
//     etternavn: sammendragDataFaker.person.lastName(),
//     fodselsdato: sammendragDataFaker.date
//       .birthdate()
//       .toISOString()
//       .split('T')[0],

//     // Other fields, using nullable helper which internally uses sammendragDecisionFaker
//     // The generator passed to nullable must use sammendragDataFaker
//     orgenhet: nullable(() => sammendragDataFaker.string.numeric(4)),
//     adresselinje1: nullable(() => sammendragDataFaker.location.streetAddress()),
//     poststed: nullable(() => sammendragDataFaker.location.city()),
//     epostadresse: nullable(() => sammendragDataFaker.internet.email()),
//     postnummer: nullable(() => sammendragDataFaker.location.zipCode('####')),
//     telefon: nullable(() => sammendragDataFaker.phone.number()),

//     // Veileder fields might not have direct equivalents in the early part of createMockKandidatData's dataFaker sequence
//     // or might be generated differently. If they need to be consistent, their generation sequence
//     // in createMockKandidatData using dataFaker must be accounted for.
//     // For now, let's assume they are generated based on the current state of sammendragDataFaker.
//     veilederIdent: nullable(() => `Z${sammendragDataFaker.string.numeric(6)}`),
//     veilederEpost: nullable(() => sammendragDataFaker.internet.email()),
//     veilederVisningsnavn: nullable(() => sammendragDataFaker.person.fullName()),

//     arenaKandidatnr: arenaKandidatnrFromCv,
//     fodselsnummer: `kandidat-fnr-${seed}`, // Derived, not from Faker sequence directly
//   };

//   try {
//     return kandidatsammendragSchema.parse(data);
//   } catch (e) {
//     console.error(
//       'Generated mock KandidatsammendragDTO does not match schema:',
//       e,
//       data,
//     );
//     // Fallback for non-nullable fields if something unexpected happened
//     return {
//       ...data,
//       fornavn: data.fornavn || sammendragDataFaker.person.firstName(),
//       etternavn: data.etternavn || sammendragDataFaker.person.lastName(),
//       fodselsdato:
//         data.fodselsdato ||
//         sammendragDataFaker.date.birthdate().toISOString().split('T')[0],
//       arenaKandidatnr: data.arenaKandidatnr,
//       fodselsnummer: data.fodselsnummer || `kandidat-fnr-${seed}-fallback`,
//     };
//   }
// }
