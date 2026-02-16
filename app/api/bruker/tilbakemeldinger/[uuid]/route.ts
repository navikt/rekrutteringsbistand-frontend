import { BrukerAPI } from '@/app/api/api-routes';
import { proxyWithOBO } from '@/app/api/oboProxy';
import { NextRequest } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;
  return proxyWithOBO(BrukerAPI, req, `/api/tilbakemeldinger/${uuid}`);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;
  return proxyWithOBO(BrukerAPI, req, `/api/tilbakemeldinger/${uuid}`);
}
