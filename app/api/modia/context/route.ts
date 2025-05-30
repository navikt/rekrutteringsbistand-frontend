import { ModiaDecoratorAPI } from '../../api-routes';
import { proxyWithOBO } from '../../oboProxy';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  return proxyWithOBO(ModiaDecoratorAPI, req);
}
