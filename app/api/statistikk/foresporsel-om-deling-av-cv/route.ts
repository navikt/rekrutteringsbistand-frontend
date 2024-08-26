import { NextRequest, NextResponse } from "next/server";
import { isLocal } from "../../../../util/env";
import { proxyWithOBO } from "../../../../util/oboProxy";
import { ForespørselDelingAvCvAPI } from "../../route-env";

export async function GET(req: NextRequest) {
  if (isLocal) {
    return NextResponse.json({
      antallSvartJa: 12,
      antallSvartNei: 13,
      antallVenterPåSvar: 14,
      antallUtløpteSvar: 15,
    });
  }

  // const { searchParams } = new URL(req.url);

  // const url = new URL(`${ForespørselDelingAvCvAPI.api_url}`);

  // searchParams.forEach((value, key) => {
  //   url.searchParams.append(key, value);
  // });

  return proxyWithOBO(
    ForespørselDelingAvCvAPI.api_url,
    ForespørselDelingAvCvAPI.scope,
    req,
  );
}
