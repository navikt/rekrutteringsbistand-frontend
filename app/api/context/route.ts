import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../util/oboProxy';

export async function GET(req: NextRequest) {
  const newHostname = process.env.MODIA_CONTEXT_HOLDER_API;
  const audience = 'api://dev-gcp.personoversikt.modiacontextholder/.default';
  return proxyWithOBO(newHostname, audience, req);
}
