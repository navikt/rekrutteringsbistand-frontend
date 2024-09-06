import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../util/oboProxy';
import { KandidatsøkAPI } from '../api-routes';

export async function GET(req: NextRequest) {
  return proxyWithOBO(KandidatsøkAPI, req);
}
