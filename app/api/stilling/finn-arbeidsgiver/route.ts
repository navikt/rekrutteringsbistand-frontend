import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../../util/oboProxy';
import { StillingAPI } from '../../api-routes';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const organisasjonsnummer = searchParams.get('organisasjonsnummer') ?? '';

  const utenMellomrom = organisasjonsnummer.replace(/\s/g, '');

  proxyWithOBO(
    StillingAPI,
    req,
    `/stilling-api/search-api/underenhet/_search?q=organisasjonsnummer:${utenMellomrom}*`,
  );
}
