import { NextRequest, NextResponse } from 'next/server';
import { proxyWithOBO } from '../../../../util/oboProxy';
import { StillingAPI } from '../../api-routes';
import devVirksomheter from './mocks/devVirksomheter';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const organisasjonsnummer = body ?? '';

  if (organisasjonsnummer === 'dev-gcp') {
    return NextResponse.json(devVirksomheter);
  }

  const utenMellomrom = organisasjonsnummer.replace(/\s/g, '');

  proxyWithOBO(
    StillingAPI,
    req,
    `/stilling-api/search-api/underenhet/_search?q=organisasjonsnummer:${utenMellomrom}*`,
  );
}
