import { getToken } from '@navikt/oasis';
import { decodeJwt } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { navnForRolleId } from '../../components/tilgangskontroll/roller';

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
      const redirectUrl = req.headers.get('x-path');
      return NextResponse.redirect(
        new URL(`/oauth2/login?redirect=${redirectUrl ?? '/'}`, req.url),
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
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
