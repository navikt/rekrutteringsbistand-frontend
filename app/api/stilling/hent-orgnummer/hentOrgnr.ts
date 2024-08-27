"use client";
/**
 * Endepunkt /hentOrgnr
 */
import useSWRImmutable from "swr/immutable";
import { z } from "zod";
import { geografiSchema } from "../../../../types/stilling/geografi";
import { StillingAPI } from "../../api-routes";
import { getAPIwithSchema } from "../../fetcher";

const hentOrgnrEndepunkt = (orgnr: string) => {
  const utenMellomrom = orgnr.replace(/\s/g, "");
  return `${StillingAPI.internUrl}/hentOrgnr?organisasjonsnummer=${utenMellomrom}`;
};

const hentOrgnrSchema = z.object({
  location: geografiSchema,
  name: z.string(),
  orgnr: z.string().nullable(),
});

export type hentOrgnrDTO = z.infer<typeof hentOrgnrSchema>;

export const useHentOrgnr = (orgnr: string) =>
  useSWRImmutable(hentOrgnrEndepunkt(orgnr), getAPIwithSchema(hentOrgnrSchema));
