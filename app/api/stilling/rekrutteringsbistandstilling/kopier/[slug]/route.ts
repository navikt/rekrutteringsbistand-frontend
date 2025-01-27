import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../../../../util/oboProxy';
import { StillingAPI } from '../../../../api-routes';

export async function POST(req: NextRequest) {
  return proxyWithOBO(StillingAPI, req);
}
