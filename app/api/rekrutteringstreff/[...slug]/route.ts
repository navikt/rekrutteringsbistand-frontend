import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../../util/oboProxy';
import { RekrutteringstreffAPI } from '../../api-routes';

export async function GET(req: NextRequest) {
  return proxyWithOBO(RekrutteringstreffAPI, req);
}