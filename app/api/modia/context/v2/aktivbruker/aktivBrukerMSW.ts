import { http, HttpResponse } from 'msw';

export const aktivBrukerMSWHandler = http.post(
  '/api/modia/context/v2/aktivbruker ',
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
