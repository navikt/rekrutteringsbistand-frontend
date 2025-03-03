import { isLocal } from './util/env';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const requestUrl: URL = new URL(request.url);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-path', requestUrl.pathname + requestUrl.search);
  if (requestHeaders.get('authorization') == null && !isLocal) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/oauth2/login`;
    redirectUrl.searchParams.set('redirect', requestUrl.pathname);

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  missing: [{ type: 'header', key: 'x-path' }],
};
