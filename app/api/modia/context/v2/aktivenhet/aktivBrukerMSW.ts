import { http, HttpResponse } from 'msw';

export const aktivEnhetMSWHandler = http.post(
  '/api/modia/context/v2/aktivenhet ',
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
