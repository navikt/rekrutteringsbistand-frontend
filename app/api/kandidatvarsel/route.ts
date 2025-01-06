import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../util/oboProxy';
import { KandidatvarselAPI } from '../api-routes';

export async function GET(req: NextRequest) {
  return proxyWithOBO(KandidatvarselAPI, req);
}
export async function POST(req: NextRequest) {
  return proxyWithOBO(KandidatvarselAPI, req);
}
