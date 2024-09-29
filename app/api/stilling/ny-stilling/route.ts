import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../../util/oboProxy';
import { StillingAPI } from '../../api-routes';

export async function POST(req: NextRequest) {
  proxyWithOBO(StillingAPI, req, `/stilling-api/rekrutteringsbistandstilling`);
}
