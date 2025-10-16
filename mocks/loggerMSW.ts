import { http, HttpResponse } from 'msw';

/**
 * Mock av intern logger-endepunkt.
 * Default: svelger POST /api/logger og svarer 200 OK.

 */
const PATH = '/api/logger';

export const loggerMSWHandler = http.post(PATH, async ({ request }) => {
  try {
    const body = await request.json();
    // eslint-disable-next-line no-console
    console.info('[MSW][logger] Event:', body);
  } catch {
    // eslint-disable-next-line no-console
    console.info('[MSW][logger] (ingen / uleselig body)');
  }

  return HttpResponse.json({ ok: true });
});

export const loggerMSWHandlers = [loggerMSWHandler];
