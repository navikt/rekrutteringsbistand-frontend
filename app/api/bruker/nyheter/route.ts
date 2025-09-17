import { BrukerAPI } from '@/app/api/api-routes';
import { proxyWithOBO } from '@/app/api/oboProxy';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return proxyWithOBO(BrukerAPI, req);
}

export async function POST(req: NextRequest) {
  return proxyWithOBO(BrukerAPI, req);
}
