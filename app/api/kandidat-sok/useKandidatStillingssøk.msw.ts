import { KandidatSøkAPI } from '@/app/api/api-routes';
import { getSingleKandidatStillingssøk } from '@/app/api/kandidat-sok/mocks/kandidat.mock';
import { postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const kandidatStillingssøkEndepunkt = `${KandidatSøkAPI.internUrl}/kandidat-stillingssok`;

export const kandidatStillingssøkMSWHandler = postMock(
  kandidatStillingssøkEndepunkt,
  async ({ request }) => {
    const raw = (await request.json().catch(() => undefined)) as
      | { kandidatnr?: string }
      | undefined;
    const kandidatnr = raw?.kandidatnr;
    if (!kandidatnr) return new Response(null, { status: 400 });
    if (kandidatnr === 'utenTilgang') {
      return HttpResponse.json({
        yrkeJobbonskerObj: [],
        geografiJobbonsker: [],
        kommunenummerstring: null,
        kommuneNavn: null,
      });
    }
    const parts = kandidatnr.split('-');
    const seed = parseInt(parts[parts.length - 1], 10);
    const stillingssokData = getSingleKandidatStillingssøk(seed);
    return HttpResponse.json({
      hits: { hits: [{ _source: stillingssokData }] },
    });
  },
);
