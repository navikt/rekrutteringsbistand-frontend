import {
  StillingAPI,
  StillingsSøkAPI,
  SynlighetsevalueringAPI,
} from '@/app/api/api-routes';
import {
  internStillingMock,
  mockBannerForlengOppdrag,
  mockBannerÅpneSøkeforslag,
  mockBaseStilling,
  mockEksternStilling,
  mockEtterregistreringFormidling,
  mockEtterregistreringFormidlingÅpen,
  mockFormidling,
  mockFullførtBesattLåst,
  mockFullførtIkkeBesattIkkeLåst,
  mockFullførtIkkeBesattLåst,
  mockFullførtStilling,
  mockIkkePublisertStilling,
  mockJobbmesse,
  mockMinEksternStilling,
  mockMinStilling,
  mockPublisertEksternStilling,
  mockPublisertStilling,
  mockSlettetStilling,
  mockStengtForSøkereStilling,
  mockUtkastStilling,
  mockUtløptEksternStilling,
  mockUtløptStilling,
  nyStillingMock,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import {
  mockEtterregistreringssøk,
  mockStillingssøk,
} from '@/app/api/stillings-sok/mocks/mockStillingssøk';
import { getMock, postMock } from '@/mocks/mockUtils';
import { HttpResponse, passthrough } from 'msw';

const stillingEndepunkt = (stillingsId: string) =>
  `${StillingAPI.internUrl}/rekrutteringsbistandstilling/${stillingsId}`;

const stillingsSokBase = `${StillingsSøkAPI.internUrl}`;

const synlighetsevalueringEndepunkt = `${SynlighetsevalueringAPI.internUrl}/evaluering`;

export const stillingMSWHandlers = [
  getMock(stillingEndepunkt('nyStilling'), () =>
    HttpResponse.json(nyStillingMock),
  ),
  getMock(stillingEndepunkt('internStilling'), () =>
    HttpResponse.json(internStillingMock),
  ),
  getMock(stillingEndepunkt('minStilling'), () =>
    HttpResponse.json(mockMinStilling),
  ),
  getMock(stillingEndepunkt('minFormidling'), () =>
    HttpResponse.json(mockFormidling),
  ),
  getMock(stillingEndepunkt('eksternStilling'), () =>
    HttpResponse.json(mockEksternStilling),
  ),
  getMock(stillingEndepunkt('minEksternStilling'), () =>
    HttpResponse.json(mockMinEksternStilling),
  ),
  getMock(stillingEndepunkt('publisertStilling'), () =>
    HttpResponse.json(mockPublisertStilling),
  ),
  getMock(stillingEndepunkt('publisertEksternStilling'), () =>
    HttpResponse.json(mockPublisertEksternStilling),
  ),
  getMock(stillingEndepunkt('utloptStilling'), () =>
    HttpResponse.json(mockUtløptStilling),
  ),
  getMock(stillingEndepunkt('utloptEksternStilling'), () =>
    HttpResponse.json(mockUtløptEksternStilling),
  ),
  getMock(stillingEndepunkt('stengtStilling'), () =>
    HttpResponse.json(mockStengtForSøkereStilling),
  ),
  getMock(stillingEndepunkt('slettetStilling'), () =>
    HttpResponse.json(mockSlettetStilling),
  ),
  getMock(stillingEndepunkt('fullfortStilling'), () =>
    HttpResponse.json(mockFullførtStilling),
  ),
  getMock(stillingEndepunkt('bannerForlengOppdrag'), () =>
    HttpResponse.json(mockBannerForlengOppdrag),
  ),
  getMock(stillingEndepunkt('bannerApneSokeforslag'), () =>
    HttpResponse.json(mockBannerÅpneSøkeforslag),
  ),
  getMock(stillingEndepunkt('fullfortBesattLast'), () =>
    HttpResponse.json(mockFullførtBesattLåst),
  ),
  getMock(stillingEndepunkt('fullfortIkkeBesattIkkeLast'), () =>
    HttpResponse.json(mockFullførtIkkeBesattIkkeLåst),
  ),
  getMock(stillingEndepunkt('fullfortIkkeBesattLast'), () =>
    HttpResponse.json(mockFullførtIkkeBesattLåst),
  ),
  getMock(stillingEndepunkt('utkastStilling'), () =>
    HttpResponse.json(mockUtkastStilling),
  ),
  getMock(stillingEndepunkt('ikkePublisertStilling'), () =>
    HttpResponse.json(mockIkkePublisertStilling),
  ),
  getMock(stillingEndepunkt('etterregistrering'), () =>
    HttpResponse.json(mockEtterregistreringFormidling),
  ),
  getMock(stillingEndepunkt('etterregistreringApen'), () =>
    HttpResponse.json(mockEtterregistreringFormidlingÅpen),
  ),
  getMock(stillingEndepunkt('jobbmesse'), () =>
    HttpResponse.json(mockJobbmesse),
  ),
  getMock(stillingEndepunkt('baseStilling'), () =>
    HttpResponse.json(mockBaseStilling),
  ),
  getMock(stillingEndepunkt('*'), ({ params }) => {
    const slug = params.slug;
    const kjenteSlugs = [
      'nyStilling',
      'internStilling',
      'minStilling',
      'minFormidling',
      'eksternStilling',
      'minEksternStilling',
      'publisertStilling',
      'publisertEksternStilling',
      'utloptStilling',
      'utloptEksternStilling',
      'stengtStilling',
      'slettetStilling',
      'fullfortStilling',
      'bannerForlengOppdrag',
      'bannerApneSokeforslag',
      'fullfortBesattLast',
      'fullfortIkkeBesattIkkeLast',
      'fullfortIkkeBesattLast',
      'utkastStilling',
      'ikkePublisertStilling',
      'etterregistrering',
      'etterregistreringApen',
      'jobbmesse',
      'baseStilling',
    ];
    if (kjenteSlugs.includes(slug as string)) {
      return HttpResponse.json(mockBaseStilling);
    }
    return HttpResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 500,
        error: 'Internal Server Error',
        path: `/rekrutteringsbistandstilling/${slug}`,
      },
      { status: 500 },
    );
  }),
];

export const stillingssøkMSWHandler = postMock(
  stillingsSokBase,
  async ({ request }) => {
    if (process.env.NEXT_PUBLIC_STILLING_ES_MOCK === 'true') {
      return passthrough();
    }

    const body = (await request.json()) as Record<string, unknown>;
    const queryStr = JSON.stringify(body.query ?? {});
    const erFormidling =
      queryStr.includes('"stillingsinfo.stillingskategori":"FORMIDLING"') &&
      !queryStr.includes('"stillingsinfo.stillingskategori":"ARBEIDSTRENING"');
    const mock = erFormidling ? mockEtterregistreringssøk : mockStillingssøk;

    return HttpResponse.json({
      hits: mock.hits,
      antall: { status: { publisert: 0, utløpt: 0, stoppet: 0 } },
    });
  },
);

export const synlighetsevalueringMSWHandler = postMock(
  synlighetsevalueringEndepunkt,
  () =>
    HttpResponse.json({
      harAktivCv: false,
      harJobbprofil: false,
      erUnderOppfoelging: false,
      erArbeidssøker: false,
      erIkkeSperretAnsatt: true,
      erIkkeDoed: true,
      erFerdigBeregnet: true,
    }),
);
