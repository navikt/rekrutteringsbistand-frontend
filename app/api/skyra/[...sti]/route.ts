import { logger } from '@navikt/next-logger';
import { NextRequest, NextResponse } from 'next/server';

const SKYRA_SURVEY_HOST = process.env.SKYRA_SURVEY_HOST ?? 'survey.skyra.no';
const SKYRA_INGEST_HOST =
  process.env.SKYRA_INGEST_HOST ?? 'ingest.staging.skyra.no';

/**
 * Proxy for Skyra-trafikk.
 *
 * Sluttbrukere i Citrix når ikke survey.skyra.no / ingest.staging.skyra.no
 * direkte pga. brannmur. Denne proxyen lar nettleseren snakke med Next-serveren
 * som deretter videresender til Skyra.
 *
 * Ruting:
 *   /api/skyra/survey/...  → https://{SKYRA_SURVEY_HOST}/...
 *   /api/skyra/ingest/...  → https://{SKYRA_INGEST_HOST}/...
 */

type SkyraTarget = 'survey' | 'ingest';

const hostForTarget = (target: SkyraTarget): string =>
  target === 'survey' ? SKYRA_SURVEY_HOST : SKYRA_INGEST_HOST;

function byggEksternUrl(req: NextRequest, target: SkyraTarget): string {
  const originalUrl = new URL(req.url);
  // Fjern /api/skyra/{target} prefiks fra pathen
  const prefiks = `/api/skyra/${target}`;
  const eksternSti = originalUrl.pathname.replace(prefiks, '') || '/';
  return `https://${hostForTarget(target)}${eksternSti}${originalUrl.search}`;
}

function utledTarget(req: NextRequest): SkyraTarget | null {
  const pathname = new URL(req.url).pathname;
  if (pathname.startsWith('/api/skyra/survey')) return 'survey';
  if (pathname.startsWith('/api/skyra/ingest')) return 'ingest';
  return null;
}

const VIDERESENDTE_HEADERS = [
  'content-type',
  'accept',
  'accept-language',
  'cache-control',
];

function byggHeaders(innkommende: Headers): HeadersInit {
  const headers: Record<string, string> = {};
  for (const nøkkel of VIDERESENDTE_HEADERS) {
    const verdi = innkommende.get(nøkkel);
    if (verdi) headers[nøkkel] = verdi;
  }
  return headers;
}

async function proxy(req: NextRequest): Promise<NextResponse> {
  const target = utledTarget(req);
  if (!target) {
    return NextResponse.json(
      { feil: 'Ugyldig Skyra-proxy-sti' },
      { status: 400 },
    );
  }

  const eksternUrl = byggEksternUrl(req, target);

  try {
    const body =
      req.method !== 'GET' && req.method !== 'HEAD'
        ? await req.arrayBuffer()
        : undefined;

    const respons = await fetch(eksternUrl, {
      method: req.method,
      headers: byggHeaders(req.headers),
      body,
    });

    const innhold = await respons.arrayBuffer();
    const contentType = respons.headers.get('content-type') ?? '';

    return new NextResponse(innhold, {
      status: respons.status,
      headers: {
        'content-type': contentType,
        'cache-control':
          respons.headers.get('cache-control') ?? 'public, max-age=3600',
      },
    });
  } catch (error) {
    logger.error({ error, eksternUrl }, 'Skyra-proxy feilet');
    return NextResponse.json({ feil: 'Skyra-proxy feilet' }, { status: 502 });
  }
}

export async function GET(req: NextRequest) {
  return proxy(req);
}

export async function POST(req: NextRequest) {
  return proxy(req);
}
