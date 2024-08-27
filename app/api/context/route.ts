import { NextRequest } from "next/server";
import { proxyWithOBO } from "../../../util/oboProxy";
import { ModiaDecoratorAPI } from "../route-env";

export async function POST(req: NextRequest) {
  return proxyWithOBO(ModiaDecoratorAPI, req);
}
