import { samledeKvalifikasjonerMock } from './samledeKvalifikasjonerMock';
import { PamOntologiAPI } from '@/app/api/api-routes';
import { PamOntologiBegrepSchema } from '@/app/api/pam-ontologi/schema';
import { useSWRGet } from '@/app/api/useSWRGet';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';

const pamEndepunkt = (søkeord: string) =>
  PamOntologiAPI.internUrl + `/samlede_kvalifikasjoner?q=${søkeord}`;

export const SamletKvalifikasjonKategoriSchema = z.enum([
  'YRKESTITTEL',
  'KOMPETANSE',
  'AUTORISASJON',
  'FAGDOKUMENTASJON',
  'FORERKORT',
]);

export const SamletKvalifikasjonSchema = PamOntologiBegrepSchema.extend({
  kategori: SamletKvalifikasjonKategoriSchema,
});

export const samledeKvalifikasjonerSchema = z.array(SamletKvalifikasjonSchema);

export type SamletKvalifikasjonKategori = z.infer<
  typeof SamletKvalifikasjonKategoriSchema
>;
export type SamletKvalifikasjonDTO = z.infer<typeof SamletKvalifikasjonSchema>;

export const useSamledeKvalifikasjoner = (søkeOrd?: string) =>
  useSWRGet(
    søkeOrd && søkeOrd.trim().length >= 2 ? pamEndepunkt(søkeOrd) : null,
    samledeKvalifikasjonerSchema,
  );

export const samledeKvalifikasjonerMSWHandler = getMock(
  PamOntologiAPI.internUrl + `/samlede_kvalifikasjoner`,
  ({ request }) => {
    const url = new URL(request.url);
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
    if (q.length < 2) return HttpResponse.json([]);
    const treff = samledeKvalifikasjonerMock.filter((item) =>
      (item.kategori === 'FORERKORT'
        ? `førerkort klasse ${item.label}`
        : item.label
      )
        .toLowerCase()
        .includes(q),
    );
    if (treff.length > 0) return HttpResponse.json(treff);
    return HttpResponse.json(samledeKvalifikasjonerMock.slice(0, 3));
  },
);
