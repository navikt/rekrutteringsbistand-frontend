import { z } from 'zod';

export const yrkeJobbonskerObjSchema = z.object({
  styrkBeskrivelse: z.string(),
  sokeTitler: z.array(z.string()),
  primaertJobbonske: z.boolean(),
  styrkKode: z.any(),
});

export const geografiJobbonskerSchema = z.object({
  geografiKodeTekst: z.string(),
  geografiKode: z.string(),
});

export const navigeringSchema = z.object({
  kandidatnumre: z.array(z.string()),
});

export const kandidaterSchema = z.object({
  yrkeJobbonskerObj: z.array(yrkeJobbonskerObjSchema),
  etternavn: z.string(),
  postnummer: z.string(),
  arenaKandidatnr: z.string(),
  kommuneNavn: z.string(),
  geografiJobbonsker: z.array(geografiJobbonskerSchema),
  fornavn: z.string(),
  fodselsnummer: z.string(),
  kvalifiseringsgruppekode: z.string(),
});

export const kandidatSokSchema = z.object({
  kandidater: z.array(kandidaterSchema),
  navigering: navigeringSchema,
  antallTotalt: z.number(),
});
