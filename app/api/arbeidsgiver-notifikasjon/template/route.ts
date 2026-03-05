import { ArbeidsgiverNotifikasjonAPI } from '@/app/api/api-routes';
import { skalMocke } from '@/util/env';

export async function GET() {
  const requestUrl = skalMocke
    ? 'http://mock-api/api/arbeidsgiver-notifikasjon/template'
    : `${ArbeidsgiverNotifikasjonAPI.api_url}/template`;

  const response = await fetch(requestUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache, no-store',
    },
  });
  const html = await response.text();
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
