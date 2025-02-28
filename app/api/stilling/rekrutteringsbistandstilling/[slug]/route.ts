import { NextRequest } from 'next/server';
import { StillingAPI } from '../../../api-routes';
import { proxyWithOBO } from '../../../oboProxy';

export async function GET(req: NextRequest) {
  return proxyWithOBO(StillingAPI, req);
}

export async function POST(req: NextRequest) {
  return proxyWithOBO(StillingAPI, req);
}
