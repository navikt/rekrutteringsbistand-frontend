import { StillingAPI } from '../../api-routes';
import { proxyWithOBO } from '../../oboProxy';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  return proxyWithOBO(StillingAPI, req, `/rekrutteringsbistandstilling`);
}
