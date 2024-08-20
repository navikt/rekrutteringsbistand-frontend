import { NextRequest, NextResponse } from 'next/server';
import { isLocal } from '../../util/env';
import { getCluster } from '../../util/miljø';
import { proxyWithOBO } from '../../util/oboProxy';

const statistikkScope = `api://${getCluster()}.toi.rekrutteringsbistand-statistikk-api/.default`;

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

  const url = new URL(process.env.STATISTIKK_API_URL || '');

  // Append all search parameters to the target URL
  searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  return proxyWithOBO(url.toString(), statistikkScope, req);
}
