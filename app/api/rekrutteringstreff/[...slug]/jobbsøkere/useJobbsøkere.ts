'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useSWRGet } from '@/app/api/useSWRGet';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { z } from 'zod';

export const JobbsøkerStatusEnum = z.enum(
  Object.values(JobbsøkerStatus) as [string, ...string[]],
);
export type JobbsøkerStatusType = z.infer<typeof JobbsøkerStatusEnum>;

export const JobbsøkerSøkTreffSchema = z.object({
  personTreffId: z.string(),
  fornavn: z.string().nullable(),
  etternavn: z.string().nullable(),
  innsatsgruppe: z.string().nullable(),
  fylke: z.string().nullable(),
  kommune: z.string().nullable(),
  poststed: z.string().nullable(),
  navkontor: z.string().nullable(),
  veilederNavn: z.string().nullable(),
  veilederNavident: z.string().nullable(),
  status: JobbsøkerStatusEnum,
  invitertDato: z.string().nullable(),
});

export const JobbsøkerSøkResponsSchema = z.object({
  totalt: z.number(),
  side: z.number(),
  antallPerSide: z.number(),
  jobbsøkere: z.array(JobbsøkerSøkTreffSchema),
});

export const JobbsøkerFilterverdiStedSchema = z.object({
  navn: z.string(),
  type: z.enum(['kommune', 'fylke']),
});

export const JobbsøkerFilterverdierSchema = z.object({
  navkontor: z.array(z.string()),
  innsatsgrupper: z.array(z.string()),
  steder: z.array(JobbsøkerFilterverdiStedSchema),
});

export type JobbsøkerSøkTreffDTO = z.infer<typeof JobbsøkerSøkTreffSchema>;
export type JobbsøkerSøkResponsDTO = z.infer<typeof JobbsøkerSøkResponsSchema>;
export type JobbsøkerFilterverdierDTO = z.infer<
  typeof JobbsøkerFilterverdierSchema
>;

export interface JobbsøkerSøkFiltre {
  fritekst?: string;
  status?: string[];
  innsatsgruppe?: string[];
  fylke?: string;
  kommune?: string;
  navkontor?: string;
  veileder?: string;
  sortering?: string;
}

export const jobbsøkereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker`;

const jobbsøkerFilterverdierEndepunkt = (id: string) =>
  `${jobbsøkereEndepunkt(id)}/filterverdier`;

const byggSøkeUrl = (
  id: string,
  side: number,
  antallPerSide: number,
  filtre?: JobbsøkerSøkFiltre,
): string => {
  const params = new URLSearchParams();
  params.set('side', String(side));
  params.set('antallPerSide', String(antallPerSide));
  if (filtre?.fritekst) params.set('fritekst', filtre.fritekst);
  if (filtre?.status?.length) params.set('status', filtre.status.join(','));
  if (filtre?.innsatsgruppe?.length)
    params.set('innsatsgruppe', filtre.innsatsgruppe.join(','));
  if (filtre?.fylke) params.set('fylke', filtre.fylke);
  if (filtre?.kommune) params.set('kommune', filtre.kommune);
  if (filtre?.navkontor) params.set('navkontor', filtre.navkontor);
  if (filtre?.veileder) params.set('veileder', filtre.veileder);
  if (filtre?.sortering) params.set('sortering', filtre.sortering);
  return `${jobbsøkereEndepunkt(id)}?${params.toString()}`;
};

export const useJobbsøkerSøk = (
  id: string | undefined,
  side: number,
  antallPerSide: number,
  filtre?: JobbsøkerSøkFiltre,
  refreshInterval?: number,
) => {
  const kanHenteJobbsøkere = useKanHenteJobbsøkere(id);

  const key =
    id && kanHenteJobbsøkere
      ? byggSøkeUrl(id, side, antallPerSide, filtre)
      : null;

  return useSWRGet(key, JobbsøkerSøkResponsSchema, {
    nonImmutable: !!refreshInterval,
    refreshInterval,
  });
};

const fodselsnumreEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/fodselsnumre`;

export const useJobbsøkerFodselsnumre = (id?: string) => {
  const kanHenteJobbsøkere = useKanHenteJobbsøkere(id);

  const key = id && kanHenteJobbsøkere ? fodselsnumreEndepunkt(id) : null;
  return useSWRGet(key, z.array(z.string()));
};

export const useJobbsøkerFilterverdier = (id?: string) => {
  const kanHenteJobbsøkere = useKanHenteJobbsøkere(id);
  const key =
    id && kanHenteJobbsøkere ? jobbsøkerFilterverdierEndepunkt(id) : null;
  return useSWRGet(key, JobbsøkerFilterverdierSchema);
};

const useKanHenteJobbsøkere = (id?: string) => {
  const applikasjonskontekst = useApplikasjonContext();
  const eiere = useRekrutteringstreff(id)?.data?.eiere;

  return (
    eiere?.includes(applikasjonskontekst.brukerData.ident) ||
    applikasjonskontekst.harRolle([
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
    ])
  );
};
