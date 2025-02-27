import { NextRequest } from 'next/server';
import { StatistikkAPI } from '../api-routes';
import { proxyWithOBO } from '../oboProxy';

export async function GET(req: NextRequest) {
  return proxyWithOBO(StatistikkAPI, req);
}
