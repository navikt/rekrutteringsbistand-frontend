import { http, HttpResponse } from 'msw';

const UMAMI_URL = 'https://umami.nav.no/api/send';

/**
 * Mock av Umami analytics-event. Svarer 200 OK og ignorerer payload.
 * Sett NEXT_PUBLIC_DEBUG_UMAMI=true for å logge innkommende events i konsoll.
 */
export const umamiMSW = http.post(UMAMI_URL, async ({ request }) => {
  if (process.env.NEXT_PUBLIC_DEBUG_UMAMI === 'true') {
    try {
      await request.json();
    } catch {
      /* ignore */
    }
  }
  return HttpResponse.json({ ok: true });
});

export const umamiMSWHandlers = [umamiMSW];
