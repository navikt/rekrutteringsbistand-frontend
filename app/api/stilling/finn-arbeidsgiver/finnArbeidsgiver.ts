"use client";
/**
 * Endepunkt /FinnArbeidsgiver
 */
import useSWRImmutable from "swr/immutable";
import { z } from "zod";
import { geografiSchema } from "../../../../types/stilling/geografi";
import { StillingAPI } from "../../api-routes";
import { getAPIwithSchema } from "../../fetcher";

const FinnArbeidsgiverEndepunkt = (orgnr: string) => {
  const utenMellomrom = orgnr.replace(/\s/g, "");
  return `${StillingAPI.internUrl}/finn-arbeidsgiver?organisasjonsnummer=${utenMellomrom}`;
};

const FinnArbeidsgiverSchema = z.object({
  location: geografiSchema,
  name: z.string(),
  orgnr: z.string().nullable(),
});

export type FinnArbeidsgiverDTO = z.infer<typeof FinnArbeidsgiverSchema>;

export const useFinnArbeidsgiver = (orgnr: string) =>
  useSWRImmutable(
    orgnr.length >= 3 ? FinnArbeidsgiverEndepunkt(orgnr) : null,
    getAPIwithSchema(FinnArbeidsgiverSchema),
  );
