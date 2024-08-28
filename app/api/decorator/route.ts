import { NextRequest } from 'next/server';
import { proxyWithOBO } from '../../../util/oboProxy';
import { ModiaDecoratorAPI } from '../api-routes';

export async function GET(req: NextRequest) {
  return proxyWithOBO(ModiaDecoratorAPI, req);
}
