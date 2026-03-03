import { navnForRolleId, Roller } from '@/components/tilgangskontroll/roller';
import { skalMocke } from '@/util/env';
import { RekbisError } from '@/util/rekbisError';
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
  if (skalMocke) {
    const rolle =
      req.cookies.get('DEV-ROLLE')?.value ||
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER;
    const bruker = req.cookies.get('DEV-BRUKER')?.value || 'TestIdent';
    return NextResponse.json({ navIdent: bruker, roller: [rolle] });
  }

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
