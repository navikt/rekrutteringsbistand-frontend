import { NextRequest, NextResponse } from 'next/server';
import { isLocal } from '../../../util/env';
import { proxyWithOBO } from '../../../util/oboProxy';
import { routeScope } from '../route-env';

export async function GET(req: NextRequest) {
  if (isLocal) {
    return NextResponse.json({
      antPresentasjoner: {
        totalt: 10,
        under30år: 5,
        innsatsgruppeIkkeStandard: 1,
      },
      antFåttJobben: {
        totalt: 10,
        under30år: 5,
        innsatsgruppeIkkeStandard: 1,
      },
    });
  }

  const { searchParams } = new URL(req.url);

  const url = new URL(routeScope.STATISTIKK_SCOPE + '/statistikk' || '');

  searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  return proxyWithOBO(url.toString(), routeScope.STATISTIKK_SCOPE, req);
}
