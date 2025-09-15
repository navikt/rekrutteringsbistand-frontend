import { StatistikkAPI } from '@/app/api/api-routes';
import { proxyWithOBO } from '@/app/api/oboProxy';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return proxyWithOBO(StatistikkAPI, req);
}
