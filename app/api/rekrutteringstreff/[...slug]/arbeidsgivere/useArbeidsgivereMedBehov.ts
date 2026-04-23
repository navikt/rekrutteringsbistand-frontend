'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi, putApi } from '@/app/api/fetcher';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

export const ANSETTELSESFORMER = [
  'Fast',
  'Vikariat',
  'Engasjement',
  'Prosjekt',
  'Sesong',
  'Trainee',
  'Lærling',
  'Annet',
  'Selvstendig næringsdrivende',
  'Feriejobb',
  'Åremål',
] as const;

export type Ansettelsesform = (typeof ANSETTELSESFORMER)[number];

export const BehovTagSchema = z.object({
  label: z.string(),
  kategori: z.string(),
  konseptId: z.number().nullable().optional(),
});

export type BehovTagDTO = z.infer<typeof BehovTagSchema>;

export const ArbeidsgiverBehovSchema = z.object({
  samledeKvalifikasjoner: z.array(BehovTagSchema),
  arbeidssprak: z.array(z.string()),
  antall: z.number().int().positive(),
  ansettelsesformer: z.array(z.string()),
  personligeEgenskaper: z.array(BehovTagSchema).default([]).optional(),
});

export type ArbeidsgiverBehovDTO = z.infer<typeof ArbeidsgiverBehovSchema>;

export const ArbeidsgiverMedBehovSchema = z.object({
  arbeidsgiverTreffId: z.string(),
  organisasjonsnummer: z.string(),
  navn: z.string(),
  behov: ArbeidsgiverBehovSchema.nullable().optional(),
});

export const ArbeidsgivereMedBehovSchema = z.array(ArbeidsgiverMedBehovSchema);

export type ArbeidsgiverMedBehovDTO = z.infer<typeof ArbeidsgiverMedBehovSchema>;

export type LeggTilArbeidsgiverMedBehovDTO = {
  organisasjonsnummer: string;
  navn: string;
  behov: ArbeidsgiverBehovDTO;
};

const arbeidsgivereMedBehovEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/arbeidsgiver-med-behov`;

const behovEndepunkt = (
  rekrutteringstreffId: string,
  arbeidsgiverTreffId: string,
) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/arbeidsgiver/${arbeidsgiverTreffId}/behov`;

export const opprettArbeidsgiverMedBehov = (
  rekrutteringstreffId: string,
  dto: LeggTilArbeidsgiverMedBehovDTO,
) => postApi(arbeidsgivereMedBehovEndepunkt(rekrutteringstreffId), dto);

export const oppdaterBehov = (
  rekrutteringstreffId: string,
  arbeidsgiverTreffId: string,
  behov: ArbeidsgiverBehovDTO,
) => putApi(behovEndepunkt(rekrutteringstreffId, arbeidsgiverTreffId), behov);

export const useArbeidsgivereMedBehov = (rekrutteringstreffId: string) =>
  useSWRGet(
    arbeidsgivereMedBehovEndepunkt(rekrutteringstreffId),
    ArbeidsgivereMedBehovSchema,
  );
