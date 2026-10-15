import { skalMocke } from '@/util/env';
import { SESJON_UTLØPT_KODE } from '@/util/sesjonUtløpt';
import { NextRequest, NextResponse } from 'next/server';

// Simulerer svaret fra proxyWithOBO når brukerens sesjon er utløpt.
// Med ?sesjon=gyldig simuleres en 401 som ikke skyldes utløpt sesjon
// (f.eks. feilet OBO-veksling eller 401 fra backend).
// Kun tilgjengelig lokalt og i testmodus.
const utløptSesjonSvar = (req: NextRequest) => {
  if (!skalMocke) {
    return new NextResponse(null, { status: 404 });
  }
  const sesjonGyldig = req.nextUrl.searchParams.get('sesjon') === 'gyldig';
  return NextResponse.json(
    sesjonGyldig
      ? { beskrivelse: 'Kunne ikke hente OBO-token' }
      : { beskrivelse: 'Kunne ikke hente OBO-token', kode: SESJON_UTLØPT_KODE },
    { status: 401 },
  );
};

export const GET = utløptSesjonSvar;
export const POST = utløptSesjonSvar;
