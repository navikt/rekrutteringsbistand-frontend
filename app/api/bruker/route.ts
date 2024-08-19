import { getToken } from '@navikt/oasis';
import { decodeJwt } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { navnForRolleId } from '../../auth/roller';
import { isLocal } from '../../util/env';
import { brukerMock } from './bruker';

const hentNavIdent = (token: string) => {
  const claims = decodeJwt(token);
  return String(claims['NAVident']) || '';
};

const hentRoller = (token: string): string[] => {
  const claims = decodeJwt(token);
  return (claims.groups as string[]) || [];
};

export async function GET(req: NextRequest) {
  if (isLocal) {
    return NextResponse.json(brukerMock);
  }

  try {
    const headers = req.headers;
    const brukerensAccessToken = getToken(headers);

    if (!brukerensAccessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const navIdent = hentNavIdent(brukerensAccessToken);
    const roller = hentRoller(brukerensAccessToken)
      .map(navnForRolleId)
      .filter((navn): navn is string => navn !== null);

    return NextResponse.json({
      navIdent,
      roller,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
