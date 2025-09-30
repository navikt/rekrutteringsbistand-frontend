import { isLocal } from './util/env';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const requestUrl: URL = new URL(request.url);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-path', requestUrl.pathname + requestUrl.search);

  // Skip auth for API routes that might be health checks or callbacks
  if (
    requestUrl.pathname.startsWith('/api/') ||
    requestUrl.pathname.includes('/oauth2/') ||
    requestUrl.pathname === '/favicon.ico'
  ) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (requestHeaders.get('authorization') == null && !isLocal) {
    // Check if this is already a callback attempt to avoid redirect loops
    if (
      requestUrl.searchParams.has('redirect') ||
      requestUrl.pathname === '/oauth2/login'
    ) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/oauth2/login`;
    redirectUrl.searchParams.set(
      'redirect',
      requestUrl.pathname + requestUrl.search,
    );

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
