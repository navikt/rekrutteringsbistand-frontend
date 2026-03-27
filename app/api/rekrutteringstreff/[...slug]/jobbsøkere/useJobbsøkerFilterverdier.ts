'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useSWRGet } from '@/app/api/useSWRGet';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { z } from 'zod';

const StedstypeEnum = z.enum(['kommune', 'fylke']);

const FilterverdiStedSchema = z.object({
  navn: z.string(),
  type: StedstypeEnum,
});

export const JobbsøkerFilterverdierSchema = z.object({
  navkontor: z.array(z.string()),
  innsatsgrupper: z.array(z.string()),
  steder: z.array(FilterverdiStedSchema),
});

export type JobbsøkerFilterverdierDTO = z.infer<
  typeof JobbsøkerFilterverdierSchema
>;
export type FilterverdiSted = z.infer<typeof FilterverdiStedSchema>;

export const useJobbsøkerFilterverdier = (id?: string) => {
  const applikasjonskontekst = useApplikasjonContext();
  const eiere = useRekrutteringstreff(id)?.data?.eiere;

  const kanHente =
    eiere?.includes(applikasjonskontekst.brukerData.ident) ||
    applikasjonskontekst.harRolle([
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
    ]);

  const key =
    id && kanHente
      ? `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/filterverdier`
      : null;

  return useSWRGet(key, JobbsøkerFilterverdierSchema);
};
