'use client';

/**
 * Endepunkt /useStilling
 */
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
  mockUtløptStilling,
  nyStillingMock,
} from './mocks/stillingMock';
import { StillingDataSchema } from './stilling.dto';
import { StillingAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';

export const stillingEndepunkt = (stillingsId: string) =>
  `${StillingAPI.internUrl}/rekrutteringsbistandstilling/${stillingsId}`;

export const useStilling = (stillingsId?: string | null) =>
  useSWRGet(
    stillingsId ? stillingEndepunkt(stillingsId) : null,
    StillingDataSchema,
    {
      revalidateOnFocus: false,
      // Bruker default SWR-oppførsel for revalidateOnMount (false når data finnes i cache)
    },
  );

export const stillingMSWHandlers = [
  http.get(stillingEndepunkt('nyStilling'), () =>
    HttpResponse.json(nyStillingMock),
  ),
  http.get(stillingEndepunkt('internStilling'), () =>
    HttpResponse.json(internStillingMock),
  ),
  http.get(stillingEndepunkt('minStilling'), () =>
    HttpResponse.json(mockMinStilling),
  ),
  http.get(stillingEndepunkt('minFormidling'), () =>
    HttpResponse.json(mockFormidling),
  ),
  http.get(stillingEndepunkt('eksternStilling'), () =>
    HttpResponse.json(mockEksternStilling),
  ),
  http.get(stillingEndepunkt('minEksternStilling'), () =>
    HttpResponse.json(mockMinEksternStilling),
  ),
  // 6 konsistente tilstander
  http.get(stillingEndepunkt('publisertStilling'), () =>
    HttpResponse.json(mockPublisertStilling),
  ),
  http.get(stillingEndepunkt('publisertEksternStilling'), () =>
    HttpResponse.json(mockPublisertEksternStilling),
  ),
  http.get(stillingEndepunkt('utloptStilling'), () =>
    HttpResponse.json(mockUtløptStilling),
  ),
  http.get(stillingEndepunkt('stengtStilling'), () =>
    HttpResponse.json(mockStengtForSøkereStilling),
  ),
  http.get(stillingEndepunkt('slettetStilling'), () =>
    HttpResponse.json(mockSlettetStilling),
  ),
  http.get(stillingEndepunkt('fullfortStilling'), () =>
    HttpResponse.json(mockFullførtStilling),
  ),
  // StillingsBanner-spesifikke mocks
  http.get(stillingEndepunkt('bannerForlengOppdrag'), () =>
    HttpResponse.json(mockBannerForlengOppdrag),
  ),
  http.get(stillingEndepunkt('bannerApneSokeforslag'), () =>
    HttpResponse.json(mockBannerÅpneSøkeforslag),
  ),
  // Fullført-banner states
  http.get(stillingEndepunkt('fullfortBesattLast'), () =>
    HttpResponse.json(mockFullførtBesattLåst),
  ),
  http.get(stillingEndepunkt('fullfortIkkeBesattIkkeLast'), () =>
    HttpResponse.json(mockFullførtIkkeBesattIkkeLåst),
  ),
  http.get(stillingEndepunkt('fullfortIkkeBesattLast'), () =>
    HttpResponse.json(mockFullførtIkkeBesattLåst),
  ),
  // Utkast
  http.get(stillingEndepunkt('utkastStilling'), () =>
    HttpResponse.json(mockUtkastStilling),
  ),
  // Ikke publisert
  http.get(stillingEndepunkt('ikkePublisertStilling'), () =>
    HttpResponse.json(mockIkkePublisertStilling),
  ),
  // Etterregistrering
  http.get(stillingEndepunkt('etterregistrering'), () =>
    HttpResponse.json(mockEtterregistreringFormidling),
  ),
  http.get(stillingEndepunkt('etterregistreringApen'), () =>
    HttpResponse.json(mockEtterregistreringFormidlingÅpen),
  ),
  // Jobbmesse
  http.get(stillingEndepunkt('jobbmesse'), () =>
    HttpResponse.json(mockJobbmesse),
  ),
  http.get(stillingEndepunkt('baseStilling'), () =>
    HttpResponse.json(mockBaseStilling),
  ),
  http.get(stillingEndepunkt('*'), ({ params }) => {
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
