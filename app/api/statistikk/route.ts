import { StatistikkAPI } from '../api-routes';
import { proxyWithOBO } from '../oboProxy';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return proxyWithOBO(StatistikkAPI, req);
}
