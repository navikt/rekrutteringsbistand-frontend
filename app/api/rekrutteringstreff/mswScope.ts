export const PLAYWRIGHT_MSW_SCOPE_COOKIE = 'playwright-msw-scope';

const lesCookie = (cookieHeader: string, navn: string) => {
  const prefiks = `${navn}=`;
  const cookie = cookieHeader
    .split(';')
    .map((del) => del.trim())
    .find((del) => del.startsWith(prefiks));

  if (!cookie) return null;

  const verdi = cookie.slice(prefiks.length);
  try {
    return decodeURIComponent(verdi);
  } catch {
    return verdi;
  }
};

export const hentMswScopeFraRequest = (request: Request) => {
  // Cookie er den eneste informasjonen som automatisk går fra testrunner via browser til server på hver request.
  // Msw handlers kjører server side.
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return 'default';

  return lesCookie(cookieHeader, PLAYWRIGHT_MSW_SCOPE_COOKIE) ?? 'default';
};

export const byggMswScopeKey = (request: Request, id: string) =>
  `${hentMswScopeFraRequest(request)}:${id}`;
