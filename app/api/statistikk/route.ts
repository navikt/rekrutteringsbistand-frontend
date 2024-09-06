import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../util/oboProxy';
import { StatistikkAPI } from '../api-routes';

export async function GET(req: NextRequest) {
  return proxyWithOBO(StatistikkAPI, req);
}
