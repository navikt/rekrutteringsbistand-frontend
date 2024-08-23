import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../util/oboProxy';
import { routeScope, routeUrl } from '../route-env';

export async function POST(req: NextRequest) {
  return proxyWithOBO(
    routeUrl.MODIA_DECORATOR_API,
    routeScope.MODIA_DECORATOR_SCOPE,
    req
  );
}
