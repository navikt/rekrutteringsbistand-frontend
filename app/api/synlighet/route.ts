import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../util/oboProxy';
import { SynlighetsevalueringAPI } from '../api-routes';

export async function POST(req: NextRequest) {
  return proxyWithOBO(SynlighetsevalueringAPI, req);
}
