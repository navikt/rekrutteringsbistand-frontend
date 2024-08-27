import { NextRequest, NextResponse } from "next/server";
import { isLocal } from "../../../../util/env";
import { proxyWithOBO } from "../../../../util/oboProxy";
import { StillingAPI } from "../../route-env";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  if (isLocal) {
    return NextResponse.json({ data: "kake" });
  }

  return proxyWithOBO(StillingAPI, req);
}
