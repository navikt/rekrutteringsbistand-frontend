import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../../../util/oboProxy';
import { StillingAPI } from '../../../api-routes';

export async function GET(req: NextRequest) {
  // const { pathname } = req.nextUrl;

  return proxyWithOBO(StillingAPI, req);
}
