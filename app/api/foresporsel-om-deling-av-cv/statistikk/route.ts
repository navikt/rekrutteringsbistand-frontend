import { NextRequest, NextResponse } from "next/server";
import { isLocal } from "../../../../util/env";
import { proxyWithOBO } from "../../../../util/oboProxy";
import { ForespørselDelingAvCvAPI } from "../../api-routes";

export async function GET(req: NextRequest) {
  if (isLocal) {
    return NextResponse.json({
      antallSvartJa: 12,
      antallSvartNei: 13,
      antallVenterPåSvar: 14,
      antallUtløpteSvar: 15,
    });
  }

  return proxyWithOBO(ForespørselDelingAvCvAPI, req);
}
