import { RekbisError } from '../../../util/rekbisError';
import { navnForRolleId } from '../../components/tilgangskontroll/roller';
import { getToken } from '@navikt/oasis';
import { decodeJwt } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const hentNavIdent = (token: string) => {
  const claims = decodeJwt(token);
  return String(claims['NAVident']) || '';
};

const hentRoller = (token: string): string[] => {
  const claims = decodeJwt(token);
  return (claims.groups as string[]) || [];
};

export async function GET(req: NextRequest) {
  try {
    const headers = req.headers;
    const brukerensAccessToken = getToken(headers);

    if (!brukerensAccessToken) {
      return NextResponse.json(
        {
          error: 'Bruker mangler access token',
        },
        { status: 401 },
      );
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
    new RekbisError({ message: 'Feil ved henting av brukerdata', error });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
