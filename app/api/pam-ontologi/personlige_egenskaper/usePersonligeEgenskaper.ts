import { personligeEgenskaperMock } from './personligeEgenskaperMock';
import { PamOntologiAPI } from '@/app/api/api-routes';
import { PamOntologiBegrepSchema } from '@/app/api/pam-ontologi/schema';
import { useSWRGet } from '@/app/api/useSWRGet';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';

const pamEndepunkt = (søkeord: string) =>
  PamOntologiAPI.internUrl + `/personlige_egenskaper?q=${søkeord}`;

export const PersonligEgenskapSchema = PamOntologiBegrepSchema;

export const personligeEgenskaperSchema = z.array(PersonligEgenskapSchema);

export type PersonligEgenskapDTO = z.infer<typeof PersonligEgenskapSchema>;

export const usePersonligeEgenskaper = (søkeOrd?: string) =>
  useSWRGet(
    søkeOrd && søkeOrd.trim().length >= 2 ? pamEndepunkt(søkeOrd) : null,
    personligeEgenskaperSchema,
  );

export const personligeEgenskaperMSWHandler = getMock(
  PamOntologiAPI.internUrl + `/personlige_egenskaper`,
  ({ request }) => {
    const url = new URL(request.url);
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
    if (q.length < 2) return HttpResponse.json([]);
    const treff = personligeEgenskaperMock.filter((item) =>
      item.label.toLowerCase().includes(q),
    );
    if (treff.length > 0) return HttpResponse.json(treff);
    return HttpResponse.json(personligeEgenskaperMock.slice(0, 3));
  },
);
