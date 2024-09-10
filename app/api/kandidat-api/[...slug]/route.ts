import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../../util/oboProxy';
import { KandidatAPI } from '../../api-routes';

export async function GET(req: NextRequest) {
  console.log('🎺 req', req);
  return proxyWithOBO(KandidatAPI, req);
}
