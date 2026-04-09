import { http, HttpResponse } from 'msw';

/**
 * Mock av Umami analytics-event. Svarer 200 OK og ignorerer payload.
 * Sett NEXT_PUBLIC_DEBUG_UMAMI=true for å logge innkommende events i konsoll.
 */
export const umamiMSW = http.post(
  /https:\/\/reops-event-proxy\..*\/api\/send/,
  async ({ request }) => {
    if (process.env.NEXT_PUBLIC_DEBUG_UMAMI === 'true') {
      try {
        await request.json();
      } catch {
        /* ignore */
      }
    }
    return HttpResponse.json({ ok: true });
  },
);

export const umamiMSWHandlers = [umamiMSW];
