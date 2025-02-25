import { NextRequest } from 'next/server';
import { RekrutteringstreffAPI } from '../api-routes';
import { proxyWithOBO } from '../../../util/oboProxy';

export async function GET(req: NextRequest) {
  return proxyWithOBO(RekrutteringstreffAPI, req);
}
