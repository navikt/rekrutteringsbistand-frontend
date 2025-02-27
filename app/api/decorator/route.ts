import { NextRequest } from 'next/server';
import { ModiaDecoratorAPI } from '../api-routes';
import { proxyWithOBO } from '../oboProxy';

export async function GET(req: NextRequest) {
  return proxyWithOBO(ModiaDecoratorAPI, req);
}
