import { NextRequest, NextResponse } from 'next/server';
import { isLocal } from '../../../util/env';
import { proxyWithOBO } from '../../../util/oboProxy';
import { KandidatsøkAPI } from '../api-routes';

export async function GET(req: NextRequest) {
  if (isLocal) {
    return NextResponse.json({});
  }

  return proxyWithOBO(KandidatsøkAPI, req);
}
