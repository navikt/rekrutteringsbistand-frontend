import { StillingAPI } from '@/app/api/api-routes';
import { proxyWithOBO } from '@/app/api/oboProxy';
import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ rekrutteringstreffId: string }>;
  },
) {
  const { rekrutteringstreffId } = await params;

  return proxyWithOBO(
    StillingAPI,
    req,
    `/rekrutteringstreff/formidling/${rekrutteringstreffId}/formidling`,
  );
}
