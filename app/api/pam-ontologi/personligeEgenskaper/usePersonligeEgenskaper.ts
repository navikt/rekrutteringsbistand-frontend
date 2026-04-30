import { PamOntologiAPI } from '@/app/api/api-routes';
import { PamOntologiBegrepSchema } from '@/app/api/pam-ontologi/schema';
import { useSWRGet } from '@/app/api/useSWRGet';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';

const pamEndepunkt = (søkeord: string) =>
  PamOntologiAPI.internUrl + `/personligeEgenskaper?q=${søkeord}`;

export const PersonligEgenskapSchema = PamOntologiBegrepSchema;

export const personligeEgenskaperSchema = z.array(PersonligEgenskapSchema);

export type PersonligEgenskapDTO = z.infer<typeof PersonligEgenskapSchema>;

export const usePersonligeEgenskaper = (søkeOrd?: string) =>
  useSWRGet(
    søkeOrd && søkeOrd.trim().length >= 2 ? pamEndepunkt(søkeOrd) : null,
    personligeEgenskaperSchema,
  );

const PERSONLIGE_EGENSKAPER = [
  {
    konseptId: 700001,
    styrk08: '',
    esco: '',
    escoLabel: '',
    label: 'Selvstendig',
    undertype: '',
  },
  {
    konseptId: 700002,
    styrk08: '',
    esco: '',
    escoLabel: '',
    label: 'Strukturert',
    undertype: '',
  },
  {
    konseptId: 700003,
    styrk08: '',
    esco: '',
    escoLabel: '',
    label: 'Serviceinnstilt',
    undertype: '',
  },
  {
    konseptId: 700004,
    styrk08: '',
    esco: '',
    escoLabel: '',
    label: 'Samarbeidsvillig',
    undertype: '',
  },
  {
    konseptId: 700005,
    styrk08: '',
    esco: '',
    escoLabel: '',
    label: 'Kundebehandler',
    undertype: '',
  },
  {
    konseptId: 700006,
    styrk08: '',
    esco: '',
    escoLabel: '',
    label: 'Punktlig',
    undertype: '',
  },
  {
    konseptId: 700007,
    styrk08: '',
    esco: '',
    escoLabel: '',
    label: 'Initiativrik',
    undertype: '',
  },
];

export const personligeEgenskaperMSWHandler = getMock(
  PamOntologiAPI.internUrl + `/personlige_egenskaper`,
  ({ request }) => {
    const url = new URL(request.url);
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
    if (q.length < 2) return HttpResponse.json([]);
    const treff = PERSONLIGE_EGENSKAPER.filter((item) =>
      item.label.toLowerCase().includes(q),
    );
    if (treff.length > 0) return HttpResponse.json(treff);
    return HttpResponse.json(PERSONLIGE_EGENSKAPER.slice(0, 3));
  },
);
