import { StillingAPI } from '@/app/api/api-routes';
import { proxyWithOBO } from '@/app/api/oboProxy';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
  return proxyWithOBO(StillingAPI, req, `/rekrutteringsbistandstilling`);
}
