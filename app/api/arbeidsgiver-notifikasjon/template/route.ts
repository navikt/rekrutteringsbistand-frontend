import { isLocal } from '../../../../util/env';
import { ArbeidsgiverNotifikasjonAPI } from '../../api-routes';

export async function GET() {
  if (isLocal) {
    // eslint-disable-next-line no-console
    console.log('isLocal', isLocal);
    return new Response('Template', {
      headers: { 'Content-Type': 'text/html' },
    });
  }

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
