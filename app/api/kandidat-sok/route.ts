import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../util/oboProxy';
import { KandidatSøkAPI } from '../api-routes';

export async function GET(req: NextRequest) {
  return proxyWithOBO(KandidatSøkAPI, req);
}
