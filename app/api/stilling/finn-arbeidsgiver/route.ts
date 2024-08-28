import { NextRequest, NextResponse } from 'next/server';
import { isLocal } from '../../../../util/env';
import { proxyWithOBO } from '../../../../util/oboProxy';
import { StillingAPI } from '../../api-routes';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const organisasjonsnummer = searchParams.get('organisasjonsnummer') ?? '';

  if (isLocal) {
    return NextResponse.json({ data: 'kake' });
  }

  const utenMellomrom = organisasjonsnummer.replace(/\s/g, '');

  proxyWithOBO(
    StillingAPI,
    req,
    `/stilling-api/search-api/underenhet/_search?q=organisasjonsnummer:${utenMellomrom}*`,
  );
}
