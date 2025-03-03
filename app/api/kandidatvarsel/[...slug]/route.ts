import { KandidatvarselAPI } from '../../api-routes';
import { proxyWithOBO } from '../../oboProxy';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return proxyWithOBO(KandidatvarselAPI, req);
}
export async function POST(req: NextRequest) {
  return proxyWithOBO(KandidatvarselAPI, req);
}
