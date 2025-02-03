import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../../../util/oboProxy';
import { ForespørselDelingAvCvAPI } from '../../../api-routes';
export async function GET(req: NextRequest) {
  return proxyWithOBO(ForespørselDelingAvCvAPI, req);
}
