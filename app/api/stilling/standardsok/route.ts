import { StillingAPI } from '../../api-routes';
import { proxyWithOBO } from '../../oboProxy';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return proxyWithOBO(StillingAPI, req);
}

export async function PUT(req: NextRequest) {
  return proxyWithOBO(StillingAPI, req);
}
