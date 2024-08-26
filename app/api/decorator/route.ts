import { NextRequest } from "next/server";
import { proxyWithOBO } from "../../../util/oboProxy";
import { ModiaDecoratorAPI } from "../route-env";

export async function GET(req: NextRequest) {
  return proxyWithOBO(ModiaDecoratorAPI.api_url, ModiaDecoratorAPI.scope, req);
}
