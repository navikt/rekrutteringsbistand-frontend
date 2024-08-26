import { NextRequest, NextResponse } from "next/server";
import { isLocal } from "../../../../util/env";
import { proxyWithOBO } from "../../../../util/oboProxy";
import { StillingAPI } from "../../route-env";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  if (isLocal) {
    console.log("🎺 orgnnr:", params);
    return NextResponse.json({ data: "kake" });
  }

  const { searchParams } = new URL(req.url);
  // search-api/underenhet/_search?q=organisasjonsnummer:${utenMellomrom}*
  const url = new URL(`${StillingAPI.api_url}/search-api/underenhet/_search`);

  searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  return proxyWithOBO(url.toString() + "*", StillingAPI.scope, req);
}
