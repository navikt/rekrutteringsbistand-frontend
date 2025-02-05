import { ArbeidsgiverNotifikasjonAPI } from '../../api-routes';

export async function GET() {
  const response = await fetch(
    `${ArbeidsgiverNotifikasjonAPI.api_url}/template`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache, no-store',
      },
    },
  );
  const html = await response.text();
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
