import { NextRequest } from 'next/server';
import { KandidatSøkAPI } from '../api-routes';
import { proxyWithOBO } from '../oboProxy';

export async function GET(req: NextRequest) {
  return proxyWithOBO(KandidatSøkAPI, req);
}
