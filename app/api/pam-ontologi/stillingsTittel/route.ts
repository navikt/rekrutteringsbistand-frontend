import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../../util/oboProxy';
import { PamOntologiAPI } from '../../api-routes';

export async function GET(req: NextRequest) {
  console.log('hei');
  const søkeord = req.nextUrl.searchParams.get('q');
  return proxyWithOBO(
    PamOntologiAPI,
    req,
    `/rest/typeahead/stilling?stillingstittel=${søkeord}`,
  );
}
