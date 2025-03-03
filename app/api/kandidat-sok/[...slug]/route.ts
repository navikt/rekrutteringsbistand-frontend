import { KandidatSøkAPI } from '../../api-routes';
import { proxyWithOBO } from '../../oboProxy';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return proxyWithOBO(KandidatSøkAPI, req);
}

export async function POST(req: NextRequest) {
  return proxyWithOBO(KandidatSøkAPI, req);
}
