import { proxyWithOBO } from '../../../../util/oboProxy';

import { NextRequest } from 'next/server';
import { StillingAPI } from '../../api-routes';

export async function PUT(req: NextRequest) {
  return proxyWithOBO(StillingAPI, req, `/stillingsinfo`);
}
