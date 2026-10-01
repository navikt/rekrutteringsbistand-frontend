import { skalMocke } from '@/util/env';
import { NextResponse } from 'next/server';

// Simulerer svaret fra proxyWithOBO når brukerens sesjon er utløpt.
// Kun tilgjengelig lokalt og i testmodus.
export async function GET() {
  if (!skalMocke) {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.json(
    { beskrivelse: 'Kunne ikke hente OBO-token' },
    { status: 401 },
  );
}
