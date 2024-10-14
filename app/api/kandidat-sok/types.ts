import { z } from 'zod';
import { KandidatDataSchema } from './schema/cvSchema.zod';

// import { KandidatDataSchema } from './schema.zod';

// export const yrkeJobbonskerObjSchema = z.object({
//   styrkBeskrivelse: z.string(),
//   sokeTitler: z.array(z.string()),
//   primaertJobbonske: z.boolean(),
//   styrkKode: z.any(),
// });

// export const geografiJobbonskerSchema = z.object({
//   geografiKodeTekst: z.string(),
//   geografiKode: z.string(),
// });

export const navigeringSchema = z.object({
  kandidatnumre: z.array(z.string()),
});

// export const kandidatSchema = z.object({
//   yrkeJobbonskerObj: z.array(yrkeJobbonskerObjSchema),
//   etternavn: z.string(),
//   postnummer: z.string(),
//   arenaKandidatnr: z.string(),
//   kommuneNavn: z.string().nullable(),
//   geografiJobbonsker: z.array(geografiJobbonskerSchema),
//   fornavn: z.string(),
//   fodselsnummer: z.string(),
//   kvalifiseringsgruppekode: z.string(),
// });

export const kandidatSokSchema = z.object({
  kandidater: z.array(KandidatDataSchema),
  navigering: navigeringSchema,
  antallTotalt: z.number(),
});
