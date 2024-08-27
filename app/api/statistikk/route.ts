import { NextRequest, NextResponse } from "next/server";
import { isLocal } from "../../../util/env";
import { proxyWithOBO } from "../../../util/oboProxy";
import { StatistikkAPI } from "../api-routes";

export async function GET(req: NextRequest) {
  if (isLocal) {
    return NextResponse.json({
      antPresentasjoner: {
        totalt: 10,
        under30år: 5,
        innsatsgruppeIkkeStandard: 1,
      },
      antFåttJobben: {
        totalt: 10,
        under30år: 5,
        innsatsgruppeIkkeStandard: 1,
      },
    });
  }

  console.log("🎺 Hei");
  return proxyWithOBO(StatistikkAPI, req);
}
