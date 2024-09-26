import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../../util/oboProxy';
import { KandidatAPI } from '../../api-routes';

export async function GET(req: NextRequest) {
  return proxyWithOBO(KandidatAPI, req);
}

export async function POST(req: NextRequest) {
  return proxyWithOBO(KandidatAPI, req);
}
