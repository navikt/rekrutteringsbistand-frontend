import { postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const dekoratørMSWHandler = postMock(
  '/api/modia/decorator ',
  async ({ request }) => {
    try {
      await request.json();
    } catch {
      /* ignore */
    }

    // Simulerer enkel OK-respons (tilpass hvis API har annen struktur/status)
    return HttpResponse.json({ ok: true });
  },
);
