import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../util/oboProxy';

export async function GET(req: NextRequest) {
  const url = process.env.MODIA_CONTEXT_HOLDER_API;
  const scope = 'api://dev-gcp.personoversikt.modiacontextholder/.default';
  return proxyWithOBO(url, scope, req);
}
