import { ForespørselDelingAvCvAPI } from '../../../api-routes';
import { proxyWithOBO } from '../../../oboProxy';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return proxyWithOBO(ForespørselDelingAvCvAPI, req);
}

export async function POST(req: NextRequest) {
  return proxyWithOBO(ForespørselDelingAvCvAPI, req);
}
