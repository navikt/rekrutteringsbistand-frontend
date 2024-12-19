import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../../../util/oboProxy';
import { StillingAPI } from '../../../api-routes';

export async function GET(req: NextRequest) {
  return proxyWithOBO(
    StillingAPI,
    req,
    '/rekrutteringsbistand/api/v1/geography/postdata',
  );
}
