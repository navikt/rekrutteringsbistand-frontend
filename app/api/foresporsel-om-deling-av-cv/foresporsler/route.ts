import { NextRequest } from 'next/server';
import { ForespørselDelingAvCvAPI } from '../../api-routes';
import { proxyWithOBO } from '../../oboProxy';

export async function POST(req: NextRequest) {
  return proxyWithOBO(ForespørselDelingAvCvAPI, req);
}
