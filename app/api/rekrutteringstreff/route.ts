import { NextRequest } from 'next/server';
import { RekrutteringstreffAPI } from '../api-routes';
import { proxyWithOBO } from '../oboProxy';

export async function GET(req: NextRequest) {
  return proxyWithOBO(RekrutteringstreffAPI, req);
}
