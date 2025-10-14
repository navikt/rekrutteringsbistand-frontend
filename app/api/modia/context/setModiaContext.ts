import { ModiaDecoratorAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';

const PATH = `${ModiaDecoratorAPI.internUrl}/context`;
export enum ModiaEventType {
  NY_AKTIV_BRUKER = 'NY_AKTIV_BRUKER',
  NY_AKTIV_ENHET = 'NY_AKTIV_ENHET',
}

export const setModiaContext = async (
  eventType: ModiaEventType,
  verdi: string,
) => {
  return await postApi(PATH, {
    verdi,
    eventType,
  });
};

export const modiaContextMSWHandler = http.post(PATH, async ({ request }) => {
  try {
    await request.json();
  } catch {
    /* ignore */
  }

  // Simulerer enkel OK-respons (tilpass hvis API har annen struktur/status)
  return HttpResponse.json({ ok: true });
});
