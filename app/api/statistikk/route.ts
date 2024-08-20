import { NextRequest, NextResponse } from 'next/server';
import { getCluster, isLocal } from '../../util/env';
import { proxyWithOBO } from '../../util/oboProxy';

const cluster = getCluster(true);
const statistikkScope = `api://${cluster}.toi.rekrutteringsbistand-statistikk-api/.default`;

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

  const url = new URL(process.env.STATISTIKK_API_URL + '/statistikk' || '');

  searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  console.log('🎺 url.toString()', url.toString());
  console.log('🎺 statistikkScope', statistikkScope);
  return proxyWithOBO(url.toString(), statistikkScope, req);
}
