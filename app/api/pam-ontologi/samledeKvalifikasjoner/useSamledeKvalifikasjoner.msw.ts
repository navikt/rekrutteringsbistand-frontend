import { PamOntologiAPI } from '@/app/api/api-routes';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const SAMLEDE_KVALIFIKASJONER = [
  {
    konseptId: 175819,
    styrk08: '5120',
    styrk08Label: 'Kokker',
    esco: '',
    escoLabel: '',
    label: 'Kokk',
    undertype: '',
    kategori: 'YRKESTITTEL',
  },
  {
    konseptId: 240122,
    styrk08: '5120',
    styrk08Label: 'Kokker',
    esco: '',
    escoLabel: '',
    label: 'Kokkelærling',
    undertype: '',
    kategori: 'YRKESTITTEL',
  },
  {
    konseptId: 91501,
    styrk08: '',
    styrk08Label: '',
    esco: '',
    escoLabel: '',
    label: 'Førerkort klasse B',
    undertype: '',
    kategori: 'FORERKORT',
  },
  {
    konseptId: 50121,
    styrk08: '',
    styrk08Label: '',
    esco: '',
    escoLabel: '',
    label: 'Matlaging',
    undertype: '',
    kategori: 'KOMPETANSE',
  },
  {
    konseptId: 80201,
    styrk08: '',
    styrk08Label: '',
    esco: '',
    escoLabel: '',
    label: 'Fagbrev som kokk',
    undertype: '',
    kategori: 'FAGDOKUMENTASJON',
  },
  {
    konseptId: 50988,
    styrk08: '',
    styrk08Label: '',
    esco: '',
    escoLabel: '',
    label: 'Servering',
    undertype: '',
    kategori: 'KOMPETANSE',
  },
  {
    konseptId: 50989,
    styrk08: '',
    styrk08Label: '',
    esco: '',
    escoLabel: '',
    label: 'Hygiene',
    undertype: '',
    kategori: 'KOMPETANSE',
  },
];

export const samledeKvalifikasjonerMSWHandler = getMock(
  PamOntologiAPI.internUrl + `/samledeKvalifikasjoner`,
  ({ request }) => {
    const url = new URL(request.url);
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
    if (q.length < 2) return HttpResponse.json([]);
    const treff = SAMLEDE_KVALIFIKASJONER.filter((item) =>
      item.label.toLowerCase().includes(q),
    );
    if (treff.length > 0) return HttpResponse.json(treff);
    return HttpResponse.json(SAMLEDE_KVALIFIKASJONER.slice(0, 3));
  },
);
