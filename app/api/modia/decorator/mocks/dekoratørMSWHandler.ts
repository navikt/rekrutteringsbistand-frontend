import { http, HttpResponse } from 'msw';

export const dekoratørMSWHandler = http.post(
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
