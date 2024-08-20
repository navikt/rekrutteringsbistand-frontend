import { getToken } from '@navikt/oasis';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isLocal } from './util/env';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const requestUrl: URL = new URL(request.url);
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-path', requestUrl.pathname + requestUrl.search);

  const authHeader = requestHeaders.get('authorization');

  if (
    !authHeader ||
    !authHeader.startsWith('Bearer ' || authHeader === 'Bearer undefined')
  ) {
    const token = getToken(request.headers);
    if (token) {
      requestHeaders.set('authorization', `Bearer ${token}`);
    } else if (!isLocal) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = `/oauth2/login`;
      redirectUrl.searchParams.set('redirect', requestUrl.pathname);

      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Matcher configuration for the middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  missing: [{ type: 'header', key: 'x-path' }],
};
