import { NextRequest } from 'next/server';
import { SynlighetsevalueringAPI } from '../api-routes';
import { proxyWithOBO } from '../oboProxy';

export async function POST(req: NextRequest) {
  return proxyWithOBO(SynlighetsevalueringAPI, req);
}
