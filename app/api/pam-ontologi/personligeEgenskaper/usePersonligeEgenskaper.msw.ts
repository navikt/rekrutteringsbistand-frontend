import { PamOntologiAPI } from '@/app/api/api-routes';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

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
  PamOntologiAPI.internUrl + `/personligeEgenskaper`,
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
